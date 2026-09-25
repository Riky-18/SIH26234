import React, { useState } from 'react';
import {
  TrendingUp,
  HeartHandshake,
  Utensils,
  Leaf,
  Droplet,
  Car,
  TreeDeciduous,
  DollarSign,
  Award,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Globe,
  PieChart as PieIcon,
  BarChart3,
  X,
  MapPin
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function CommunityImpact({
  ngoData,
  onNavigateHome,
  onNavigateToMap,
  onNavigateToHistory
}) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M'); // '1M' | '3M' | '6M' | '1Y'
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Monthly Rescued Surplus Trend Data
  const monthlyTrendData = [
    { month: 'Apr 2026', weightKg: 1250, meals: 3125, co2AvoidedKg: 3125 },
    { month: 'May 2026', weightKg: 1480, meals: 3700, co2AvoidedKg: 3700 },
    { month: 'Jun 2026', weightKg: 1650, meals: 4125, co2AvoidedKg: 4125 },
    { month: 'Jul 2026', weightKg: 2100, meals: 5250, co2AvoidedKg: 5250 },
    { month: 'Aug 2026', weightKg: 2380, meals: 5950, co2AvoidedKg: 5950 },
    { month: 'Sep 2026', weightKg: 2520, meals: 6300, co2AvoidedKg: 6300 },
  ];

  // Food Category Rescue Breakdown
  const categoryData = [
    { name: 'Cooked Rice & Curries', kg: 5120, percentage: 45, color: '#059669' },
    { name: 'Chapatis & Breads', kg: 2500, percentage: 22, color: '#D97706' },
    { name: 'Fresh Fruits & Veggies', kg: 2160, percentage: 19, color: '#2563EB' },
    { name: 'High-Protein Dairy/Dal', kg: 1600, percentage: 14, color: '#7C3AED' },
  ];

  // Recipient Shelter Distribution
  const shelterAllocationData = [
    { shelter: 'Hope Children Home', meals: 8400, color: '#059669' },
    { shelter: 'Slum Care Evening Hub', meals: 7100, color: '#D97706' },
    { shelter: 'Rainbow Senior Haven', meals: 5200, color: '#2563EB' },
    { shelter: 'Shelter of Grace', meals: 4950, color: '#7C3AED' },
    { shelter: 'Akshaya Food Bank', meals: 2800, color: '#E11D48' },
  ];

  // Top Donating Institutional Kitchens Leaderboard
  const donorLeaderboard = [
    { rank: 1, name: 'BIT Hostel Mess A', divertedKg: 3450, meals: 8625, badge: 'Diamond Rescuer' },
    { rank: 2, name: 'City General Hospital Canteen', divertedKg: 2890, meals: 7225, badge: 'Gold Rescuer' },
    { rank: 3, name: 'Green Valley Catering Hall', divertedKg: 2150, meals: 5375, badge: 'Gold Rescuer' },
    { rank: 4, name: 'Sathy College Canteen', divertedKg: 1540, meals: 3850, badge: 'Silver Rescuer' },
    { rank: 5, name: 'Apex IT Park Cafeteria', divertedKg: 1350, meals: 3375, badge: 'Silver Rescuer' },
  ];

  // Export CSV
  const handleExportData = () => {
    const csvContent =
      'Month,Rescued Kg,Meals Nourished,CO2 Avoided Kg\n' +
      monthlyTrendData
        .map((d) => `"${d.month}",${d.weightKg},${d.meals},${d.co2AvoidedKg}`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `foodloop_community_impact_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Successfully exported Community Impact Dataset!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-soft-lg border border-slate-700 animate-slideUp">
          <Sparkles className="w-4 h-4 text-brand-light" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-info-light text-info uppercase tracking-wider">
                NGO Coordinator • ESG & Social Impact
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>UN SDG 2 & 12 Alignment Verified</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Community Hunger Relief & ESG Impact Analytics
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Verifiable environmental, nutritional, and financial impact metrics generated by surplus food diversion across Bengaluru institutional kitchens.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="primary"
              size="sm"
              icon={Award}
              onClick={() => setCertificateModalOpen(true)}
              className="bg-purple-700 hover:bg-purple-800 text-white border-purple-700"
            >
              Impact Certificate
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportData}
            >
              Export ESG Data
            </Button>

            <Button
              variant="ghost"
              size="sm"
              icon={ArrowRight}
              onClick={onNavigateHome}
            >
              Back to Hub
            </Button>
          </div>
        </div>

        {/* 4 Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5 pt-5 border-t border-divider">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                <span>Meals Nourished</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-200/60 px-1.5 py-0.5 rounded">
                +24%
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-emerald-700 mt-1">
              28,450 Meals
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Pure wholesome hot food delivered
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-info-light/40 border border-info/30">
            <div className="flex items-center justify-between text-info text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                <span>Surplus Food Rescued</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-info mt-1">
              11,380 kg
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              100% diverted from city landfills
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand" />
                <span>CO₂e Avoided</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              28.45 Tonnes
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Landfill methane mitigated
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Economic Value Preserved</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-purple-900 mt-1">
              ₹14,22,500
            </p>
            <p className="text-[11px] text-purple-700 font-medium">
              Direct hunger relief budget saved
            </p>
          </div>
        </div>

        {/* 4 Environmental Equivalence Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-divider">
          <div className="p-3 rounded-xl bg-slate-50 border border-divider flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <TreeDeciduous className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-content-primary block">1,422 Trees</span>
              <span className="text-[10px] text-content-secondary">Carbon absorption equivalent</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-content-primary block">42.6M Liters</span>
              <span className="text-[10px] text-content-secondary">Embodied agricultural water</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-content-primary block">118,500 km</span>
              <span className="text-[10px] text-content-secondary">Vehicle emissions eliminated</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-content-primary block">925 Daily Lives</span>
              <span className="text-[10px] text-content-secondary">Across 5 community shelters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row: Rescue Growth Trend (Left) & Food Categories (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Monthly Growth Area Chart */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Monthly Surplus Diversion & Servings Trend
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Surplus food volume rescued (kg) vs. total nutritious meals distributed
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-divider text-xs">
              {['3M', '6M', '1Y'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTimeframe(t)}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    selectedTimeframe === t ? 'bg-white text-content-primary shadow-xs' : 'text-content-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                  formatter={(value, name) => [
                    name === 'meals' ? `${value.toLocaleString()} meals` : `${value.toLocaleString()} kg`,
                    name === 'meals' ? 'Meals Served' : 'Surplus Rescued'
                  ]}
                />
                <Area type="monotone" dataKey="meals" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMeals)" />
                <Area type="monotone" dataKey="weightKg" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorKg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs border-t border-divider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-content-secondary font-medium">Meals Served (Count)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-content-secondary font-medium">Food Diverted (kg)</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Food Category Breakdown */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-content-primary">
                Food Category Diversity
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Composition of surplus meals diverted by dietary class
              </p>
            </div>
            <PieIcon className="w-4 h-4 text-brand" />
          </div>

          <div className="space-y-3 pt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-bold text-content-primary">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-content-primary">{cat.kg.toLocaleString()} kg</span>
                    <span className="text-content-muted ml-1.5">({cat.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-divider text-xs space-y-1 mt-4">
            <span className="font-bold text-content-primary block">Nutritional Balance Score:</span>
            <p className="text-content-secondary text-[11px] leading-relaxed">
              Surplus rescue streams provide a 45:22:19 carbohydrate, whole-grain, and fresh produce balance conforming to FSSAI guidelines for vulnerable populations.
            </p>
          </div>
        </div>

      </div>

      {/* Row 2: Shelter Beneficiary Allocation & Top Donors Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Shelter Distribution BarChart */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-700" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Shelter Beneficiary Allocation
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Total meals delivered to partner community shelters & orphanages
              </p>
            </div>
            <span className="text-[11px] text-purple-800 font-bold bg-purple-100 px-2 py-0.5 rounded">
              5 Shelters
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shelterAllocationData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="shelter" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val.toLocaleString()} meals delivered`, 'Servings']}
                />
                <Bar dataKey="meals" radius={[0, 6, 6, 0]}>
                  {shelterAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (5 cols): Top Donating Institutional Kitchens */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-divider">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-brand" />
              <h3 className="font-extrabold text-base text-content-primary">
                Top Donor Kitchens
              </h3>
            </div>
            <span className="text-[11px] text-content-muted">Diverted Volume</span>
          </div>

          <div className="space-y-2">
            {donorLeaderboard.map((d) => (
              <div
                key={d.name}
                className="p-2.5 rounded-xl border border-divider bg-slate-50 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    d.rank === 1 ? 'bg-amber-100 text-amber-800' : d.rank === 2 ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-content-muted'
                  }`}>
                    #{d.rank}
                  </span>
                  <div>
                    <span className="font-bold text-content-primary block">{d.name}</span>
                    <span className="text-[10px] text-content-muted">{d.badge}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-brand block">{d.divertedKg} kg</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{d.meals} meals</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: UN Sustainable Development Goals (SDG) Alignment Audit */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-base text-content-primary">
                UN Sustainable Development Goals (SDG) Compliance Audit
              </h3>
            </div>
            <p className="text-xs text-content-secondary mt-0.5">
              Verified corporate sustainability disclosures conforming to global ESG frameworks
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Grade A+ Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* SDG 2 */}
          <div className="p-4 rounded-xl border border-divider bg-slate-50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-rose-700">SDG 2: Zero Hunger</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Target 2.1</span>
            </div>
            <p className="text-content-secondary leading-relaxed">
              Universal access to safe, nutritious food all year round through immediate redistribution of clean institutional surpluses.
            </p>
            <div className="pt-2 border-t border-divider/70 flex justify-between font-semibold">
              <span className="text-content-muted">Target Progress:</span>
              <span className="text-rose-700 font-bold">94% of Annual Goal</span>
            </div>
          </div>

          {/* SDG 12 */}
          <div className="p-4 rounded-xl border border-divider bg-slate-50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-700">SDG 12: Responsible Consumption</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Target 12.3</span>
            </div>
            <p className="text-content-secondary leading-relaxed">
              Halving per capita edible food waste along institutional dining production chains using IoT telemetry and AI menu planning.
            </p>
            <div className="pt-2 border-t border-divider/70 flex justify-between font-semibold">
              <span className="text-content-muted">Target Progress:</span>
              <span className="text-amber-700 font-bold">100% On Track</span>
            </div>
          </div>

          {/* SDG 13 */}
          <div className="p-4 rounded-xl border border-divider bg-slate-50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-emerald-700">SDG 13: Climate Action</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Methane Abatement</span>
            </div>
            <p className="text-content-secondary leading-relaxed">
              Preventing organic landfill methane emission equivalent to 28.45 Tonnes CO₂e via zero-landfill food loop logistics.
            </p>
            <div className="pt-2 border-t border-divider/70 flex justify-between font-semibold">
              <span className="text-content-muted">Target Progress:</span>
              <span className="text-emerald-700 font-bold">28.45 T CO₂e Avoided</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Shelter Testimonials & Field Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-card bg-surface border border-divider shadow-soft space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              SM
            </div>
            <div>
              <h4 className="font-bold text-sm text-content-primary">Sister Mary</h4>
              <p className="text-xs text-content-secondary">Director, Hope Children Home</p>
            </div>
          </div>
          <p className="text-xs text-content-secondary italic leading-relaxed">
            "Before FoodLoop, evening nutrition for 120 children was our daily struggle. Now, we receive fresh, hot food from hostel mess kitchens within 30 minutes of preparation, all digitally temperature-verified."
          </p>
        </div>

        <div className="p-5 rounded-card bg-surface border border-divider shadow-soft space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              DV
            </div>
            <div>
              <h4 className="font-bold text-sm text-content-primary">Dr. Venkat</h4>
              <p className="text-xs text-content-secondary">Chief Trustee, Rainbow Senior Care</p>
            </div>
          </div>
          <p className="text-xs text-content-secondary italic leading-relaxed">
            "The ability to request mild, diabetic-friendly dishes directly through the FoodLoop redistribution network ensures our 85 senior residents get clean, dignified meals every single evening."
          </p>
        </div>
      </div>

      {/* MODAL: OFFICIAL SOCIAL ESG IMPACT CERTIFICATE */}
      {certificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-400 animate-scaleUp max-h-[92vh] overflow-y-auto">
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-divider print:hidden">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-800">
                Official ESG Verification Document
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Certificate
                </Button>
                <button
                  onClick={() => setCertificateModalOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 text-content-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Canvas */}
            <div className="py-6 px-4 md:px-8 text-center text-slate-800 font-serif border-2 border-dashed border-amber-300 rounded-xl my-2 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800 shadow-sm">
                  <Award className="w-8 h-8" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-slate-900 font-sans">
                Certificate of Social Impact
              </h2>
              <p className="text-xs uppercase tracking-widest text-amber-800 font-sans font-bold mt-1">
                Zero-Waste Food Redistribution & Carbon Mitigation
              </p>

              <p className="text-sm font-sans text-slate-600 mt-4 max-w-lg mx-auto">
                This certifies that the partner institutional network of <strong>Feeding Hope Foundation</strong> has successfully diverted edible surplus to vulnerable community shelters.
              </p>

              <div className="grid grid-cols-3 gap-3 my-6 py-4 border-y border-amber-200 font-sans">
                <div>
                  <span className="text-2xl font-black text-emerald-700 block">28,450</span>
                  <span className="text-[11px] uppercase font-bold text-slate-500">Meals Served</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-brand block">11,380 kg</span>
                  <span className="text-[11px] uppercase font-bold text-slate-500">Surplus Rescued</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-purple-700 block">28.45 T</span>
                  <span className="text-[11px] uppercase font-bold text-slate-500">CO₂e Offset</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-sans italic max-w-md mx-auto">
                Certified under FoodLoop Verification Engine in compliance with FSSAI Surplus Food Guidelines and UN SDGs 2, 12, and 13.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 mt-4 border-t border-slate-200 font-sans text-xs">
                <div>
                  <div className="h-10 border-b border-slate-400 flex items-center justify-center font-cursive text-lg text-slate-800">
                    Dr. Anita Roy
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mt-1">
                    Director of ESG & Sustainability
                  </span>
                </div>
                <div>
                  <div className="h-10 border-b border-slate-400 flex items-center justify-center font-cursive text-lg text-emerald-800">
                    Karthik Ramanathan
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mt-1">
                    NGO Chief Operations Officer
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider print:hidden">
              <Button variant="ghost" onClick={() => setCertificateModalOpen(false)}>
                Dismiss
              </Button>
              <Button variant="primary" icon={Printer} onClick={() => window.print()}>
                Print / Save PDF
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
