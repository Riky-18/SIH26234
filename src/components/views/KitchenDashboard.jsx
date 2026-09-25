import React, { useState, useRef } from 'react';
import {
  Trash2,
  AlertTriangle,
  Send,
  TrendingDown,
  Sparkles,
  Thermometer,
  Eye,
  Check,
  X,
  Edit2,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Flame,
  CheckCircle2,
  Share2,
  Scale
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import DataTable from '../common/DataTable';
import ChartCard from '../common/ChartCard';

export default function KitchenDashboard({ data }) {
  const redistributionRef = useRef(null);

  // Local interactive states for demo
  const [menuItems, setMenuItems] = useState(data.menuSuggestions);
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [spoilageList, setSpoilageList] = useState(data.spoilageAlerts);
  const [dispatches, setDispatches] = useState(data.redistribution.dispatches);
  const [surplusSent, setSurplusSent] = useState(false);
  const [modifyModalDish, setModifyModalDish] = useState(null);

  // Filter inventory
  const filteredInventory = data.inventory.filter((item) => {
    const matchesSearch = item.item.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                          item.storage.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleMenuAction = (id, action) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const handleFlagSurplus = (id) => {
    setSpoilageList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, flagged: true } : item))
    );
  };

  const handleDispatchSurplus = () => {
    if (surplusSent) return;
    setSurplusSent(true);
    const newDispatch = {
      id: `d-${Date.now()}`,
      ngo: 'Green Earth Community Kitchen',
      qty: '18 kg',
      status: 'Pending',
      time: 'Just Dispatched • ETA 5:45 PM',
      vehicle: 'Eco Dispatcher 1',
      contact: '+91 98421 99012'
    };
    setDispatches([newDispatch, ...dispatches]);
  };

  const scrollToRedistribution = () => {
    redistributionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const inventoryColumns = [
    {
      header: 'Ingredient / Stock Item',
      accessor: 'item',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-content-primary">{val}</span>
          <span className="block text-xs text-content-secondary">{row.storage}</span>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (val) => (
        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-content-secondary font-medium">
          {val}
        </span>
      )
    },
    {
      header: 'Current Quantity',
      accessor: 'qty',
      render: (val) => <span className="font-bold text-content-primary">{val}</span>
    },
    {
      header: 'Expiry Countdown',
      accessor: 'expiry',
      render: (val, row) => (
        <StatusPill
          text={val}
          level={row.level}
          dot={true}
          size="sm"
        />
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* 5.1 Top Row — Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={Trash2}
          iconColor="brand"
          label="Today's Waste"
          value={`${data.stats.todayWaste} kg`}
          trend="↓ 8% vs yesterday"
          trendDirection="down"
          trendPositive={true}
          subtitle="Target: ≤ 15.0 kg / day"
        />

        <StatCard
          icon={AlertTriangle}
          iconColor="warning"
          label="Items Expiring Today"
          value={`${data.stats.itemsExpiring} items`}
          badge={<StatusPill text="Needs Priority" level="warning" dot={true} />}
          subtitle="Requires immediate prep use"
        />

        <StatCard
          icon={Send}
          iconColor="info"
          label="Surplus Flagged"
          value={`${data.stats.surplusFlagged} alerts`}
          onClick={scrollToRedistribution}
          badge={<StatusPill text="Click to Dispatch" level="info" />}
          subtitle="Redistribution channel open"
        />

        <StatCard
          icon={TrendingDown}
          iconColor="brand"
          label="This Week's Trend"
          value="12.4 kg avg"
          subtitle="Waste (kg) — last 7 days"
          sparklineData={data.stats.weekTrend}
          sparklineKey="waste"
        />
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Menu Suggestion + Inventory */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 5.2 Section — Today's Menu Suggestion */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
            <SectionHeader
              icon={Sparkles}
              title="Suggested Menu — Based on Expiring Stock"
              subtitle="AI recipes automatically generated to exhaust high-risk inventory before spoilage"
              badge={<StatusPill text="AI Recipe Match" level="brand" />}
            />

            <div className="space-y-3.5 mt-2">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    item.status === 'accepted'
                      ? 'bg-success-light/40 border-success/30'
                      : item.status === 'rejected'
                      ? 'bg-slate-50 border-divider opacity-60'
                      : 'bg-slate-50/70 hover:bg-slate-50 border-divider/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-content-primary">{item.dish}</h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-light text-brand">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-xs text-content-secondary font-medium">Uses:</span>
                        {item.uses.map((ing, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                              ing.includes('Today')
                                ? 'bg-danger-light text-danger border border-danger/20'
                                : 'bg-white border border-divider text-content-primary'
                            }`}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {item.status === 'accepted' ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-success px-3 py-1.5 rounded-lg bg-success-light">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Today's Menu</span>
                        </div>
                      ) : item.status === 'rejected' ? (
                        <span className="text-xs text-content-muted font-medium italic">
                          Dish Dismissed
                        </span>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            icon={Check}
                            onClick={() => handleMenuAction(item.id, 'accepted')}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Edit2}
                            onClick={() => setModifyModalDish(item)}
                          >
                            Modify
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={X}
                            onClick={() => handleMenuAction(item.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5.3 Section — Inventory / Expiry Tracker */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
            <SectionHeader
              title="Inventory / Expiry Tracker"
              subtitle="Real-time stock depletion and countdown monitor"
              actions={
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
                    <input
                      type="text"
                      placeholder="Search stock..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 w-36 sm:w-44"
                    />
                  </div>
                </div>
              }
            />

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
              {['All', 'Vegetables', 'Grains', 'Dairy'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-brand text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="text-xs text-content-muted ml-auto hidden sm:block">
                Showing {filteredInventory.length} items
              </span>
            </div>

            <DataTable
              columns={inventoryColumns}
              data={filteredInventory}
              keyField="id"
            />
          </div>
        </div>

        {/* Right Column (5 cols): Live Waste Feed, Spoilage, Redistribution */}
        <div className="lg:col-span-5 space-y-6">

          {/* 5.4 Section — Live Waste Feed (Load Cell Simulation) */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
            <SectionHeader
              icon={Scale}
              title="Live Waste Feed"
              subtitle="IoT Smart Load Cell Bins (Automated Telemetry)"
              badge={<StatusPill text="Bin #A1 Online" level="success" dot={true} />}
            />

            {/* Circular Gauge / Radial progress display */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-divider/70 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
                  Today's Plate Waste
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-content-primary tracking-tight">
                    {data.stats.todayWaste}
                  </span>
                  <span className="text-sm font-semibold text-content-secondary">
                    / {data.stats.targetWaste} kg limit
                  </span>
                </div>
                <p className="text-xs text-success font-medium mt-1">
                  ✓ 2.6 kg below critical daily limit
                </p>
              </div>

              {/* Mini visual gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-brand"
                    strokeDasharray={`${(data.stats.todayWaste / data.stats.targetWaste) * 100}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xs font-bold text-content-primary">
                    {Math.round((data.stats.todayWaste / data.stats.targetWaste) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Waste Breakdown by Meal - Bar chart */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
                Waste by Meal Session (kg)
              </p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.wasteByMeal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="meal" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E5E9F0',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        fontSize: '12px',
                      }}
                      formatter={(val) => [`${val} kg`, 'Waste']}
                    />
                    <Bar dataKey="waste" radius={[8, 8, 0, 0]}>
                      {data.wasteByMeal.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.meal === 'Lunch' ? '#E8A93A' : '#2E6F5E'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between text-xs text-content-secondary pt-2 border-t border-divider">
                <span>Breakfast: 2.1 kg</span>
                <span className="font-semibold text-warning">Lunch: 6.8 kg (Peak)</span>
                <span>Dinner: 3.5 kg</span>
              </div>
            </div>
          </div>

          {/* 5.5 Section — Spoilage Alerts (Computer Vision & Sensor) */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
            <SectionHeader
              icon={Eye}
              title="Spoilage Risk Alerts"
              subtitle="Computer Vision Freshness Index & Thermal Telemetry"
              badge={<StatusPill text="2 High Risk" level="danger" dot={true} />}
            />

            <div className="space-y-3 mt-3">
              {spoilageList.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl border border-divider/70 bg-slate-50/70 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-content-primary text-sm">{alert.item}</span>
                      <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-white border border-divider text-content-secondary font-medium">
                        <Thermometer className="w-3.5 h-3.5 text-danger" />
                        <span>{alert.temp}</span>
                      </div>
                    </div>

                    <StatusPill
                      text={alert.flagged ? 'Flagged for NGO' : `${alert.freshness}% Fresh`}
                      level={alert.flagged ? 'info' : alert.status}
                      size="sm"
                    />
                  </div>

                  <ProgressBar
                    value={alert.freshness}
                    max={100}
                    color={alert.freshness < 50 ? 'danger' : 'warning'}
                    size="sm"
                    showLabel={false}
                    labelLeft="CV Freshness Score"
                    labelRight={`${alert.freshness}%`}
                  />

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-content-secondary italic line-clamp-1">
                      {alert.recommendation}
                    </p>
                    <Button
                      size="sm"
                      variant={alert.flagged ? 'ghost' : 'danger'}
                      onClick={() => handleFlagSurplus(alert.id)}
                      disabled={alert.flagged}
                    >
                      {alert.flagged ? 'Flagged ✓' : 'Flag as Surplus'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5.6 Section — Redistribution Panel */}
          <div
            ref={redistributionRef}
            id="redistribution-section"
            className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60 scroll-mt-20"
          >
            <SectionHeader
              icon={Share2}
              title="Redistribution Dispatch"
              subtitle="Instant transfer of clean prepared surplus to verified shelters"
              badge={<StatusPill text="Live Route" level="brand" />}
            />

            {/* Surplus Ready Highlight Card */}
            <div className="p-4 rounded-xl bg-brand-light/60 border border-brand/20 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">
                    Surplus Batch Ready
                  </span>
                  <h4 className="font-bold text-content-primary text-base mt-0.5">
                    {data.redistribution.readySurplus.qty} • {data.redistribution.readySurplus.item}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-content-secondary mt-1">
                    <span>{data.redistribution.readySurplus.portions}</span>
                    <span>•</span>
                    <span className="text-danger font-medium">Safe until {data.redistribution.readySurplus.safeUntil}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  icon={Send}
                  onClick={handleDispatchSurplus}
                  disabled={surplusSent}
                  className="whitespace-nowrap"
                >
                  {surplusSent ? 'Alert Dispatched ✓' : 'Send Alert to NGO'}
                </Button>
              </div>
            </div>

            {/* NGO Dispatch Status List */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider">
                Active & Recent NGO Dispatches
              </p>
              {dispatches.map((disp) => (
                <div
                  key={disp.id}
                  className="p-3 rounded-xl border border-divider/70 bg-white flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-semibold text-content-primary text-sm block">
                      {disp.ngo}
                    </span>
                    <div className="flex items-center gap-2 text-content-secondary mt-0.5">
                      <span className="font-medium text-brand">{disp.qty}</span>
                      <span>•</span>
                      <span>{disp.time}</span>
                    </div>
                  </div>

                  <StatusPill
                    text={disp.status}
                    level={
                      disp.status === 'Accepted'
                        ? 'info'
                        : disp.status === 'Picked Up'
                        ? 'success'
                        : 'warning'
                    }
                    dot={true}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modify Dish Modal (Interactive Mock) */}
      {modifyModalDish && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-soft-lg border border-divider">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <h3 className="font-bold text-base text-content-primary">
                Modify Recipe: {modifyModalDish.dish}
              </h3>
              <button
                onClick={() => setModifyModalDish(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-content-secondary">Portion Size</label>
                <input
                  type="text"
                  defaultValue="150 Servings (Regular Mess Batch)"
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-divider bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-content-secondary">Expiring Ingredients Included</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {modifyModalDish.uses.map((ing, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-brand-light text-brand font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-content-secondary">Chef Cooking Notes</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Blend tomatoes for puree base to maximize volume"
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-divider bg-slate-50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setModifyModalDish(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleMenuAction(modifyModalDish.id, 'accepted');
                  setModifyModalDish(null);
                }}
              >
                Save & Accept Recipe
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
