import React, { useState } from 'react';
import {
  TrendingUp,
  Scale,
  DollarSign,
  Leaf,
  Utensils,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  ChevronRight,
  Info,
  ShieldCheck,
  X,
  Clock,
  Eye,
  FileText
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
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

export default function WasteAnalytics({
  adminData,
  onNavigateHome,
  onNavigateToAutopsy
}) {
  const [period, setPeriod] = useState('monthly'); // 'daily' | 'weekly' | 'monthly'
  const [selectedFacility, setSelectedFacility] = useState('All');
  const [selectedStream, setSelectedStream] = useState('All');
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Trend Data for Charts
  const trendDataMap = {
    monthly: [
      { period: 'Apr', actualWaste: 620, targetCap: 500, prevented: 310, costLoss: 43400 },
      { period: 'May', actualWaste: 590, targetCap: 480, prevented: 360, costLoss: 41300 },
      { period: 'Jun', actualWaste: 540, targetCap: 460, prevented: 410, costLoss: 37800 },
      { period: 'Jul', actualWaste: 510, targetCap: 440, prevented: 440, costLoss: 35700 },
      { period: 'Aug', actualWaste: 495, targetCap: 420, prevented: 470, costLoss: 34650 },
      { period: 'Sep', actualWaste: 486, targetCap: 400, prevented: 520, costLoss: 34020 },
    ],
    weekly: [
      { period: 'Week 1', actualWaste: 130, targetCap: 100, prevented: 110, costLoss: 9100 },
      { period: 'Week 2', actualWaste: 125, targetCap: 100, prevented: 122, costLoss: 8750 },
      { period: 'Week 3', actualWaste: 118, targetCap: 100, prevented: 140, costLoss: 8260 },
      { period: 'Week 4', actualWaste: 113, targetCap: 100, prevented: 148, costLoss: 7910 },
    ],
    daily: [
      { period: 'Mon', actualWaste: 18, targetCap: 15, prevented: 22, costLoss: 1260 },
      { period: 'Tue', actualWaste: 16, targetCap: 15, prevented: 24, costLoss: 1120 },
      { period: 'Wed', actualWaste: 15, targetCap: 15, prevented: 26, costLoss: 1050 },
      { period: 'Thu', actualWaste: 14, targetCap: 15, prevented: 25, costLoss: 980 },
      { period: 'Fri', actualWaste: 17, targetCap: 15, prevented: 21, costLoss: 1190 },
      { period: 'Sat', actualWaste: 19, targetCap: 15, prevented: 20, costLoss: 1330 },
      { period: 'Sun', actualWaste: 14, targetCap: 15, prevented: 28, costLoss: 980 },
    ]
  };

  const activeTrendData = trendDataMap[period] || trendDataMap.monthly;

  // Waste Stage Breakdown (Where does food loss occur?)
  const wasteStages = [
    { stage: 'Buffer Overproduction (Unserved)', kg: 616, percentage: 48, color: '#E11D48', desc: 'Excess batch cooking unconsumed on service line' },
    { stage: 'Consumer Post-Dining Plate Scrap', kg: 436, percentage: 34, color: '#D97706', desc: 'Discarded portions returned at dish return conveyer' },
    { stage: 'Kitchen Preparation Trimmings', kg: 232, percentage: 18, color: '#2563EB', desc: 'Peeling, sorting & trimming trimmings during prep' },
  ];

  // Dining Facility Benchmarks
  const facilityBenchmarks = [
    { facility: 'Block C (Girls Mess)', wastePerCapita: 48, totalKg: 280, rating: 'Top Performer 🏆', color: '#059669' },
    { facility: 'Block A (Boys Mess)', wastePerCapita: 72, totalKg: 420, rating: 'Silver Tier 🥈', color: '#2563EB' },
    { facility: 'Apex IT Park Cafeteria', wastePerCapita: 54, totalKg: 240, rating: 'Silver Tier 🥈', color: '#059669' },
    { facility: 'City Hospital Canteen', wastePerCapita: 62, totalKg: 310, rating: 'Standard Tier', color: '#D97706' },
    { facility: 'Block B (PG Scholars Mess)', wastePerCapita: 89, totalKg: 490, rating: 'Needs Focus 🎯', color: '#E11D48' },
  ];

  // Root Cause Temporal Factors
  const rootCauses = [
    { factor: 'Exam & Test Weeks', impact: 32, desc: 'Irregular student attendance & late study schedule changes' },
    { factor: 'Weekend Outings', impact: 24, desc: 'Unregistered student departures & off-campus dining spikes' },
    { factor: 'Standard Prep Margin', impact: 26, desc: 'Safety buffers maintained for unexpected dining rushes' },
    { factor: 'Special Events & Buffets', impact: 18, desc: 'Festival celebrations & inter-college symposiums' },
  ];

  // Detailed Waste Log Audit Records
  const initialAuditLogs = [
    {
      id: 'WST-7021',
      date: '24 Sep 2026',
      time: '2:45 PM',
      facility: 'BIT Hostel Mess A',
      stream: 'Overproduction Buffer',
      item: 'Steamed Rice & Dal Makhani',
      weightKg: 22,
      mealsEquiv: 55,
      costLoss: 1540,
      divertedTo: 'Hope Children Home (Redistributed)',
      status: 'Rescued 100%'
    },
    {
      id: 'WST-7020',
      date: '24 Sep 2026',
      time: '9:30 AM',
      facility: 'BIT Hostel Mess B',
      stream: 'Preparation Trimmings',
      item: 'Potato & Cabbage Peels',
      weightKg: 14,
      mealsEquiv: 0,
      costLoss: 420,
      divertedTo: 'Campus Biogas Digester',
      status: 'Composted'
    },
    {
      id: 'WST-7019',
      date: '23 Sep 2026',
      time: '8:45 PM',
      facility: 'City Hospital Canteen',
      stream: 'Plate Scraps',
      item: 'Mixed Leftover Rice & Bread',
      weightKg: 18,
      mealsEquiv: 45,
      costLoss: 1260,
      divertedTo: 'Organic Soil Composter',
      status: 'Composted'
    },
    {
      id: 'WST-7018',
      date: '23 Sep 2026',
      time: '2:15 PM',
      facility: 'Green Valley Catering',
      stream: 'Overproduction Buffer',
      item: 'Veg Pulao & Paneer Gravy',
      weightKg: 30,
      mealsEquiv: 75,
      costLoss: 2400,
      divertedTo: 'Slum Children Care (Redistributed)',
      status: 'Rescued 100%'
    },
    {
      id: 'WST-7017',
      date: '22 Sep 2026',
      time: '1:45 PM',
      facility: 'Apex IT Park Cafeteria',
      stream: 'Overproduction Buffer',
      item: 'Jeera Rice & Yellow Dal',
      weightKg: 16,
      mealsEquiv: 40,
      costLoss: 1120,
      divertedTo: 'Rainbow Senior Care (Redistributed)',
      status: 'Rescued 100%'
    },
  ];

  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Audit ID,Date,Time,Facility,Waste Stream,Items,Weight (kg),Meals Equivalent,Financial Loss (INR),Diversion Destination,Status\n';
    const rows = auditLogs
      .map(
        (l) =>
          `"${l.id}","${l.date}","${l.time}","${l.facility}","${l.stream}","${l.item}",${l.weightKg},${l.mealsEquiv},${l.costLoss},"${l.divertedTo}","${l.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `foodloop_waste_analytics_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Successfully exported Waste Analytics CSV!');
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 uppercase tracking-wider">
                Sustainability Admin • Waste Analytics
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>IoT Load Cell Telemetry Stream Live</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Campus Waste Analytics & Prevention Intelligence
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              High-resolution food discard analytics, dining hall benchmarks, overproduction buffer curves, and ESG zero-landfill diversion tracking.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={() => setAuditModalOpen(true)}
              className="bg-purple-700 hover:bg-purple-800 text-white border-purple-700 shadow-sm"
            >
              Print Waste Audit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportCSV}
            >
              Export CSV
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
                <span>Actual Waste Logged</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded">
                ↓ 18%
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              486 kg
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Down from 620 kg baseline
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Waste Prevented / Diverted</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-emerald-700 mt-1">
              520 kg
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              +14% higher prevention rate
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Cost Loss Mitigated</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-purple-900 mt-1">
              ₹38,200
            </p>
            <p className="text-[11px] text-purple-700 font-medium">
              Saved via AI headcount scaling
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-info-light/40 border border-info/30">
            <div className="flex items-center justify-between text-info text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                <span>Carbon Footprint Offset</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-info mt-1">
              612 kg CO₂e
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              Landfill methane emission avoided
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-divider">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-content-secondary">Facility:</span>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="text-xs py-1 px-2.5 rounded-lg border border-divider bg-white text-content-primary font-medium focus:outline-none"
            >
              <option value="All">All Dining Halls (Campus-Wide)</option>
              <option value="Mess A">Block A (Boys Hostel Mess)</option>
              <option value="Mess B">Block B (PG Scholars Mess)</option>
              <option value="Mess C">Block C (Girls Hostel Mess)</option>
              <option value="Hospital">City General Hospital Canteen</option>
              <option value="IT Park">Apex IT Park Cafeteria</option>
            </select>

            <span className="text-xs font-bold text-content-secondary ml-2">Waste Stream:</span>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="text-xs py-1 px-2.5 rounded-lg border border-divider bg-white text-content-primary font-medium focus:outline-none"
            >
              <option value="All">All Streams Combined</option>
              <option value="Overproduction">Overproduction Buffer</option>
              <option value="Plate">Post-Dining Plate Scrap</option>
              <option value="Prep">Kitchen Preparation Trimmings</option>
            </select>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-divider text-xs">
            {['daily', 'weekly', 'monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded font-bold capitalize transition-all ${
                  period === p ? 'bg-white text-content-primary shadow-xs' : 'text-content-secondary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts Row: Actual Waste vs Target vs Prevented (7 cols) & Waste Stage Breakdown (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Waste vs Target Composed Chart */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-700" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Actual Food Waste vs. Target Allowance & Prevention
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Red: Measured waste kg | Green: Waste avoided | Dashed line: Campus ESG target ceiling
              </p>
            </div>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              Goal: &lt;400 kg/mo
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                  formatter={(val, name) => [
                    `${val} kg`,
                    name === 'actualWaste' ? 'Actual Waste' : name === 'prevented' ? 'Prevented / Rescued' : 'Target Ceiling'
                  ]}
                />
                <Bar dataKey="actualWaste" fill="#E11D48" radius={[4, 4, 0, 0]} name="actualWaste" />
                <Bar dataKey="prevented" fill="#059669" radius={[4, 4, 0, 0]} name="prevented" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs border-t border-divider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              <span className="text-content-secondary font-medium">Actual Waste (kg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-content-secondary font-medium">Prevented via AI (kg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-amber-500 rounded" />
              <span className="text-content-secondary font-medium">Target Ceiling</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Waste Stage Loss Distribution */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-content-primary">
                Waste Stage Breakdown
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Where food loss occurs along preparation & dining
              </p>
            </div>
            <PieIcon className="w-4 h-4 text-purple-700" />
          </div>

          <div className="space-y-3 pt-2">
            {wasteStages.map((ws) => (
              <div key={ws.stage} className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-content-primary">{ws.stage}</span>
                  <div className="text-right">
                    <span className="font-black text-sm" style={{ color: ws.color }}>{ws.kg} kg</span>
                    <span className="text-content-muted ml-1.5">({ws.percentage}%)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${ws.percentage}%`, backgroundColor: ws.color }}
                  />
                </div>

                <p className="text-[11px] text-content-secondary mt-0.5">{ws.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-900 block">AI Optimization Recommendation:</span>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              48% of waste is unserved overproduction. Syncing kitchen buffer cooking batches with real-time biometric turnstile check-ins will recover ~₹22,000 monthly.
            </p>
          </div>
        </div>

      </div>

      {/* Row 2: Dining Hall Benchmarks (7 cols) & Temporal Root Causes (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Dining Hall Benchmarks */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-brand" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Dining Hall Waste per Student Capita
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Benchmark metric: Grams of edible waste generated per plate served
              </p>
            </div>
            <span className="text-[11px] text-content-muted">Target: &lt;50g/plate</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityBenchmarks} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="facility" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={150} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val} g / plate`, 'Per Capita Waste']}
                />
                <Bar dataKey="wastePerCapita" radius={[0, 6, 6, 0]}>
                  {facilityBenchmarks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (5 cols): Temporal Drivers */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-divider">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-content-primary">
                Causal Spikes & Attendance Autopsy
              </h3>
            </div>
            <span className="text-[11px] text-content-muted">Impact Share</span>
          </div>

          <div className="space-y-2">
            {rootCauses.map((rc) => (
              <div
                key={rc.factor}
                className="p-3 rounded-xl border border-divider bg-slate-50 space-y-1 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-content-primary">{rc.factor}</span>
                  <span className="font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-[11px]">
                    {rc.impact}% of Spikes
                  </span>
                </div>
                <p className="text-[11px] text-content-secondary leading-relaxed">
                  {rc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Daily Waste Audit Ledger Table */}
      <div className="bg-surface rounded-card shadow-soft border border-divider overflow-hidden">
        <div className="p-4 md:p-5 border-b border-divider flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-700" />
            <h3 className="font-extrabold text-base text-content-primary">
              Recent Load Cell Audit Log Entries ({auditLogs.length})
            </h3>
          </div>
          <span className="text-xs text-content-muted">
            Automated tare-calibrated telemetry records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-divider text-content-secondary font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Facility</th>
                <th className="py-3 px-4">Stream</th>
                <th className="py-3 px-4">Food Items</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Cost Loss</th>
                <th className="py-3 px-4">Diversion Action</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-700">{log.id}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-semibold text-content-primary block">{log.date}</span>
                    <span className="text-[10px] text-content-muted">{log.time}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-content-primary">{log.facility}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.stream.includes('Buffer')
                        ? 'bg-rose-100 text-rose-800'
                        : log.stream.includes('Plate')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.stream}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-content-primary">{log.item}</td>
                  <td className="py-3 px-4 font-bold text-content-primary">{log.weightKg} kg</td>
                  <td className="py-3 px-4 font-bold text-rose-700">₹{log.costLoss}</td>
                  <td className="py-3 px-4 text-content-secondary">{log.divertedTo}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status.includes('Rescued')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: OFFICIAL CAMPUS ESG WASTE AUDIT REPORT */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-divider animate-scaleUp max-h-[92vh] overflow-y-auto">
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-divider print:hidden">
              <span className="font-bold text-sm text-purple-950 uppercase tracking-wide">
                Campus ESG Food Waste Compliance Audit Report
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Report
                </Button>
                <button
                  onClick={() => setAuditModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-content-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="py-6 space-y-6 text-slate-800 font-sans print:p-0">
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <h2 className="text-xl font-black uppercase text-slate-900">
                  Campus Sustainability Authority & Dining Services
                </h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                  Monthly Institutional Food Waste Audit Manifest (September 2026)
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Compliant with GHG Protocol Corporate Standard & UN Sustainable Development Goal 12.3
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Waste</span>
                  <span className="font-black text-sm text-rose-700">486 kg</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Prevented</span>
                  <span className="font-black text-sm text-emerald-700">520 kg</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">CO₂e Avoided</span>
                  <span className="font-black text-sm text-blue-700">612 kg</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Cost Preserved</span>
                  <span className="font-black text-sm text-purple-900">₹38,200</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                  Audited Dining Halls
                </span>
                <p className="text-slate-600 leading-relaxed">
                  The audit encompassed 5 institutional dining locations across North and South campus grounds including Block A Boys Mess, Block B PG Scholars Mess, Block C Girls Mess, and the Main Hospital Canteen.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 mt-4 border-t border-slate-300 text-center text-xs">
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-lg text-slate-800">
                    Dr. Anita Roy
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">
                    Campus Sustainability Director
                  </span>
                </div>
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-lg text-emerald-800">
                    Chef Raman K.
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">
                    Head of Institutional Dining
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider print:hidden">
              <Button variant="ghost" onClick={() => setAuditModalOpen(false)}>
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
