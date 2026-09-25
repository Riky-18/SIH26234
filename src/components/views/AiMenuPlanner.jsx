import React, { useState, useId } from 'react';
import {
  Sparkles,
  CalendarCheck,
  Utensils,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Flame,
  Leaf,
  Printer,
  FileText,
  Check,
  X,
  Edit2,
  ArrowRight,
  TrendingDown,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  DollarSign,
  ShieldCheck,
  Info,
  Calendar,
  Zap,
  Scale
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function AiMenuPlanner({
  kitchenData,
  onAcceptDishToKitchen,
  onNavigateHome
}) {
  // Navigation tabs within planner
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'calendar' | 'depletion'

  // AI Configuration Parameters
  const [selectedMeal, setSelectedMeal] = useState('Lunch'); // 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
  const [selectedDay, setSelectedDay] = useState('Today (Friday)');
  const [headcount, setHeadcount] = useState(250);
  const [dietary, setDietary] = useState('North & South Blend');
  const [optimizationGoal, setOptimizationGoal] = useState('zero-waste'); // 'zero-waste' | 'budget' | 'protein'
  const [customPrompt, setCustomPrompt] = useState('');

  // Selected pantry stock items to exhaust (IDs: 1=Tomatoes, 2=Onions, 4=Milk, 6=Spinach, 8=Paneer)
  const [selectedIngredients, setSelectedIngredients] = useState([1, 6, 4, 8, 2]);

  // Generation execution state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  // Accepted dishes tracker
  const [acceptedDishIds, setAcceptedDishIds] = useState(new Set(['lunch-1']));

  // Modals & previews
  const [editingDish, setEditingDish] = useState(null);
  const [prepSheetOpen, setPrepSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Available pantry stock from mock data
  const pantryItems = [
    { id: 1, name: 'Tomatoes', qty: '15 kg', expiry: 'Today', urgency: 'danger', icon: '🍅' },
    { id: 6, name: 'Spinach (Palak)', qty: '8 kg', expiry: 'Today', urgency: 'danger', icon: '🥬' },
    { id: 4, name: 'Fresh Milk', qty: '18 L', expiry: '1 day', urgency: 'warning', icon: '🥛' },
    { id: 8, name: 'Paneer Block', qty: '6 kg', expiry: '2 days', urgency: 'warning', icon: '🧀' },
    { id: 2, name: 'Onions', qty: '22 kg', expiry: '2 days', urgency: 'warning', icon: '🧅' },
    { id: 5, name: 'Potatoes', qty: '30 kg', expiry: '6 days', urgency: 'success', icon: '🥔' },
    { id: 3, name: 'Rice (Sona Masoori)', qty: '40 kg', expiry: '12 days', urgency: 'success', icon: '🍚' },
    { id: 7, name: 'Toor Dal (Lentils)', qty: '25 kg', expiry: '20 days', urgency: 'success', icon: '🫘' },
  ];

  // Helper to toggle ingredient selection
  const toggleIngredient = (id) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllExpiring = () => {
    setSelectedIngredients([1, 6, 4, 8, 2]);
  };

  // Recipe templates library adapted to selected constraints
  const getDishesForConfig = (meal, count, dietaryPref) => {
    const scaleFactor = count / 250;

    if (meal === 'Breakfast') {
      return [
        {
          id: 'bf-1',
          name: 'High-Protein Palak & Tomato Moong Chilla',
          category: 'Main Hot Course',
          matchRate: 97,
          prepTime: '25 mins',
          cookTime: '30 mins',
          calories: 220,
          protein: '11g',
          carbs: '28g',
          fat: '6g',
          batchYield: `${Math.round(2 * count)} Chillas (${count} Servings)`,
          wastePreventedKg: (4 * scaleFactor).toFixed(1),
          costSaved: Math.round(480 * scaleFactor),
          tags: ['⚡ Clears 50% Expiring Spinach', 'High Fiber', 'Vegan Option'],
          ingredientsUsed: [
            { name: 'Spinach (Palak)', amount: `${(4 * scaleFactor).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Tomatoes (Finely Diced)', amount: `${(3 * scaleFactor).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Moong Dal Batter', amount: `${(15 * scaleFactor).toFixed(1)} kg` },
            { name: 'Green Chillies & Ginger', amount: '0.8 kg' },
          ],
          chefNotes: 'Grind half the spinach directly into the batter for rich emerald color; fold remaining diced leaves for texture.',
          haccpTemp: 'Serve hot off griddle at >70°C. Do not hold batter past 3 hours.',
          expanded: false,
        },
        {
          id: 'bf-2',
          name: 'Homestyle Spiced Aloo & Onion Poha',
          category: 'Warm Grain Accompaniment',
          matchRate: 94,
          prepTime: '20 mins',
          cookTime: '25 mins',
          calories: 240,
          protein: '6g',
          carbs: '42g',
          fat: '5g',
          batchYield: `${Math.round(28 * scaleFactor)} kg total cooked poha`,
          wastePreventedKg: (3 * scaleFactor).toFixed(1),
          costSaved: Math.round(220 * scaleFactor),
          tags: ['Low Prep Cost', 'Pantry Depleter'],
          ingredientsUsed: [
            { name: 'Potatoes (Diced)', amount: `${(6 * scaleFactor).toFixed(1)} kg` },
            { name: 'Onions (Thinly Sliced)', amount: `${(4 * scaleFactor).toFixed(1)} kg`, badge: '2 Days Expiry' },
            { name: 'Thick Poha (Flattened Rice)', amount: `${(18 * scaleFactor).toFixed(1)} kg` },
            { name: 'Roasted Peanuts & Curry Leaves', amount: '2 kg' },
          ],
          chefNotes: 'Rinse poha in colander 5 mins prior. Sauté onions on low heat with mustard seeds and turmeric.',
          haccpTemp: 'Maintain in steam table well at 65°C.',
          expanded: false,
        },
        {
          id: 'bf-3',
          name: 'Fresh Spiced Cardamom Masala Milk',
          category: 'Warm Beverage',
          matchRate: 98,
          prepTime: '10 mins',
          cookTime: '20 mins',
          calories: 140,
          protein: '7g',
          carbs: '14g',
          fat: '6g',
          batchYield: `${Math.round(45 * scaleFactor)} Liters`,
          wastePreventedKg: (10 * scaleFactor).toFixed(1),
          costSaved: Math.round(650 * scaleFactor),
          tags: ['⚡ Clears 55% Expiring Fresh Milk', 'Calcium Rich'],
          ingredientsUsed: [
            { name: 'Fresh Milk', amount: `${Math.min(18, Math.round(10 * scaleFactor))} Liters`, badge: '1 Day Expiry' },
            { name: 'Green Cardamom & Ginger Powder', amount: '150 g' },
            { name: 'Jaggery / Raw Sugar', amount: `${(2.5 * scaleFactor).toFixed(1)} kg` },
          ],
          chefNotes: 'Boil milk thoroughly to 85°C to arrest spoilage bacteria and infuse spices before dispensing.',
          haccpTemp: 'Hold at >65°C in insulated beverage urns.',
          expanded: false,
        }
      ];
    }

    if (meal === 'Dinner') {
      return [
        {
          id: 'dn-1',
          name: 'Rich Shahi Tomato Paneer Lababdar',
          category: 'Signature Main Gravy',
          matchRate: 99,
          prepTime: '30 mins',
          cookTime: '45 mins',
          calories: 310,
          protein: '16g',
          carbs: '15g',
          fat: '18g',
          batchYield: `${Math.round(36 * scaleFactor)} kg Curry (${count} Servings)`,
          wastePreventedKg: (12 * scaleFactor).toFixed(1),
          costSaved: Math.round(1450 * scaleFactor),
          tags: ['⚡ Clears 100% Expiring Tomatoes & Paneer', 'Chef Choice 🏆', 'High Protein'],
          ingredientsUsed: [
            { name: 'Tomatoes (Charred & Pureed)', amount: `${Math.min(15, (8 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Paneer Cubes', amount: `${Math.min(6, (6 * scaleFactor)).toFixed(1)} kg`, badge: '2 Days Expiry' },
            { name: 'Fresh Milk / Cream Reduction', amount: `${(5 * scaleFactor).toFixed(1)} L`, badge: '1 Day Expiry' },
            { name: 'Onions (Pureed)', amount: `${(5 * scaleFactor).toFixed(1)} kg` },
          ],
          chefNotes: 'Roast tomatoes in bulk ovens before pureeing to evaporate excess moisture and caramelize natural sugars.',
          haccpTemp: 'Bulk steam kettle temperature check: core >74°C for 2 mins.',
          expanded: false,
        },
        {
          id: 'dn-2',
          name: 'Homestyle Lasooni Dal Palak',
          category: 'Lentil Course',
          matchRate: 96,
          prepTime: '20 mins',
          cookTime: '35 mins',
          calories: 185,
          protein: '10g',
          carbs: '26g',
          fat: '4g',
          batchYield: `${Math.round(42 * scaleFactor)} kg Dal`,
          wastePreventedKg: (5 * scaleFactor).toFixed(1),
          costSaved: Math.round(520 * scaleFactor),
          tags: ['⚡ Clears 60% Expiring Spinach', 'Iron Rich'],
          ingredientsUsed: [
            { name: 'Spinach (Blanched & Pureed)', amount: `${Math.min(8, (5 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Toor Dal (Lentils)', amount: `${(10 * scaleFactor).toFixed(1)} kg` },
            { name: 'Garlic & Cumin Tadka', amount: '1.2 kg' },
          ],
          chefNotes: 'Add spinach puree in the final 5 minutes of simmering to prevent dulling of color.',
          haccpTemp: 'Keep in bain-marie at >65°C.',
          expanded: false,
        },
        {
          id: 'dn-3',
          name: 'Soft Tawa Rotis & Steamed Jeera Rice',
          category: 'Breads & Grains',
          matchRate: 93,
          prepTime: '40 mins',
          cookTime: '40 mins',
          calories: 250,
          protein: '6g',
          carbs: '52g',
          fat: '2g',
          batchYield: `${Math.round(500 * scaleFactor)} Rotis + 25 kg Cooked Rice`,
          wastePreventedKg: '0.0',
          costSaved: 0,
          tags: ['Pantry Staple', 'Balanced Carbohydrates'],
          ingredientsUsed: [
            { name: 'Wheat Flour (Atta)', amount: `${(20 * scaleFactor).toFixed(1)} kg` },
            { name: 'Sona Masoori Rice', amount: `${(15 * scaleFactor).toFixed(1)} kg` },
          ],
          chefNotes: 'Rest dough 20 mins to ensure pliable rotis suitable for hot-case holding.',
          haccpTemp: 'Hold in thermal insulated roti warmers.',
          expanded: false,
        }
      ];
    }

    if (meal === 'Snacks') {
      return [
        {
          id: 'sn-1',
          name: 'Crispy Palak & Onion Bhajiya with Tangy Tomato Dip',
          category: 'Evening Snack Combo',
          matchRate: 98,
          prepTime: '25 mins',
          cookTime: '30 mins',
          calories: 260,
          protein: '7g',
          carbs: '30g',
          fat: '12g',
          batchYield: `${Math.round(750 * scaleFactor)} Pieces (${count} Servings)`,
          wastePreventedKg: (11 * scaleFactor).toFixed(1),
          costSaved: Math.round(920 * scaleFactor),
          tags: ['⚡ 100% Zero Waste Fritters', 'High Student Turnout 🌟'],
          ingredientsUsed: [
            { name: 'Spinach (Palak) Shredded', amount: `${Math.min(8, (6 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Tomatoes (Simmered Chutney)', amount: `${Math.min(15, (5 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
            { name: 'Onions (Sliced)', amount: `${(6 * scaleFactor).toFixed(1)} kg`, badge: '2 Days Expiry' },
            { name: 'Besan (Chickpea Flour)', amount: `${(12 * scaleFactor).toFixed(1)} kg` },
          ],
          chefNotes: 'Add hot oil into besan batter for ultra-crispy crust without excess oil absorption.',
          haccpTemp: 'Fry at 175°C oil temp. Drain on wire racks.',
          expanded: false,
        },
        {
          id: 'sn-2',
          name: 'Kadak Masala Chai & Spiced Milk Tea',
          category: 'Beverage',
          matchRate: 96,
          prepTime: '10 mins',
          cookTime: '20 mins',
          calories: 110,
          protein: '4g',
          carbs: '15g',
          fat: '4g',
          batchYield: `${Math.round(40 * scaleFactor)} Liters Tea`,
          wastePreventedKg: (8 * scaleFactor).toFixed(1),
          costSaved: Math.round(520 * scaleFactor),
          tags: ['⚡ Clears 45% Fresh Milk', 'Staff & Student Favorite'],
          ingredientsUsed: [
            { name: 'Fresh Milk', amount: `${Math.min(18, Math.round(8 * scaleFactor))} Liters`, badge: '1 Day Expiry' },
            { name: 'Assam CTC Tea Blend', amount: '1.2 kg' },
            { name: 'Fresh Crushed Ginger & Spices', amount: '0.8 kg' },
          ],
          chefNotes: 'Double boil tea liquor with milk for rich body and aroma.',
          haccpTemp: 'Dispense at >75°C.',
          expanded: false,
        }
      ];
    }

    // Default: Lunch
    return [
      {
        id: 'lunch-1',
        name: 'Smoky Palak Paneer Makhani Gravy',
        category: 'Signature Main Course',
        matchRate: 98,
        prepTime: '30 mins',
        cookTime: '40 mins',
        calories: 285,
        protein: '15g',
        carbs: '12g',
        fat: '17g',
        batchYield: `${Math.round(35 * scaleFactor)} kg Bulk Gravy (${count} Servings)`,
        wastePreventedKg: (13 * scaleFactor).toFixed(1),
        costSaved: Math.round(1620 * scaleFactor),
        tags: ['⚡ Clears 100% Expiring Spinach', 'High Protein', 'Student Rated 4.9 ★'],
        ingredientsUsed: [
          { name: 'Spinach (Palak)', amount: `${Math.min(8, (8 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
          { name: 'Paneer Block', amount: `${Math.min(6, (6 * scaleFactor)).toFixed(1)} kg`, badge: '2 Days Expiry' },
          { name: 'Fresh Milk (Reduced base)', amount: `${(5 * scaleFactor).toFixed(1)} L`, badge: '1 Day Expiry' },
          { name: 'Onions (Ground)', amount: `${(4 * scaleFactor).toFixed(1)} kg` },
        ],
        chefNotes: 'Blanch spinach at 95°C for 90 seconds and shock in cold water to preserve vibrant chlorophyll. Lightly sear paneer before adding to sauce.',
        haccpTemp: 'Keep core temperature above 72°C. Batch tested for food safety.',
        expanded: true,
      },
      {
        id: 'lunch-2',
        name: 'Charred Tomato Dal Tadka',
        category: 'Protein Lentil Course',
        matchRate: 95,
        prepTime: '20 mins',
        cookTime: '35 mins',
        calories: 195,
        protein: '10g',
        carbs: '28g',
        fat: '4g',
        batchYield: `${Math.round(40 * scaleFactor)} kg Dal (${count} Servings)`,
        wastePreventedKg: (11 * scaleFactor).toFixed(1),
        costSaved: Math.round(940 * scaleFactor),
        tags: ['⚡ Clears 75% Expiring Tomatoes', 'Comfort Classic', 'Low Prep Complexity'],
        ingredientsUsed: [
          { name: 'Tomatoes (Oven Roasted)', amount: `${Math.min(15, (11 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
          { name: 'Toor Dal (Lentils)', amount: `${(10 * scaleFactor).toFixed(1)} kg`, badge: 'Pantry Staple' },
          { name: 'Onions', amount: `${(3.5 * scaleFactor).toFixed(1)} kg`, badge: '2 Days Expiry' },
          { name: 'Cumin & Ghee Tempering', amount: '0.9 kg' },
        ],
        chefNotes: 'Roasting the ripe tomatoes removes sharpness and enhances natural sweetness, creating a deep smoky restaurant flavor in mess bulk cooking.',
        haccpTemp: 'Simmer at minimum 85°C. Hot hold at >65°C.',
        expanded: false,
      },
      {
        id: 'lunch-3',
        name: 'Fragrant Jeera Ghee Sona Masoori Rice',
        category: 'Rice & Grains',
        matchRate: 92,
        prepTime: '15 mins',
        cookTime: '25 mins',
        calories: 230,
        protein: '4.5g',
        carbs: '48g',
        fat: '2g',
        batchYield: `${Math.round(48 * scaleFactor)} kg Cooked Rice`,
        wastePreventedKg: '0.0',
        costSaved: 0,
        tags: ['Pantry Staple', 'Bulk Scalable'],
        ingredientsUsed: [
          { name: 'Sona Masoori Rice', amount: `${(20 * scaleFactor).toFixed(1)} kg` },
          { name: 'Whole Cumin Seeds & Bay Leaf', amount: '350 g' },
          { name: 'Pure Desi Ghee', amount: '1.2 kg' },
        ],
        chefNotes: 'Soak rice 20 mins prior to cooking in steam cooker kettle #1 for fluffier grains with 12% higher cooked volume yield.',
        haccpTemp: 'Serve hot from steam table.',
        expanded: false,
      },
      {
        id: 'lunch-4',
        name: 'Crisp Onion-Tomato Kachumber Salad with Fresh Mint Chaas',
        category: 'Fresh Sides & Cooling Beverage',
        matchRate: 96,
        prepTime: '20 mins',
        cookTime: '0 mins',
        calories: 90,
        protein: '4g',
        carbs: '9g',
        fat: '2g',
        batchYield: `${count} Portions Salad + 40 L Chaas`,
        wastePreventedKg: (6 * scaleFactor).toFixed(1),
        costSaved: Math.round(520 * scaleFactor),
        tags: ['⚡ Clears Remaining Tomatoes & Milk', 'Probiotic & Digestion'],
        ingredientsUsed: [
          { name: 'Tomatoes (Diced)', amount: `${Math.min(4, (3.5 * scaleFactor)).toFixed(1)} kg`, badge: 'Expiring Today' },
          { name: 'Onions (Crisp Dice)', amount: `${(3 * scaleFactor).toFixed(1)} kg` },
          { name: 'Fresh Milk (Cultured to Curd/Chaas)', amount: `${(6 * scaleFactor).toFixed(1)} L`, badge: '1 Day Expiry' },
          { name: 'Fresh Mint & Black Salt', amount: '400 g' },
        ],
        chefNotes: 'Salad tossed with lemon juice and salt right at service counter to prevent sogginess. Chaas chilled to 4°C.',
        haccpTemp: 'Cold chain verified: hold Chaas in cold counter below 5°C.',
        expanded: false,
      }
    ];
  };

  // State holding current plan
  const [currentPlan, setCurrentPlan] = useState(getDishesForConfig('Lunch', 250, dietary));

  // Trigger AI generation simulation
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
    }, 400);

    setTimeout(() => {
      setGenerationStep(3);
    }, 850);

    setTimeout(() => {
      setGenerationStep(4);
    }, 1300);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep(0);
      const newDishes = getDishesForConfig(selectedMeal, headcount, dietary);
      setCurrentPlan(newDishes);
      // Auto-accept first dish as demo convenience
      setAcceptedDishIds(new Set([newDishes[0].id]));
      showToast(`AI successfully optimized ${selectedMeal} plan for ${headcount} diners!`);
    }, 1700);
  };

  // Toast feedback
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle dish acceptance to kitchen roster
  const handleToggleAccept = (dish) => {
    setAcceptedDishIds((prev) => {
      const next = new Set(prev);
      if (next.has(dish.id)) {
        next.delete(dish.id);
        showToast(`Removed "${dish.name}" from active kitchen prep`);
      } else {
        next.add(dish.id);
        showToast(`✓ Added "${dish.name}" to today's kitchen roster!`);
        if (onAcceptDishToKitchen) {
          onAcceptDishToKitchen({
            id: dish.id,
            dish: dish.name,
            category: dish.category,
            uses: dish.ingredientsUsed.map((i) => i.name),
            confidence: `${dish.matchRate}% match`,
            status: 'accepted',
          });
        }
      }
      return next;
    });
  };

  const handleAcceptAll = () => {
    const allIds = new Set(currentPlan.map((d) => d.id));
    setAcceptedDishIds(allIds);
    showToast(`✓ All ${currentPlan.length} dishes committed to Kitchen Daily Prep Roster!`);
    currentPlan.forEach((dish) => {
      if (onAcceptDishToKitchen) {
        onAcceptDishToKitchen({
          id: dish.id,
          dish: dish.name,
          category: dish.category,
          uses: dish.ingredientsUsed.map((i) => i.name),
          confidence: `${dish.matchRate}% match`,
          status: 'accepted',
        });
      }
    });
  };

  // Re-roll individual dish with an alternative variation
  const handleRerollDish = (dishId) => {
    setCurrentPlan((prev) =>
      prev.map((dish) => {
        if (dish.id !== dishId) return dish;
        const variations = {
          'lunch-1': {
            name: 'Creamy Methi Malai Paneer with Spinach Coulis',
            matchRate: 96,
            calories: 295,
            protein: '16g',
            chefNotes: 'Rich cashew and milk gravy laced with tender spinach ribbons. Highly palatable for hostel students.',
          },
          'lunch-2': {
            name: 'Panchmel Dal with Fire-Roasted Tomato Tadka',
            matchRate: 94,
            calories: 190,
            protein: '11g',
            chefNotes: 'Blend of 5 lentils slow cooked with charred tomato and garlic ghee tempering.',
          },
          'lunch-3': {
            name: 'Spiced Vegetable Pulao with Fried Onions',
            matchRate: 95,
            calories: 245,
            protein: '5g',
            chefNotes: 'Incorporate diced potatoes and sautéed onions into the rice broth for aroma.',
          },
          'lunch-4': {
            name: 'Spiced Tomato Mint Raita & Masala Buttermilk',
            matchRate: 97,
            calories: 95,
            protein: '5g',
            chefNotes: 'Thick salted curd infused with roasted cumin powder and diced seeded tomatoes.',
          }
        };

        const variation = variations[dishId] || {
          name: `Chef Special ${dish.name}`,
          matchRate: 95,
          calories: dish.calories,
          protein: dish.protein,
          chefNotes: 'Alternative spice balance formulated by ChefMind AI to minimize plate discard.',
        };

        showToast(`AI re-rolled recipe: "${variation.name}"`);
        return {
          ...dish,
          name: variation.name,
          matchRate: variation.matchRate,
          calories: variation.calories,
          protein: variation.protein,
          chefNotes: variation.chefNotes,
        };
      })
    );
  };

  // Toggle dish card expansion for chef details
  const toggleDishExpanded = (dishId) => {
    setCurrentPlan((prev) =>
      prev.map((dish) =>
        dish.id === dishId ? { ...dish, expanded: !dish.expanded } : dish
      )
    );
  };

  // Calculate cumulative impact of current plan
  const totalWastePrevented = currentPlan
    .reduce((acc, d) => acc + parseFloat(d.wastePreventedKg || 0), 0)
    .toFixed(1);

  const totalCostSaved = currentPlan.reduce(
    (acc, d) => acc + (d.costSaved || 0),
    0
  );

  const totalCo2Prevented = (parseFloat(totalWastePrevented) * 1.62).toFixed(1);

  // Weekly meal calendar data
  const weekCalendar = [
    {
      day: 'Monday',
      date: '21 Sep',
      bf: 'Idli & Sambar (Used 4kg Lentils)',
      lunch: 'Veg Kurma & Jeera Rice',
      dinner: 'Dal Tadka & Phulka',
      wasteRisk: 'Low',
      prevented: '18.2 kg',
      diners: 340,
    },
    {
      day: 'Tuesday',
      date: '22 Sep',
      bf: 'Upma & Coconut Chutney',
      lunch: 'Rajma Masala & Steamed Rice',
      dinner: 'Aloo Gobi & Roti',
      wasteRisk: 'Low',
      prevented: '14.5 kg',
      diners: 350,
    },
    {
      day: 'Wednesday',
      date: '23 Sep',
      bf: 'Poha & Mint Chutney',
      lunch: 'Mixed Veg Sambar & Rice',
      dinner: 'Egg/Paneer Bhurji & Paratha',
      wasteRisk: 'Moderate',
      prevented: '21.0 kg',
      diners: 345,
    },
    {
      day: 'Thursday',
      date: '24 Sep',
      bf: 'Pongal & Vada',
      lunch: 'Chole Masala & Bhature',
      dinner: 'Yellow Dal & Rice',
      wasteRisk: 'Low',
      prevented: '16.8 kg',
      diners: 350,
    },
    {
      day: 'Friday (Today)',
      date: '25 Sep',
      bf: 'Palak Moong Chilla',
      lunch: 'Palak Paneer & Tomato Dal',
      dinner: 'Shahi Tomato Paneer & Rotis',
      wasteRisk: 'High (Expiring Stock Alert)',
      prevented: `${totalWastePrevented} kg`,
      diners: headcount,
      isToday: true,
    },
    {
      day: 'Saturday',
      date: '26 Sep',
      bf: 'Masala Dosa & Sambar',
      lunch: 'Lemon Rice & Potato Fry',
      dinner: 'Khichdi & Kadhi',
      wasteRisk: 'Moderate (Weekend Outings)',
      prevented: '12.4 kg',
      diners: 180,
    },
    {
      day: 'Sunday',
      date: '27 Sep',
      bf: 'Poori Bhaji Special',
      lunch: 'Dum Biryani & Mirchi Salan',
      dinner: 'Veg Pulao & Raita',
      wasteRisk: 'Moderate (Weekend Outings)',
      prevented: '15.6 kg',
      diners: 160,
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-content-primary text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-soft-lg border border-slate-700 animate-slideUp">
          <Sparkles className="w-4 h-4 text-brand-light" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Breadcrumb & View Mode Switcher */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand-light text-brand uppercase tracking-wider">
                Kitchen Module • Smart Operations
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>ChefMind AI Engine v3.4 Active</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              AI Menu Planner & Zero-Waste Optimizer
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Dynamically synthesizes mess & hostel recipes that systematically exhaust expiring inventory, calibrate nutrition quotas, and scale batch weights to attendance telemetry.
            </p>
          </div>

          {/* Quick Header Actions: Prep Sheet & Return Home */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={Printer}
              onClick={() => setPrepSheetOpen(true)}
            >
              Kitchen Prep Sheet
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowRight}
              onClick={onNavigateHome}
            >
              Back to Overview
            </Button>
          </div>
        </div>

        {/* 4 Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5 pt-5 border-t border-divider">
          <div className="p-3 rounded-xl bg-slate-50 border border-divider/60">
            <div className="flex items-center gap-1.5 text-content-secondary text-xs font-medium">
              <Scale className="w-3.5 h-3.5 text-brand" />
              <span>Waste Prevented</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-content-primary mt-0.5">
              {totalWastePrevented} kg
            </p>
            <p className="text-[11px] text-success font-medium">
              ✓ 100% of high-risk stock
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider/60">
            <div className="flex items-center gap-1.5 text-content-secondary text-xs font-medium">
              <DollarSign className="w-3.5 h-3.5 text-success" />
              <span>Procurement Saved</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-content-primary mt-0.5">
              ₹{totalCostSaved.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-content-secondary">
              Avoided re-order costs
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider/60">
            <div className="flex items-center gap-1.5 text-content-secondary text-xs font-medium">
              <Leaf className="w-3.5 h-3.5 text-brand" />
              <span>CO₂e Avoided</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-content-primary mt-0.5">
              {totalCo2Prevented} kg
            </p>
            <p className="text-[11px] text-success font-medium">
              SDG 12.3 target met
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider/60">
            <div className="flex items-center gap-1.5 text-content-secondary text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-info" />
              <span>Roster Committed</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-content-primary mt-0.5">
              {acceptedDishIds.size} / {currentPlan.length} Dishes
            </p>
            <p className="text-[11px] text-info font-medium">
              {acceptedDishIds.size === currentPlan.length ? 'Ready for cooking' : 'Pending chef confirm'}
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-divider pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive AI Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>7-Day Zero-Waste Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('depletion')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'depletion'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Pantry Depletion Impact</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE AI GENERATOR */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (5 cols): AI Configuration Parameters */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-5">
              <SectionHeader
                icon={Sliders}
                title="AI Planner Controls"
                subtitle="Configure batch size, target meal, and prioritize expiring pantry items"
              />

              {/* 1. Target Meal Selection */}
              <div>
                <label className="text-xs font-bold text-content-secondary uppercase tracking-wider block mb-2">
                  1. Target Meal Session
                </label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedMeal(m);
                        setCurrentPlan(getDishesForConfig(m, headcount, dietary));
                      }}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        selectedMeal === m
                          ? 'bg-white text-brand shadow-xs'
                          : 'text-content-secondary hover:text-content-primary'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Target Day & Headcount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-content-secondary uppercase tracking-wider block mb-1.5">
                    Target Day
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  >
                    <option>Today (Friday)</option>
                    <option>Tomorrow (Saturday)</option>
                    <option>Sunday</option>
                    <option>Next Monday</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-content-secondary uppercase tracking-wider">
                      Diners / Servings
                    </label>
                    <span className="text-xs font-bold text-brand bg-brand-light px-2 py-0.5 rounded">
                      {headcount} Pax
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={headcount}
                    onChange={(e) => setHeadcount(parseInt(e.target.value))}
                    className="w-full accent-brand h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-content-muted mt-1">
                    <span>50 (Small batch)</span>
                    <span>250 (Mess Avg)</span>
                    <span>500 (Full Hall)</span>
                  </div>
                </div>
              </div>

              {/* 3. Dietary & Cuisine Profile */}
              <div>
                <label className="text-xs font-bold text-content-secondary uppercase tracking-wider block mb-1.5">
                  Dietary & Cuisine Profile
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'North & South Blend',
                    'Pure Vegetarian',
                    'Jain Friendly (No Onion/Garlic)',
                    'High Protein / Gym Diet'
                  ].map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setDietary(diet)}
                      className={`p-2 rounded-xl text-left text-xs font-medium border transition-all ${
                        dietary === diet
                          ? 'border-brand bg-brand-light/60 text-brand font-bold'
                          : 'border-divider bg-white text-content-secondary hover:bg-slate-50'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Expiring Pantry Priority Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-content-secondary uppercase tracking-wider">
                    Pantry Items to Exhaust First
                  </label>
                  <button
                    onClick={selectAllExpiring}
                    className="text-[11px] font-semibold text-brand hover:underline"
                  >
                    Select All Expiring
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {pantryItems.map((item) => {
                    const isSelected = selectedIngredients.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleIngredient(item.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-brand bg-brand-light/40 shadow-xs'
                            : 'border-divider bg-white opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">{item.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-content-primary truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-content-secondary truncate">
                              {item.qty} in stock
                            </p>
                          </div>
                        </div>

                        <StatusPill
                          text={item.expiry}
                          level={item.urgency}
                          size="sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Custom Chef Prompt */}
              <div>
                <label className="text-xs font-bold text-content-secondary uppercase tracking-wider block mb-1.5">
                  Chef Instructions / Custom Prompt (Optional)
                </label>
                <div className="relative">
                  <textarea
                    rows="2"
                    placeholder="e.g. Ensure mild spices for students, maximize spinach & tomato usage, include rich gravy..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                {/* Preset Prompt Suggestion Pills */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    '🔥 Clear 100% Expiring Spinach & Tomatoes',
                    '💪 High-Protein & Paneer Focus',
                    '💰 Low Prep Cost (< ₹18/plate)',
                    '🌧️ Rainy Day Comfort Stew'
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setCustomPrompt(p.substring(2).trim())}
                      className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-content-secondary hover:bg-slate-200 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Execute AI Generation Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm font-bold shadow-md hover:shadow-lg"
                  icon={Sparkles}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'AI Generating Optimized Menu...' : `Generate AI ${selectedMeal} Plan ✨`}
                </Button>
              </div>

              {/* Live AI Reasoning Animation */}
              {isGenerating && (
                <div className="p-4 rounded-xl bg-brand-light/70 border border-brand/30 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-brand">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ChefMind AI Step {generationStep}/4
                    </span>
                    <span>{generationStep * 25}%</span>
                  </div>

                  <ProgressBar
                    value={generationStep * 25}
                    max={100}
                    color="brand"
                    size="sm"
                    showLabel={false}
                  />

                  <p className="text-xs text-content-primary font-medium">
                    {generationStep === 1 && 'Scanning 8 pantry items & cross-checking expiry risks...'}
                    {generationStep === 2 && `Calibrating batch scaling for ${headcount} students...`}
                    {generationStep === 3 && 'Formulating zero-waste institutional recipes...'}
                    {generationStep === 4 && 'Verifying HACCP temperature & nutritional quotas...'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (7 cols): Generated Menu Plan & Interactive Recipe Cards */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-divider">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-content-primary">
                      Generated {selectedMeal} Roster
                    </h3>
                    <StatusPill
                      text={`${headcount} Pax Scaled`}
                      level="brand"
                      size="sm"
                    />
                  </div>
                  <p className="text-xs text-content-secondary mt-0.5">
                    Target Day: <strong className="text-content-primary">{selectedDay}</strong> • Diet:{' '}
                    <strong className="text-content-primary">{dietary}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={handleAcceptAll}
                  >
                    Accept All ({currentPlan.length})
                  </Button>
                </div>
              </div>

              {/* Recipe Cards List */}
              <div className="space-y-4 mt-5">
                {currentPlan.map((dish, index) => {
                  const isAccepted = acceptedDishIds.has(dish.id);

                  return (
                    <div
                      key={dish.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isAccepted
                          ? 'border-success/40 bg-success-light/20 shadow-xs'
                          : 'border-divider bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="p-4 md:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-light text-brand">
                                {dish.category}
                              </span>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-content-secondary">
                                {dish.matchRate}% AI Match
                              </span>
                              {dish.tags.map((t, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                    t.includes('⚡')
                                      ? 'bg-danger-light text-danger border border-danger/20'
                                      : 'bg-slate-100 text-content-secondary'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <h4 className="text-base md:text-lg font-bold text-content-primary">
                              {dish.name}
                            </h4>

                            <p className="text-xs text-content-secondary">
                              Batch: <strong>{dish.batchYield}</strong> • Prep:{' '}
                              <strong>{dish.prepTime}</strong> • Cook: <strong>{dish.cookTime}</strong>
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 self-end sm:self-start">
                            <button
                              onClick={() => handleRerollDish(dish.id)}
                              title="Re-roll this dish with AI"
                              className="p-2 text-content-secondary hover:text-brand hover:bg-brand-light rounded-xl border border-divider transition-colors"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setEditingDish(dish)}
                              title="Edit / Customize Recipe"
                              className="p-2 text-content-secondary hover:text-content-primary hover:bg-slate-100 rounded-xl border border-divider transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <Button
                              size="sm"
                              variant={isAccepted ? 'success' : 'primary'}
                              icon={isAccepted ? CheckCircle2 : Check}
                              onClick={() => handleToggleAccept(dish)}
                            >
                              {isAccepted ? 'Scheduled ✓' : 'Accept'}
                            </Button>
                          </div>
                        </div>

                        {/* Ingredients Chips Strip */}
                        <div className="mt-3.5 pt-3 border-t border-divider/60">
                          <p className="text-[11px] font-bold text-content-secondary uppercase tracking-wider mb-1.5">
                            Ingredients Required for {headcount} Pax:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {dish.ingredientsUsed.map((ing, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 ${
                                  ing.badge
                                    ? 'bg-danger-light text-danger border border-danger/20 font-semibold'
                                    : 'bg-slate-100 text-content-primary'
                                }`}
                              >
                                <span>{ing.name}:</span>
                                <strong>{ing.amount}</strong>
                                {ing.badge && (
                                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-danger text-white">
                                    {ing.badge}
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Nutritional & Impact Quick Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-divider/70 text-xs">
                          <div>
                            <span className="text-content-muted block text-[10px]">Calories / Serving</span>
                            <span className="font-bold text-content-primary">{dish.calories} kcal</span>
                          </div>
                          <div>
                            <span className="text-content-muted block text-[10px]">Protein / Serving</span>
                            <span className="font-bold text-content-primary">{dish.protein}</span>
                          </div>
                          <div>
                            <span className="text-content-muted block text-[10px]">Waste Prevented</span>
                            <span className="font-bold text-brand">{dish.wastePreventedKg} kg</span>
                          </div>
                          <div>
                            <span className="text-content-muted block text-[10px]">Cost Saved</span>
                            <span className="font-bold text-success">₹{dish.costSaved}</span>
                          </div>
                        </div>

                        {/* Expandable Chef Workflow & HACCP Guidelines */}
                        <div className="mt-3">
                          <button
                            onClick={() => toggleDishExpanded(dish.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                          >
                            <span>
                              {dish.expanded ? 'Hide Chef Cooking Protocol' : 'View Chef Cooking Protocol & HACCP Safety'}
                            </span>
                            {dish.expanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {dish.expanded && (
                            <div className="mt-2.5 p-3 rounded-xl bg-slate-50/90 border border-divider space-y-2 text-xs animate-fadeIn">
                              <div>
                                <span className="font-bold text-content-primary block mb-0.5">
                                  👨‍🍳 Chef Batch Technique:
                                </span>
                                <p className="text-content-secondary leading-relaxed">
                                  {dish.chefNotes}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-divider/60 flex items-start gap-2">
                                <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-content-primary block">
                                    HACCP Temperature & Safety Threshold:
                                  </span>
                                  <p className="text-content-secondary">
                                    {dish.haccpTemp}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Schedule Dispatch Actions */}
              <div className="mt-6 pt-5 border-t border-divider flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-xs text-content-secondary">
                    Total Estimated Prep Time: <strong>1 hr 45 mins</strong> across 2 Steam Kettles
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Printer}
                    onClick={() => setPrepSheetOpen(true)}
                  >
                    Print Kitchen Order
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Check}
                    onClick={handleAcceptAll}
                  >
                    Commit {acceptedDishIds.size} Dishes to Roster
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: 7-DAY ZERO-WASTE ROSTER CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider space-y-5 animate-fadeIn">
          <SectionHeader
            icon={CalendarCheck}
            title="Weekly 7-Day Smart Roster"
            subtitle="AI schedules inventory depletions proactively throughout the week so no raw batch reaches critical expiry"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-divider text-content-muted uppercase font-bold text-[11px] bg-slate-50">
                  <th className="py-3 px-4 rounded-l-xl">Day & Date</th>
                  <th className="py-3 px-4">Breakfast</th>
                  <th className="py-3 px-4">Lunch Special</th>
                  <th className="py-3 px-4">Dinner Special</th>
                  <th className="py-3 px-4">Daily Diners</th>
                  <th className="py-3 px-4">Waste Prevented</th>
                  <th className="py-3 px-4 rounded-r-xl">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider/60">
                {weekCalendar.map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      row.isToday
                        ? 'bg-brand-light/30 font-semibold'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {row.isToday && (
                          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        )}
                        <div>
                          <span className="font-bold text-content-primary block">
                            {row.day}
                          </span>
                          <span className="text-[11px] text-content-secondary">
                            {row.date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-content-primary">{row.bf}</td>
                    <td className="py-3.5 px-4 text-content-primary font-medium">{row.lunch}</td>
                    <td className="py-3.5 px-4 text-content-primary">{row.dinner}</td>
                    <td className="py-3.5 px-4 font-bold text-content-primary">{row.diners} Pax</td>
                    <td className="py-3.5 px-4 font-bold text-brand">{row.prevented}</td>
                    <td className="py-3.5 px-4">
                      <StatusPill
                        text={row.wasteRisk}
                        level={
                          row.wasteRisk.includes('High')
                            ? 'danger'
                            : row.wasteRisk.includes('Moderate')
                            ? 'warning'
                            : 'success'
                        }
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PANTRY DEPLETION IMPACT */}
      {activeTab === 'depletion' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider space-y-6 animate-fadeIn">
          <SectionHeader
            icon={Layers}
            title="Real-Time Pantry Stock Depletion"
            subtitle="Demonstrating how the planned menu consumes expiring items before spoilage occurs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pantryItems.map((item) => {
              // Simulated consumption based on selected menu
              const usageMap = {
                1: { used: 15, unit: 'kg', cleared: 100 },
                6: { used: 8, unit: 'kg', cleared: 100 },
                4: { used: 11, unit: 'L', cleared: 61 },
                8: { used: 6, unit: 'kg', cleared: 100 },
                2: { used: 12.5, unit: 'kg', cleared: 57 },
                5: { used: 6, unit: 'kg', cleared: 20 },
                3: { used: 20, unit: 'kg', cleared: 50 },
                7: { used: 10, unit: 'kg', cleared: 40 },
              };

              const usage = usageMap[item.id] || { used: 2, unit: 'kg', cleared: 25 };

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-divider bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <span className="font-bold text-sm text-content-primary block">
                          {item.name}
                        </span>
                        <span className="text-xs text-content-secondary">
                          Stock: <strong>{item.qty}</strong> • Expiry: <strong>{item.expiry}</strong>
                        </span>
                      </div>
                    </div>

                    <StatusPill
                      text={usage.cleared === 100 ? '100% Cleared 🎉' : `${usage.cleared}% Used`}
                      level={usage.cleared === 100 ? 'success' : 'info'}
                      size="sm"
                    />
                  </div>

                  <ProgressBar
                    value={usage.cleared}
                    max={100}
                    color={usage.cleared === 100 ? 'success' : 'brand'}
                    size="sm"
                    labelLeft={`Depleting ${usage.used} ${usage.unit}`}
                    labelRight={`${usage.cleared}% of inventory`}
                  />

                  <p className="text-[11px] text-content-secondary">
                    {usage.cleared === 100
                      ? '✓ Critical risk averted! Zero kilograms of this ingredient will be wasted today.'
                      : `Remaining ${parseFloat(item.qty) - usage.used} ${usage.unit} safely scheduled for tomorrow's roster.`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: RECIPE CUSTOMIZER MODAL */}
      {editingDish && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <h3 className="font-bold text-base text-content-primary">
                  Customize Recipe & Scaling
                </h3>
                <p className="text-xs text-content-secondary">
                  {editingDish.name}
                </p>
              </div>
              <button
                onClick={() => setEditingDish(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Dish Title
                </label>
                <input
                  type="text"
                  defaultValue={editingDish.name}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Portion Count
                  </label>
                  <input
                    type="number"
                    defaultValue={headcount}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Spice Level
                  </label>
                  <select className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50">
                    <option>Medium (Standard Mess)</option>
                    <option>Mild / Low Sodium</option>
                    <option>Spicy / Regional Touch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Chef Cooking Technique Notes
                </label>
                <textarea
                  rows="3"
                  defaultValue={editingDish.chefNotes}
                  className="w-full p-3 rounded-xl border border-divider bg-slate-50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setEditingDish(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  showToast('Recipe customizations saved successfully!');
                  setEditingDish(null);
                }}
              >
                Save & Update Recipe
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE KITCHEN PREP ORDER SHEET */}
      {prepSheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-soft-lg border border-divider animate-scaleUp">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center font-bold">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-content-primary">
                    FoodLoop AI • Daily Kitchen Prep Sheet
                  </h3>
                  <p className="text-xs text-content-secondary">
                    Mess Hall A • Shift: <strong>{selectedMeal}</strong> ({selectedDay})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPrepSheetOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timetable & Metadata */}
            <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-slate-50 text-xs">
              <div>
                <span className="text-content-muted block">Planned Headcount</span>
                <span className="font-bold text-content-primary">{headcount} Students</span>
              </div>
              <div>
                <span className="text-content-muted block">Shift Service Time</span>
                <span className="font-bold text-content-primary">12:30 PM – 2:30 PM</span>
              </div>
              <div>
                <span className="text-content-muted block">Assigned Head Chef</span>
                <span className="font-bold text-content-primary">Chef Raman</span>
              </div>
            </div>

            {/* Menu Items to Prep */}
            <div className="space-y-4 my-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-secondary">
                Dishes to Cook (Accepted Roster)
              </h4>

              <div className="space-y-3">
                {currentPlan.map((dish, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-divider/70 bg-white space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-content-primary text-sm">
                          {i + 1}. {dish.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-brand-light text-brand font-semibold">
                          {dish.category}
                        </span>
                      </div>
                      <span className="font-bold text-content-primary">
                        Yield: {dish.batchYield}
                      </span>
                    </div>

                    <div className="text-content-secondary">
                      <strong>Raw Inputs:</strong>{' '}
                      {dish.ingredientsUsed.map((ing) => `${ing.name} (${ing.amount})`).join(', ')}
                    </div>

                    <div className="text-[11px] text-content-muted italic">
                      Cook Guideline: {dish.chefNotes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & HACCP Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-divider text-xs space-y-2">
              <span className="font-bold text-content-primary block">
                Safety & Equipment Protocol Checklist
              </span>
              <div className="grid grid-cols-2 gap-2 text-content-secondary">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-brand" />
                  <span>Steam Kettle #1 & #2 Sanitized</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-brand" />
                  <span>Cold Shock Ice Bath Ready</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-brand" />
                  <span>Holding Temp Probe Logged (&gt;65°C)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-brand" />
                  <span>Surplus Portions Tagged for NGO</span>
                </label>
              </div>
            </div>

            {/* Print & Close */}
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-divider">
              <Button variant="ghost" onClick={() => setPrepSheetOpen(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                icon={Printer}
                onClick={() => window.print()}
              >
                Print Official Prep Sheet
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
