export const mockData = {
  kitchen: {
    stats: {
      todayWaste: 12.4,
      wasteChange: -8, // down 8% vs yesterday
      targetWaste: 15.0,
      itemsExpiring: 5,
      surplusFlagged: 2,
      weekTrend: [
        { day: 'Mon', waste: 10.2 },
        { day: 'Tue', waste: 14.1 },
        { day: 'Wed', waste: 9.3 },
        { day: 'Thu', waste: 12.0 },
        { day: 'Fri', waste: 11.5 },
        { day: 'Sat', waste: 13.0 },
        { day: 'Sun', waste: 12.4 },
      ]
    },
    menuSuggestions: [
      {
        id: 'ms-1',
        dish: 'Tomato Dal Tadka',
        category: 'Lunch Special',
        uses: ['Tomatoes (Expiring Today)', 'Onions (2 days)', 'Lentils'],
        confidence: '94% match',
        status: 'pending', // pending, accepted, rejected
      },
      {
        id: 'ms-2',
        dish: 'Palak Paneer Gravy',
        category: 'Dinner Special',
        uses: ['Spinach (Expiring Today)', 'Paneer (2 days)'],
        confidence: '91% match',
        status: 'pending',
      },
      {
        id: 'ms-3',
        dish: 'Crispy Aloo Jeera',
        category: 'Sides',
        uses: ['Potatoes (6 days)', 'Fresh Coriander'],
        confidence: '86% match',
        status: 'pending',
      }
    ],
    inventory: [
      { id: 1, item: 'Tomatoes', qty: '15 kg', category: 'Vegetables', expiry: 'Today', level: 'danger', storage: 'Walk-in Cooler A' },
      { id: 2, item: 'Onions', qty: '22 kg', category: 'Vegetables', expiry: '2 days', level: 'warning', storage: 'Dry Storage B' },
      { id: 3, item: 'Rice (Sona Masoori)', qty: '40 kg', category: 'Grains', expiry: '12 days', level: 'success', storage: 'Silo 2' },
      { id: 4, item: 'Fresh Milk', qty: '18 L', category: 'Dairy', expiry: '1 day', level: 'warning', storage: 'Fridge 1' },
      { id: 5, item: 'Potatoes', qty: '30 kg', category: 'Vegetables', expiry: '6 days', level: 'success', storage: 'Dry Storage A' },
      { id: 6, item: 'Spinach (Palak)', qty: '8 kg', category: 'Vegetables', expiry: 'Today', level: 'danger', storage: 'Crisper Bay' },
      { id: 7, item: 'Toor Dal (Lentils)', qty: '25 kg', category: 'Grains', expiry: '20 days', level: 'success', storage: 'Grain Bin 3' },
      { id: 8, item: 'Paneer Block', qty: '6 kg', category: 'Dairy', expiry: '2 days', level: 'warning', storage: 'Cold Room 2' },
    ],
    wasteByMeal: [
      { meal: 'Breakfast', waste: 2.1, max: 5 },
      { meal: 'Lunch', waste: 6.8, max: 10 },
      { meal: 'Dinner', waste: 3.5, max: 8 },
    ],
    spoilageAlerts: [
      { id: 'sa-1', item: 'Spinach', temp: '6°C', optimalTemp: '4°C', freshness: 62, status: 'warning', recommendation: 'Cook within 6 hours or flag surplus' },
      { id: 'sa-2', item: 'Tomatoes', temp: '8°C', optimalTemp: '10°C', freshness: 48, status: 'danger', recommendation: 'Process into sauce or transfer to NGO' },
    ],
    redistribution: {
      readySurplus: {
        item: 'Cooked Steamed Rice & Dal',
        qty: '18 kg',
        portions: '~45 meals',
        readyTime: '1:45 PM',
        safeUntil: '6:30 PM',
      },
      dispatches: [
        { id: 'd-1', ngo: 'Helping Hands Shelter', qty: '18 kg', status: 'Accepted', time: 'Pickup by 6:00 PM', vehicle: 'Van #TN-38-4021', contact: '+91 98421 88310' },
        { id: 'd-2', ngo: 'Annapoorna Trust', qty: '6 kg', status: 'Picked Up', time: 'Delivered 2:15 PM', vehicle: 'Eco-Rikshaw #2', contact: '+91 94432 10982' },
      ]
    }
  },

  ngo: {
    stats: {
      activeAlerts: 4,
      mealsThisMonth: 1240,
      pickupsCompleted: 38,
      avgResponse: '18 min',
    },
    alerts: [
      {
        id: 'alt-1',
        kitchen: 'BIT Hostel Mess A',
        location: 'North Campus, Gate 2',
        qty: '22 kg',
        meals: '~55 meals',
        items: 'Mixed Rice, Sambar & Poriyal',
        distance: '1.8 km away',
        window: '6:00 PM',
        urgency: 'high',
        preparedAt: '1:30 PM',
        contact: '+91 98421 55601',
        coords: { x: 38, y: 35 }
      },
      {
        id: 'alt-2',
        kitchen: 'City General Hospital Canteen',
        location: 'Main Medical Wing, B1',
        qty: '15 kg',
        meals: '~38 meals',
        items: 'Chapati, Vegetable Curry & Dal',
        distance: '3.2 km away',
        window: '5:30 PM',
        urgency: 'urgent',
        preparedAt: '1:00 PM',
        contact: '+91 97890 22314',
        coords: { x: 65, y: 25 }
      },
      {
        id: 'alt-3',
        kitchen: 'Sathy College Canteen',
        location: 'Student Union Hub',
        qty: '9 kg',
        meals: '~22 meals',
        items: 'Idli, Upma & Coconut Chutney',
        distance: '2.5 km away',
        window: '7:00 PM',
        urgency: 'medium',
        preparedAt: '2:15 PM',
        contact: '+91 94422 66781',
        coords: { x: 22, y: 68 }
      },
      {
        id: 'alt-4',
        kitchen: 'Green Valley Catering',
        location: 'Industrial Estate Hall 4',
        qty: '30 kg',
        meals: '~75 meals',
        items: 'Veg Pulao, Paneer Gravy, Curd',
        distance: '4.1 km away',
        window: '6:45 PM',
        urgency: 'medium',
        preparedAt: '2:00 PM',
        contact: '+91 99941 87654',
        coords: { x: 80, y: 72 }
      },
    ],
    initialActivePickup: {
      id: 'active-pickup-1',
      kitchen: 'BIT Hostel Mess A',
      address: 'North Block Kitchen, Behind Boys Hostel 3',
      contact: '+91 98421 55601 (Chef Raman)',
      qty: '22 kg (~55 meals)',
      vehicleAssigned: 'Transit Van (KA-05-MN-2201)',
      driverName: 'Karthik S.',
      eta: '14 mins',
      acceptedTime: '4:46 PM',
      windowDeadline: '6:00 PM',
      tempControlled: true,
    },
    history: [
      { id: 'h-1', date: '22 Sep 2026', kitchen: 'BIT Hostel Mess A', qty: '18 kg', meals: '45 meals', status: 'Delivered', recipient: 'Hope Children Home' },
      { id: 'h-2', date: '21 Sep 2026', kitchen: 'City General Hospital', qty: '24 kg', meals: '60 meals', status: 'Delivered', recipient: 'Rainbow Senior Care' },
      { id: 'h-3', date: '20 Sep 2026', kitchen: 'Annapoorna Kitchen', qty: '14 kg', meals: '35 meals', status: 'Delivered', recipient: 'Slum Community Center' },
      { id: 'h-4', date: '19 Sep 2026', kitchen: 'Sathy College Canteen', qty: '12 kg', meals: '30 meals', status: 'Delivered', recipient: 'Night Shelter Zone 4' },
      { id: 'h-5', date: '18 Sep 2026', kitchen: 'Green Valley Catering', qty: '28 kg', meals: '70 meals', status: 'Delivered', recipient: 'Hope Children Home' },
    ],
    impact: {
      meals: '1,240',
      peopleServed: '~310',
      kitchensPartnered: '12',
      co2Diverted: '1,550 kg',
    }
  },

  admin: {
    stats: {
      wastePrevented: '486 kg',
      wastePreventedTrend: '+14% vs last month',
      costSaved: '₹38,200',
      costSavedTrend: '+9% vs last month',
      carbonSaved: '612 kg CO₂',
      carbonSavedTrend: '+18% vs last month',
      mealsRedistributed: '1,240',
      mealsRedistributedTrend: '+22% vs last month',
    },
    trends: {
      monthly: [
        { period: 'Apr', waste: 620, prevented: 310, target: 500 },
        { period: 'May', waste: 590, prevented: 360, target: 480 },
        { period: 'Jun', waste: 540, prevented: 410, target: 460 },
        { period: 'Jul', waste: 510, prevented: 440, target: 440 },
        { period: 'Aug', waste: 495, prevented: 470, target: 420 },
        { period: 'Sep', waste: 486, prevented: 520, target: 400 },
      ],
      weekly: [
        { period: 'Week 1', waste: 130, prevented: 110, target: 100 },
        { period: 'Week 2', waste: 125, prevented: 122, target: 100 },
        { period: 'Week 3', waste: 118, prevented: 140, target: 100 },
        { period: 'Week 4', waste: 113, prevented: 148, target: 100 },
      ],
      daily: [
        { period: 'Mon', waste: 18, prevented: 22, target: 15 },
        { period: 'Tue', waste: 16, prevented: 24, target: 15 },
        { period: 'Wed', waste: 15, prevented: 26, target: 15 },
        { period: 'Thu', waste: 14, prevented: 25, target: 15 },
        { period: 'Fri', waste: 17, prevented: 21, target: 15 },
        { period: 'Sat', waste: 19, prevented: 20, target: 15 },
        { period: 'Sun', waste: 14, prevented: 28, target: 15 },
      ]
    },
    wasteReasons: [
      { name: 'Exam Week', value: 32, color: '#E56C6C', desc: 'Irregular student attendance & late study schedules' },
      { name: 'Weekend', value: 24, color: '#E8A93A', desc: 'Unregistered outings & outside dining fluctuations' },
      { name: 'Event Day', value: 18, color: '#3B6BC7', desc: 'Festivals & sports events over-catering' },
      { name: 'Normal Day', value: 26, color: '#4CAF7D', desc: 'Standard preparation margin variance' },
    ],
    partners: [
      { id: 1, ngo: 'Helping Hands Shelter', meals: 620, lastPickup: '22 Sep 2026', rating: '★ 4.8', contact: 'Anita Roy', status: 'Active' },
      { id: 2, ngo: 'Annapoorna Trust', meals: 410, lastPickup: '20 Sep 2026', rating: '★ 4.9', contact: 'Dr. Ramesh K.', status: 'Active' },
      { id: 3, ngo: 'Green Earth Community Kitchen', meals: 210, lastPickup: '18 Sep 2026', rating: '★ 4.7', contact: 'Revathi M.', status: 'Active' },
    ],
    esg: {
      title: 'Monthly ESG Sustainability Report — September 2026',
      period: '1 Sep 2026 – 30 Sep 2026',
      accreditation: 'GHG Protocol & SDG 12.3 Compliant',
      checks: [
        { label: 'IoT Load Cell Waste Data Logged', verified: true },
        { label: 'Redistribution Chain of Custody Tracked', verified: true },
        { label: 'Direct & Indirect Carbon Metrics Verified', verified: true },
        { label: 'Cold-chain Temperature Logs Audited', verified: true },
      ]
    },
    leaderboard: [
      { block: 'Block C (Girls Hostel)', score: 92, wastePerCapita: '48g/plate', trend: '↑ +6 pts', badge: 'Top Performer 🏆', color: 'brand' },
      { block: 'Block A (Boys Hostel)', score: 81, wastePerCapita: '72g/plate', trend: '↑ +3 pts', badge: 'Silver Tier 🥈', color: 'info' },
      { block: 'Block B (PG Scholars)', score: 74, wastePerCapita: '89g/plate', trend: '↓ -2 pts', badge: 'Needs Focus 🎯', color: 'warning' },
    ]
  }
};
