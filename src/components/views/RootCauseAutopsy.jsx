import React, { useState } from 'react';
import {
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Scale,
  DollarSign,
  Building,
  Info,
  Sliders,
  Check,
  X,
  FileText,
  Clock,
  Zap,
  Target
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

export default function RootCauseAutopsy({
  adminData,
  onNavigateHome,
  onNavigateToAnalytics
}) {
  const [selectedTimeline, setSelectedTimeline] = useState('examWeek'); // 'examWeek' | 'weekendOuting' | 'festival' | 'normal'
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // AI Prescription Simulator Toggles
  const [simTurnstile, setSimTurnstile] = useState(true); // -18% buffer
  const [simLadle, setSimLadle] = useState(true); // -31% plate waste
  const [simWeekendNotice, setSimWeekendNotice] = useState(false); // -22% weekend surplus

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Re-run AI Diagnostic Model Scan
  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showToast('🧠 AI Root Cause Model re-calibrated against 1,284 kg load cell telemetry!');
    }, 1200);
  };

  // Primary Root Cause Attribution Vector Breakdown
  const rootCauseVectors = [
    { cause: 'Buffer Over-Preparation', share: 38, kg: 488, color: '#E11D48', desc: 'Messes prepare standard large batches regardless of fluctuating dining attendance' },
    { cause: 'Attendance Forecasting Mismatch', share: 26, kg: 334, color: '#D97706', desc: 'Students dining out or ordering delivery during exams without mess notice' },
    { cause: 'Oversized Ladle Serving Portions', share: 19, kg: 244, color: '#7C3AED', desc: 'Fixed 180g serving ladles result in excessive unconsumed plate leftovers' },
    { cause: 'Ingredient Shelf-Life Expiry', share: 11, kg: 141, color: '#2563EB', desc: 'Cold storage FIFO mismanagement causing raw produce deterioration' },
    { cause: 'Kitchen Peeling & Prep Scrap', share: 6, kg: 77, color: '#059669', desc: 'Coarse peeling blades and unoptimized vegetable sorting losses' },
  ];

  // Academic Calendar Correlation vs Daily Food Waste Timeline
  const academicTimelineData = [
    { day: 'Day 1 (Mon)', wasteKg: 14, attendancePct: 98, note: 'Normal Classes' },
    { day: 'Day 2 (Tue)', wasteKg: 15, attendancePct: 96, note: 'Normal Classes' },
    { day: 'Day 3 (Wed)', wasteKg: 18, attendancePct: 92, note: 'Pre-Exam Revision' },
    { day: 'Day 4 (Thu)', wasteKg: 34, attendancePct: 68, note: 'Internal Mid-Terms (Exam Week Spike)' },
    { day: 'Day 5 (Fri)', wasteKg: 38, attendancePct: 62, note: 'Final Mid-Term Exam' },
    { day: 'Day 6 (Sat)', wasteKg: 42, attendancePct: 54, note: 'Weekend Exodus / Outings' },
    { day: 'Day 7 (Sun)', wasteKg: 28, attendancePct: 70, note: 'Sunday Hostel Return' },
  ];

  // Dish-Level Food Waste Autopsy (Which recipes get wasted most?)
  const dishAutopsyData = [
    { dish: 'Sona Masoori Steamed Rice', wastedKg: 142, lossValue: 7100, reason: 'Cooked in rigid 50 kg bulk boilers' },
    { dish: 'South Indian Sambar / Dal', wastedKg: 96, lossValue: 5760, reason: 'High buffer volume remaining in urns' },
    { dish: 'Hand-Rolled Wheat Chapatis', wastedKg: 84, lossValue: 6720, reason: 'Dries out & stiffens under hot-air warmers' },
    { dish: 'Cabbage & Beans Poriyal', wastedKg: 58, lossValue: 2900, reason: 'Plate discards by selective eaters' },
    { dish: 'Curd & Spiced Buttermilk', wastedKg: 44, lossValue: 2640, reason: 'Perishable cold item discarded after 3 hrs' },
  ];

  // Incident Investigation Log
  const incidentLogs = [
    {
      id: 'INC-4091',
      date: '21 Sep 2026',
      facility: 'Block A (Boys Hostel Mess)',
      trigger: 'Semester Mid-Term Exams',
      mechanism: '140 students studied in rooms; mess cooked full 450-portion batch',
      spikeKg: '+24 kg waste spike',
      culprit: 'Forecast Mismatch',
      prescription: 'Integrate RFID biometric gate check-in throttling'
    },
    {
      id: 'INC-4090',
      date: '17 Sep 2026',
      facility: 'Green Valley Catering',
      trigger: 'Symposium Banquet Dinner',
      mechanism: '30% over-catering buffer prepared for unregistered attendees',
      spikeKg: '+30 kg surplus',
      culprit: 'Buffer Overproduction',
      prescription: 'Broadcast immediate surplus alert via FoodLoop NGO radar'
    },
    {
      id: 'INC-4089',
      date: '14 Sep 2026',
      facility: 'Block B (PG Scholars Mess)',
      trigger: 'Weekend Outing Wave',
      mechanism: 'Scholars left for weekend trips without de-registering meal tokens',
      spikeKg: '+18 kg waste spike',
      culprit: 'Unregistered Absence',
      prescription: 'Mandate digital meal opt-out on student portal 4h in advance'
    },
  ];

  // Calculate simulated savings based on toggles
  let simulatedReductionPct = 0;
  let simulatedSavingsRupees = 0;
  if (simTurnstile) {
    simulatedReductionPct += 18;
    simulatedSavingsRupees += 25700;
  }
  if (simLadle) {
    simulatedReductionPct += 19;
    simulatedSavingsRupees += 27100;
  }
  if (simWeekendNotice) {
    simulatedReductionPct += 12;
    simulatedSavingsRupees += 17140;
  }

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Incident ID,Date,Facility,Trigger Event,Detected Failure Mechanism,Spike (kg),Root Cause Classification,Prescription\n';
    const rows = incidentLogs
      .map(
        (l) =>
          `"${l.id}","${l.date}","${l.facility}","${l.trigger}","${l.mechanism.replace(/"/g, '""')}","${l.spikeKg}","${l.culprit}","${l.prescription}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `foodloop_root_cause_autopsy_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Successfully exported Root Cause Autopsy CSV!');
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <PieIcon className="w-3.5 h-3.5 text-purple-600" />
                AI Diagnostic Engine • Root Cause Autopsy
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Correlation Model: 89.4% Predictive Confidence</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              AI Root Cause Waste Autopsy & Causal Diagnostics
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Machine learning diagnostic model correlating biometric turnstile attendance, academic calendar schedules, recipe portion ladles, and buffer overproduction spikes.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={handleRunScan}
              disabled={isScanning}
            >
              {isScanning ? 'Re-analyzing Model...' : 'Run Diagnostic Scan'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={() => setAuditModalOpen(true)}
              className="bg-purple-700 hover:bg-purple-800 text-white border-purple-700 shadow-sm"
            >
              Print Autopsy Report
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
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
            <div className="flex items-center justify-between text-rose-900 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Primary Waste Culprit</span>
              </span>
            </div>
            <p className="text-lg md:text-xl font-black text-rose-800 mt-1">
              Buffer Overproduction
            </p>
            <p className="text-[11px] text-rose-600 font-semibold">
              38% of all dining hall losses
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex items-center justify-between text-purple-900 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Predictive Confidence</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-purple-900 mt-1">
              89.4%
            </p>
            <p className="text-[11px] text-purple-700 font-medium">
              Correlated with student exams
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-900 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Semester Leakage</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-emerald-700 mt-1">
              ₹1,42,800
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Recoverable via auto-throttling
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand" />
                <span>Highest Risk Window</span>
              </span>
            </div>
            <p className="text-lg md:text-xl font-black text-content-primary mt-1">
              Wed Dinner & Sun Lunch
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              Unannounced student outings
            </p>
          </div>
        </div>
      </div>

      {/* Main Diagnostics Grid: Root Cause Vectors (5 cols) & Academic Timeline Spike Chart (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Root Cause Attribution Matrix */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-content-primary">
                Root Cause Attribution Matrix
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                AI factor weighting behind 1,284 kg of logged food discards
              </p>
            </div>
            <PieIcon className="w-4 h-4 text-purple-700" />
          </div>

          <div className="space-y-3 pt-1">
            {rootCauseVectors.map((rc) => (
              <div key={rc.cause} className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-content-primary">{rc.cause}</span>
                  <div className="text-right">
                    <span className="font-black text-sm" style={{ color: rc.color }}>{rc.share}%</span>
                    <span className="text-content-muted ml-1.5">({rc.kg} kg)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${rc.share}%`, backgroundColor: rc.color }}
                  />
                </div>

                <p className="text-[11px] text-content-secondary leading-relaxed">{rc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7 cols): Academic Calendar vs Daily Waste Spike Line Chart */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-700" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Attendance vs. Waste Spike Correlation
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Red Line: Daily waste kg (Spikes during exam week & weekend exodus) | Blue: Student attendance %
              </p>
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
              Exam Week Spike: +180%
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={academicTimelineData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWasteSpike" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}
                  formatter={(val, name, props) => [
                    `${val} kg waste (${props.payload.attendancePct}% attendance)`,
                    props.payload.note
                  ]}
                />
                <Area type="monotone" dataKey="wasteKg" stroke="#E11D48" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWasteSpike)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Causal Insight:</strong> Attendance drops from 98% to 62% on Mid-Term Thursday/Friday as students skip mess to study, creating 38 kg of edible overproduction.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Dish-Level Waste Autopsy (7 cols) & AI Prescription Simulator (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Dish-Level Autopsy BarChart */}
        <div className="lg:col-span-7 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-brand" />
                <h3 className="font-extrabold text-base text-content-primary">
                  Specific Dish Waste Autopsy
                </h3>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Top food preparations contributing to volume discard and budget loss
              </p>
            </div>
            <span className="text-[11px] text-content-muted">Ranked by Volume</span>
          </div>

          <div className="h-60 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dishAutopsyData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="dish" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={160} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px'
                  }}
                  formatter={(val, name, props) => [`${val} kg (₹${props.payload.lossValue})`, 'Wasted Volume']}
                />
                <Bar dataKey="wastedKg" fill="#E11D48" radius={[0, 6, 6, 0]}>
                  {dishAutopsyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#E11D48' : index === 1 ? '#D97706' : '#2563EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (5 cols): Interactive AI Prescription Simulator */}
        <div className="lg:col-span-5 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-purple-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-divider">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-700" />
              <h3 className="font-extrabold text-base text-content-primary">
                AI Prescription Simulator
              </h3>
            </div>
            <span className="text-[10px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
              Interactive
            </span>
          </div>

          <p className="text-xs text-content-secondary">
            Toggle automated AI policy adjustments to model projected waste cuts:
          </p>

          <div className="space-y-2.5 text-xs">
            {/* Toggle 1 */}
            <div
              onClick={() => setSimTurnstile(!simTurnstile)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                simTurnstile ? 'border-purple-600 bg-purple-50/70 shadow-xs' : 'border-divider bg-slate-50 opacity-70'
              }`}
            >
              <div>
                <span className="font-bold text-content-primary block">1. Dynamic RFID Gate Throttling</span>
                <span className="text-[11px] text-content-secondary">Downscales rice batch preparation during low turnstile attendance</span>
              </div>
              <span className={`font-black text-xs px-2 py-1 rounded ml-2 shrink-0 ${
                simTurnstile ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                -18% Waste
              </span>
            </div>

            {/* Toggle 2 */}
            <div
              onClick={() => setSimLadle(!simLadle)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                simLadle ? 'border-purple-600 bg-purple-50/70 shadow-xs' : 'border-divider bg-slate-50 opacity-70'
              }`}
            >
              <div>
                <span className="font-bold text-content-primary block">2. Standard Ladle: 180g → 140g</span>
                <span className="text-[11px] text-content-secondary">Reduces plate leftovers with unlimited secondary top-ups</span>
              </div>
              <span className={`font-black text-xs px-2 py-1 rounded ml-2 shrink-0 ${
                simLadle ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                -19% Waste
              </span>
            </div>

            {/* Toggle 3 */}
            <div
              onClick={() => setSimWeekendNotice(!simWeekendNotice)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                simWeekendNotice ? 'border-purple-600 bg-purple-50/70 shadow-xs' : 'border-divider bg-slate-50 opacity-70'
              }`}
            >
              <div>
                <span className="font-bold text-content-primary block">3. Digital Weekend Meal Opt-Out</span>
                <span className="text-[11px] text-content-secondary">Students flag weekend departures 4h ahead on app</span>
              </div>
              <span className={`font-black text-xs px-2 py-1 rounded ml-2 shrink-0 ${
                simWeekendNotice ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                -12% Waste
              </span>
            </div>
          </div>

          {/* Simulated Impact Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white space-y-1 shadow-md">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">
              Simulated Semester Impact
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">-{simulatedReductionPct}% Food Waste</span>
              <span className="text-base font-bold text-emerald-300">+₹{simulatedSavingsRupees.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Incident Investigation Deep-Dive Log */}
      <div className="bg-surface rounded-card shadow-soft border border-divider overflow-hidden">
        <div className="p-4 md:p-5 border-b border-divider flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-700" />
            <h3 className="font-extrabold text-base text-content-primary">
              AI Incident Investigation & Autopsy Log
            </h3>
          </div>
          <Button variant="secondary" size="sm" icon={Download} onClick={handleExportCSV}>
            Export Audit Log
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-divider text-content-secondary font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Dining Facility</th>
                <th className="py-3 px-4">Trigger Event</th>
                <th className="py-3 px-4">Detected Failure Mechanism</th>
                <th className="py-3 px-4">Measured Spike</th>
                <th className="py-3 px-4">Root Cause</th>
                <th className="py-3 px-4">AI Corrective Prescription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {incidentLogs.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-700">{inc.id}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-content-primary">{inc.date}</td>
                  <td className="py-3 px-4 font-bold text-content-primary">{inc.facility}</td>
                  <td className="py-3 px-4 font-semibold text-rose-700">{inc.trigger}</td>
                  <td className="py-3 px-4 text-content-secondary max-w-xs">{inc.mechanism}</td>
                  <td className="py-3 px-4 font-black text-rose-700 whitespace-nowrap">{inc.spikeKg}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800 text-[10px]">
                      {inc.culprit}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-emerald-800">{inc.prescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: OFFICIAL CAMPUS ROOT CAUSE AUTOPSY REPORT */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-divider animate-scaleUp max-h-[92vh] overflow-y-auto">
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-divider print:hidden">
              <span className="font-bold text-sm text-purple-950 uppercase tracking-wide">
                Campus AI Food Waste Root Cause Autopsy Audit
              </span>
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" icon={Printer} onClick={() => window.print()}>
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
                  Institutional Dining Services & FoodLoop AI Engine
                </h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                  Semester Root Cause Diagnostic Audit & Corrective Action Manifest
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Generated via Multi-Point Load Cell Telemetry & Turnstile Biometric Data Correlation
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Primary Culprit</span>
                  <span className="font-black text-sm text-rose-700">Buffer Excess (38%)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Correlation Confidence</span>
                  <span className="font-black text-sm text-purple-900">89.4% AI Score</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Top Wasted Dish</span>
                  <span className="font-black text-sm text-slate-900">Steamed Rice (142 kg)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Recovery Potential</span>
                  <span className="font-black text-sm text-emerald-700">₹1,42,800</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                  Mandated Corrective Action Protocol
                </span>
                <p className="text-slate-600 leading-relaxed">
                  1. Implement turnstile RFID gate sync with kitchen cook-lines by October 2026.<br />
                  2. Downscale standard bulk rice preparation boilers during internal exam intervals.<br />
                  3. Standardize serving ladle portion sizes from 180g to 140g across all mess lines.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 mt-4 border-t border-slate-300 text-center text-xs">
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-lg text-slate-800">
                    Dr. Anita Roy
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">
                    Chief Sustainability Officer
                  </span>
                </div>
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-lg text-emerald-800">
                    Chef Raman K.
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">
                    Head Chef & Mess Superintendent
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
