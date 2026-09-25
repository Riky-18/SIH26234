import React, { useState } from 'react';
import {
  Scale,
  Clock,
  Activity,
  BarChart3,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Printer,
  Download,
  Sliders,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Utensils,
  X,
  ChevronRight,
  Zap,
  Info,
  Calendar,
  Layers
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function LoadCellWasteLog({
  wasteData,
  onNavigateHome,
  onNavigateToPlanner
}) {
  const [activeTab, setActiveTab] = useState('live-stream'); // 'live-stream' | 'session-analysis' | 'root-cause'
  const [toastMessage, setToastMessage] = useState(null);

  // Filters
  const [binFilter, setBinFilter] = useState('All');
  const [sessionFilter, setSessionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & simulation
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Discard telemetry events
  const initialEvents = [
    {
      id: 'evt-201',
      timestamp: '02:18 PM',
      binId: 'Bin #A1',
      binName: 'Plate Return Conveyor',
      weightDelta: 0.38,
      mealSession: 'Lunch',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: 'Cooked Steamed Rice & Dal',
      rootCause: 'Portion sizing slightly oversized',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-202',
      timestamp: '02:05 PM',
      binId: 'Bin #A1',
      binName: 'Plate Return Conveyor',
      weightDelta: 0.45,
      mealSession: 'Lunch',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: 'Curry Gravy & Chapati Crusts',
      rootCause: 'Normal plate scraping',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-203',
      timestamp: '01:42 PM',
      binId: 'Bin #A2',
      binName: 'Kitchen Prep Station',
      weightDelta: 1.20,
      mealSession: 'Lunch',
      wasteType: 'Pre-Consumer Prep Waste',
      dominantFood: 'Tomato & Onion Peels & Roots',
      rootCause: 'Standard vegetable prep trimmings',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-204',
      timestamp: '01:25 PM',
      binId: 'Bin #A1',
      binName: 'Plate Return Conveyor',
      weightDelta: 0.62,
      mealSession: 'Lunch',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: 'Steamed Sona Masoori Rice',
      rootCause: 'Student unconsumed starch',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-205',
      timestamp: '12:55 PM',
      binId: 'Bin #A3',
      binName: 'Dishwashing Scrape Station',
      weightDelta: 0.85,
      mealSession: 'Lunch',
      wasteType: 'Bulk Tray Residue',
      dominantFood: 'Mixed Dal Residue',
      rootCause: 'Serving kettle base scraping',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-206',
      timestamp: '09:15 AM',
      binId: 'Bin #A1',
      binName: 'Plate Return Conveyor',
      weightDelta: 0.28,
      mealSession: 'Breakfast',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: 'Poha & Chutney Scraps',
      rootCause: 'Minor left-on-plate',
      sensorStatus: 'HX711 Calibrated',
    },
    {
      id: 'evt-207',
      timestamp: '08:45 AM',
      binId: 'Bin #A2',
      binName: 'Kitchen Prep Station',
      weightDelta: 1.10,
      mealSession: 'Breakfast',
      wasteType: 'Pre-Consumer Prep Waste',
      dominantFood: 'Potato Peels & Curry Leaves',
      rootCause: 'Bulk peeling cycle #1',
      sensorStatus: 'HX711 Calibrated',
    }
  ];

  const [events, setEvents] = useState(initialEvents);

  // Hourly curve data
  const hourlyTrend = [
    { time: '08:00 AM', discard: 0.4 },
    { time: '08:30 AM', discard: 0.9 },
    { time: '09:00 AM', discard: 0.8 },
    { time: '12:30 PM', discard: 1.2 },
    { time: '01:00 PM', discard: 2.8 },
    { time: '01:30 PM', discard: 2.1 },
    { time: '02:00 PM', discard: 0.7 },
    { time: '07:30 PM', discard: 1.1 },
    { time: '08:15 PM', discard: 1.8 },
    { time: '09:00 PM', discard: 0.6 }
  ];

  // Meal breakdown data
  const mealSessions = [
    { meal: 'Breakfast', waste: 2.1, target: 4.0, fill: '#2E6F5E' },
    { meal: 'Lunch (Peak)', waste: 6.8, target: 8.0, fill: '#E8A93A' },
    { meal: 'Dinner', waste: 3.5, target: 6.0, fill: '#3B6BC7' },
  ];

  // Discard item composition breakdown
  const compositionBreakdown = [
    { name: 'Steamed Rice & Pilaf', percentage: 42, weightKg: '5.2 kg', color: 'danger' },
    { name: 'Sambar, Dal & Gravies', percentage: 28, weightKg: '3.5 kg', color: 'warning' },
    { name: 'Phulka, Roti Crusts', percentage: 18, weightKg: '2.2 kg', color: 'info' },
    { name: 'Prep Peels & Trimmings', percentage: 12, weightKg: '1.5 kg', color: 'brand' },
  ];

  // Manual discard form state
  const [manualDiscard, setManualDiscard] = useState({
    binId: 'Bin #A1',
    weight: '',
    mealSession: 'Lunch',
    wasteType: 'Post-Consumer Plate Waste',
    dominantFood: '',
    rootCause: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add manual discard event
  const handleAddDiscard = (e) => {
    e.preventDefault();
    if (!manualDiscard.weight) {
      alert('Please enter weight in kg');
      return;
    }

    const created = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just Now',
      binId: manualDiscard.binId,
      binName:
        manualDiscard.binId === 'Bin #A1'
          ? 'Plate Return Conveyor'
          : manualDiscard.binId === 'Bin #A2'
          ? 'Kitchen Prep Station'
          : 'Dishwashing Scrape Station',
      weightDelta: parseFloat(manualDiscard.weight),
      mealSession: manualDiscard.mealSession,
      wasteType: manualDiscard.wasteType,
      dominantFood: manualDiscard.dominantFood || 'Mixed Plate Residue',
      rootCause: manualDiscard.rootCause || 'Manual kitchen scale log',
      sensorStatus: 'Logged & Verified',
    };

    setEvents([created, ...events]);
    setIsLogModalOpen(false);
    setManualDiscard({
      binId: 'Bin #A1',
      weight: '',
      mealSession: 'Lunch',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: '',
      rootCause: '',
    });
    showToast(`✓ Logged +${created.weightDelta} kg discard event on ${created.binId}`);
  };

  // Simulate incoming live telemetry event
  const handleSimulateTelemetry = () => {
    const randomWeights = [0.22, 0.35, 0.48, 0.19];
    const pickedWeight = randomWeights[Math.floor(Math.random() * randomWeights.length)];
    const mockTelemetry = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just Now',
      binId: 'Bin #A1',
      binName: 'Plate Return Conveyor',
      weightDelta: pickedWeight,
      mealSession: 'Lunch',
      wasteType: 'Post-Consumer Plate Waste',
      dominantFood: 'Cooked Steamed Rice & Dal Residue',
      rootCause: 'Live IoT Telemetry Ping',
      sensorStatus: 'HX711 Strain Gauge Live',
    };

    setEvents([mockTelemetry, ...events]);
    showToast(`📡 Live IoT Telemetry Detected: +${pickedWeight} kg on Bin #A1 (HX711 Load Cell)`);
  };

  // Tare All Load Cell Bins
  const handleTareAll = () => {
    showToast('⚖️ Bin #A1, Bin #A2, and Bin #A3 calibrated and tared to 0.00 kg!');
  };

  // Filtered Events
  const filteredEvents = events.filter((evt) => {
    const matchBin = binFilter === 'All' || evt.binId === binFilter;
    const matchSession = sessionFilter === 'All' || evt.mealSession === sessionFilter;
    const matchSearch =
      !searchQuery ||
      evt.dominantFood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.rootCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.binId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchBin && matchSession && matchSearch;
  });

  // Calculate totals
  const totalDiscardKg = events
    .reduce((acc, evt) => acc + (evt.weightDelta || 0), 0)
    .toFixed(2);

  const binA1Total = events
    .filter((e) => e.binId === 'Bin #A1')
    .reduce((acc, e) => acc + (e.weightDelta || 0), 0)
    .toFixed(1);

  const binA2Total = events
    .filter((e) => e.binId === 'Bin #A2')
    .reduce((acc, e) => acc + (e.weightDelta || 0), 0)
    .toFixed(1);

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
                Kitchen Module • IoT Telemetry
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>3 Smart Load Cell Discard Stations Online</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Load Cell Automated Waste Feeds
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              High-frequency strain gauge telemetry capturing live plate discards, preparation waste ratios, and AI root-cause analysis to eliminate dining waste at source.
            </p>
          </div>

          {/* Quick Header Actions: Simulate Ping, Log Event, Return Home */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={Activity}
              onClick={handleSimulateTelemetry}
            >
              Simulate IoT Ping
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsLogModalOpen(true)}
            >
              Log Discard Event
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
          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-brand" />
                <span>Today's Total Waste</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              {totalDiscardKg} kg
            </p>
            <p className="text-[11px] text-success font-medium">
              ✓ 2.6 kg below daily ceiling (15.0 kg)
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-info" />
                <span>Bin #A1 (Plate Return)</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              {binA1Total} kg
            </p>
            <p className="text-[11px] text-content-secondary">
              Post-consumer diner scrapes
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-brand" />
                <span>Per-Diner Discard</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              48 g / plate
            </p>
            <p className="text-[11px] text-success font-medium">
              Top 10% Campus Benchmark 🏆
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span>Peak Waste Session</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              Lunch (6.8 kg)
            </p>
            <p className="text-[11px] text-warning font-medium">
              Peak: 01:00 PM – 01:30 PM
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-divider pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('live-stream')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'live-stream'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Live Telemetry Event Feed</span>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('session-analysis')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'session-analysis'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Hourly & Session Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('root-cause')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'root-cause'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Root-Cause Autopsy & Insights</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE TELEMETRY STREAM */}
      {activeTab === 'live-stream' && (
        <div className="space-y-4">
          {/* Controls Bar: Filters & Tare Button */}
          <div className="bg-surface rounded-card p-4 md:p-5 shadow-soft border border-divider/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
              <input
                type="text"
                placeholder="Search food item, bin ID, or root-cause notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            {/* Filter Selectors & Tare Action */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={binFilter}
                onChange={(e) => setBinFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium"
              >
                <option value="All">All Smart Bins</option>
                <option value="Bin #A1">Bin #A1 (Plate Return)</option>
                <option value="Bin #A2">Bin #A2 (Prep Counter)</option>
                <option value="Bin #A3">Bin #A3 (Scrape Station)</option>
              </select>

              <select
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium"
              >
                <option value="All">All Meal Shifts</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>

              <Button
                variant="secondary"
                size="sm"
                icon={RotateCcw}
                onClick={handleTareAll}
                className="whitespace-nowrap"
              >
                Tare All Bins
              </Button>
            </div>
          </div>

          {/* Telemetry Event Stream Table */}
          <div className="bg-surface rounded-card shadow-soft border border-divider/70 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-divider text-content-muted uppercase font-bold text-[11px]">
                    <th className="py-3.5 px-4">Event Timestamp</th>
                    <th className="py-3.5 px-4">Smart Bin Hardware</th>
                    <th className="py-3.5 px-4">Weight Scrapped</th>
                    <th className="py-3.5 px-4">Meal Session</th>
                    <th className="py-3.5 px-4">Dominant Food Scrapped</th>
                    <th className="py-3.5 px-4">AI Inferred Root Cause</th>
                    <th className="py-3.5 px-4 text-right">Telemetry Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider/60">
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Timestamp */}
                      <td className="py-3.5 px-4 font-mono font-bold text-content-primary flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-content-muted" />
                        <span>{evt.timestamp}</span>
                      </td>

                      {/* Bin Hardware */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-content-primary block">
                            {evt.binId}
                          </span>
                          <span className="text-[11px] text-content-secondary">
                            {evt.binName}
                          </span>
                        </div>
                      </td>

                      {/* Weight */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-sm text-brand bg-brand-light/60 px-2 py-0.5 rounded-lg border border-brand/20">
                          +{evt.weightDelta.toFixed(2)} kg
                        </span>
                      </td>

                      {/* Meal Shift */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-semibold ${
                            evt.mealSession === 'Lunch'
                              ? 'bg-warning-light text-warning'
                              : 'bg-slate-100 text-content-secondary'
                          }`}
                        >
                          {evt.mealSession}
                        </span>
                      </td>

                      {/* Dominant Food */}
                      <td className="py-3.5 px-4 font-medium text-content-primary">
                        {evt.dominantFood}
                      </td>

                      {/* Root Cause */}
                      <td className="py-3.5 px-4 text-content-secondary italic">
                        {evt.rootCause}
                      </td>

                      {/* Telemetry Status */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-[11px] text-success font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{evt.sensorStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 text-content-secondary">
                <Scale className="w-10 h-10 text-content-muted mx-auto mb-2 opacity-50" />
                <p className="font-semibold text-sm">No telemetry events found for your search criteria</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HOURLY & SESSION ANALYSIS */}
      {activeTab === 'session-analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left: Hourly Discard Curve (7 cols) */}
          <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
            <SectionHeader
              icon={Activity}
              title="Hourly Dining Telemetry Curve"
              subtitle="Captures discard surges during service hours to calibrate tray clearance cadence"
            />

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="discardGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E6F5E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2E6F5E" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5E9F0',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val} kg`, 'Discard Rate']}
                  />
                  <Area type="monotone" dataKey="discard" stroke="#2E6F5E" strokeWidth={2.5} fillOpacity={1} fill="url(#discardGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-divider flex items-center justify-between text-xs text-content-secondary">
              <span>Peak Recorded Rate: <strong>2.8 kg / 30 mins</strong> at 1:00 PM</span>
              <span className="text-success font-semibold">Tapered to 0.7 kg by 2:00 PM</span>
            </div>
          </div>

          {/* Right: Discard by Session & Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Session Bar Chart */}
            <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
              <SectionHeader
                icon={BarChart3}
                title="Discard by Meal Session (kg)"
                subtitle="Comparison against designated session quotas"
              />

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mealSessions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="meal" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E5E9F0',
                        fontSize: '12px',
                      }}
                      formatter={(val) => [`${val} kg`, 'Waste']}
                    />
                    <Bar dataKey="waste" radius={[8, 8, 0, 0]}>
                      {mealSessions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-xs text-content-secondary pt-2 border-t border-divider">
                <span>Breakfast: 2.1 kg</span>
                <span className="font-bold text-warning">Lunch: 6.8 kg (Peak)</span>
                <span>Dinner: 3.5 kg</span>
              </div>
            </div>

            {/* Food Item Breakdown */}
            <div className="bg-surface rounded-card p-5 shadow-soft border border-divider/70 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-content-secondary block">
                Discard Composition Breakdown
              </span>

              <div className="space-y-2.5">
                {compositionBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold text-content-primary">{item.name}</span>
                      <span className="font-bold text-content-secondary">{item.weightKg} ({item.percentage}%)</span>
                    </div>
                    <ProgressBar
                      value={item.percentage}
                      max={100}
                      color={item.color}
                      size="sm"
                      showLabel={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI ROOT-CAUSE AUTOPSY & INSIGHTS */}
      {activeTab === 'root-cause' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider space-y-5 animate-fadeIn">
          <SectionHeader
            icon={Sparkles}
            title="ChefMind AI Root-Cause Diagnostic Autopsy"
            subtitle="Machine learning analysis cross-referencing prep recipes, student headcount turnout, and plate scraping telemetry"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-divider bg-slate-50/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-danger-light text-danger flex items-center justify-center font-bold">
                  🍚
                </span>
                <div>
                  <h4 className="font-bold text-sm text-content-primary">
                    Rice Portion Oversizing
                  </h4>
                  <span className="text-[10px] text-danger font-semibold">42% of total discard (5.2 kg)</span>
                </div>
              </div>
              <p className="text-content-secondary leading-relaxed">
                Telemetry indicates students scrape ~65g of rice per plate on Fridays when accompanied by high-volume dal.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-brand/20 text-brand font-medium">
                💡 <strong>Actionable Fix:</strong> Reduce primary serving ladle size from 180g to 140g. Provide a self-serve secondary warm station for students requesting extra portions.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-divider bg-slate-50/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-warning-light text-warning flex items-center justify-center font-bold">
                  🌶️
                </span>
                <div>
                  <h4 className="font-bold text-sm text-content-primary">
                    Spice Gradient Fluctuation
                  </h4>
                  <span className="text-[10px] text-warning font-semibold">28% of total discard (3.5 kg)</span>
                </div>
              </div>
              <p className="text-content-secondary leading-relaxed">
                Tomato Dal Tadka batch #2 cooked with red chili powder variance (+20 SHU) generated 1.4 kg higher gravy discard than batch #1.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-brand/20 text-brand font-medium">
                💡 <strong>Actionable Fix:</strong> Standardize dry spice measure to 25g per 10kg dal batch. Use roasted whole cumin for flavor rather than raw chili powder.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-divider bg-slate-50/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-info-light text-info flex items-center justify-center font-bold">
                  📉
                </span>
                <div>
                  <h4 className="font-bold text-sm text-content-primary">
                    Weekend Outing Turnout Drop
                  </h4>
                  <span className="text-[10px] text-info font-semibold">Predicted 18% absentee rate</span>
                </div>
              </div>
              <p className="text-content-secondary leading-relaxed">
                Biometric gate records indicate 75 hostel students depart on Friday evenings, causing over-prep if batch size is kept at standard 250 pax.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-brand/20 text-brand font-medium">
                💡 <strong>Actionable Fix:</strong> Scale tonight's dinner batch down to 175 portions in the AI Menu Planner.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-divider">
            <Button
              variant="primary"
              icon={Sparkles}
              onClick={onNavigateToPlanner}
            >
              Open AI Menu Planner to Auto-Scale Batches ↗
            </Button>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL BULK DISCARD LOG */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <h3 className="font-bold text-base text-content-primary">
                Log Waste Discard Event
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDiscard} className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Smart Bin Station
                  </label>
                  <select
                    value={manualDiscard.binId}
                    onChange={(e) => setManualDiscard({ ...manualDiscard, binId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option value="Bin #A1">Bin #A1 (Plate Return)</option>
                    <option value="Bin #A2">Bin #A2 (Prep Counter)</option>
                    <option value="Bin #A3">Bin #A3 (Scrape Station)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    placeholder="e.g. 0.85"
                    required
                    value={manualDiscard.weight}
                    onChange={(e) => setManualDiscard({ ...manualDiscard, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Meal Session
                  </label>
                  <select
                    value={manualDiscard.mealSession}
                    onChange={(e) => setManualDiscard({ ...manualDiscard, mealSession: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Snacks</option>
                    <option>Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Waste Category
                  </label>
                  <select
                    value={manualDiscard.wasteType}
                    onChange={(e) => setManualDiscard({ ...manualDiscard, wasteType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option>Post-Consumer Plate Waste</option>
                    <option>Pre-Consumer Prep Waste</option>
                    <option>Bulk Leftover / Over-catering</option>
                    <option>Spoilage Discard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Dominant Food Scrapped
                </label>
                <input
                  type="text"
                  placeholder="e.g. Steamed Rice, Sambar, Chapati"
                  value={manualDiscard.dominantFood}
                  onChange={(e) => setManualDiscard({ ...manualDiscard, dominantFood: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Root Cause / Kitchen Observation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Students noted dal was excessively salted"
                  value={manualDiscard.rootCause}
                  onChange={(e) => setManualDiscard({ ...manualDiscard, rootCause: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-divider">
                <Button variant="ghost" onClick={() => setIsLogModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Record Discard Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
