import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Utensils,
  Download,
  CheckCircle2,
  Filter,
  Trophy,
  AlertCircle,
  Calendar,
  Layers,
  Sparkles,
  PieChart as PieIcon,
  ChevronDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import DataTable from '../common/DataTable';

export default function AdminDashboard({ data }) {
  const [trendPeriod, setTrendPeriod] = useState('monthly'); // 'daily' | 'weekly' | 'monthly'
  const [selectedBlock, setSelectedBlock] = useState('All');
  const [downloadingEsg, setDownloadingEsg] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeTrendData = data.trends[trendPeriod] || data.trends.monthly;

  const handleDownloadReport = () => {
    setDownloadingEsg(true);
    setTimeout(() => {
      setDownloadingEsg(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  const partnerColumns = [
    {
      header: 'Redistribution Partner NGO',
      accessor: 'ngo',
      render: (val, row) => (
        <div>
          <span className="font-bold text-content-primary">{val}</span>
          <span className="block text-xs text-content-secondary">Contact: {row.contact}</span>
        </div>
      )
    },
    {
      header: 'Total Meals Delivered',
      accessor: 'meals',
      render: (val) => (
        <span className="font-extrabold text-brand text-sm">{val.toLocaleString()} meals</span>
      )
    },
    {
      header: 'Last Pickup Date',
      accessor: 'lastPickup',
      render: (val) => <span className="text-content-secondary text-xs">{val}</span>
    },
    {
      header: 'Reliability Score',
      accessor: 'rating',
      render: (val) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          {val}
        </span>
      )
    },
    {
      header: 'Network Status',
      accessor: 'status',
      render: (val) => (
        <StatusPill text={val} level="success" dot={true} size="sm" />
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* 7.1 Top Row — Overview Cards (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={TrendingUp}
          iconColor="brand"
          label="Total Waste Prevented"
          value={data.stats.wastePrevented}
          trend={data.stats.wastePreventedTrend}
          trendDirection="up"
          trendPositive={true}
          subtitle="Direct menu optimization"
        />

        <StatCard
          icon={DollarSign}
          iconColor="warning"
          label="Cost Saved"
          value={data.stats.costSaved}
          trend={data.stats.costSavedTrend}
          trendDirection="up"
          trendPositive={true}
          subtitle="Procurement cost reduction"
        />

        <StatCard
          icon={Leaf}
          iconColor="success"
          label="Carbon Saved"
          value={data.stats.carbonSaved}
          trend={data.stats.carbonSavedTrend}
          trendDirection="up"
          trendPositive={true}
          subtitle="GHG scope 3 diversion"
        />

        <StatCard
          icon={Utensils}
          iconColor="info"
          label="Meals Redistributed"
          value={data.stats.mealsRedistributed}
          trend={data.stats.mealsRedistributedTrend}
          trendDirection="up"
          trendPositive={true}
          subtitle="Diverted to 3 local NGOs"
        />
      </div>

      {/* 7.2 & 7.3 Row: Trend Analytics (8 cols) + Waste Autopsy (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 7.2 Section — Waste Trend Analytics (8 cols) */}
        <div className="lg:col-span-8 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
          <SectionHeader
            title="Institutional Waste Trend vs Prevention"
            subtitle="Comparing measured waste with AI-prevented waste trajectory"
            actions={
              <div className="flex items-center gap-2">
                {/* Period toggle chips */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-divider text-xs">
                  {['daily', 'weekly', 'monthly'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setTrendPeriod(p)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        trendPeriod === p
                          ? 'bg-white text-brand font-bold shadow-xs'
                          : 'text-content-secondary hover:text-content-primary'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Hostel Block selector */}
                <div className="relative">
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    className="text-xs py-1.5 pl-3 pr-8 rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 text-content-primary font-medium"
                  >
                    <option value="All">All Hostel Blocks</option>
                    <option value="Block A">Block A (Boys)</option>
                    <option value="Block B">Block B (PG)</option>
                    <option value="Block C">Block C (Girls)</option>
                  </select>
                </div>
              </div>
            }
          />

          {/* Recharts Area / Line Chart */}
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E9F0',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    fontSize: '12px',
                  }}
                  formatter={(val, name) => [
                    `${val} kg`,
                    name === 'waste' ? 'Actual Waste' : name === 'prevented' ? 'Prevented Waste' : 'Institutional Target'
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  formatter={(val) => (val === 'waste' ? 'Plate & Prep Waste' : val === 'prevented' ? 'AI Prevented Waste' : 'Target Threshold')}
                />
                <Line
                  type="monotone"
                  dataKey="waste"
                  stroke="#E56C6C"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#E56C6C' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="prevented"
                  stroke="#2E6F5E"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2E6F5E' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-divider flex flex-wrap items-center justify-between gap-2 text-xs text-content-secondary">
            <span>Overall institutional waste down <strong className="text-success font-semibold">21.6%</strong> since April baseline</span>
            <span className="font-medium text-brand">Current Target Compliance: 94.2%</span>
          </div>
        </div>

        {/* 7.3 Section — Waste Autopsy (Root Cause) (4 cols) */}
        <div className="lg:col-span-4 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60 flex flex-col justify-between">
          <div>
            <SectionHeader
              icon={PieIcon}
              title="Waste Autopsy"
              subtitle="Why waste happens (AI pattern attribution)"
            />

            {/* Donut Chart */}
            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5E9F0',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                  <Pie
                    data={data.wasteReasons}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.wasteReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-2xl font-black text-content-primary block">32%</span>
                <span className="text-[10px] uppercase font-bold text-danger">Exam Peak</span>
              </div>
            </div>

            {/* Legend breakdown list */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {data.wasteReasons.map((r, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-50 border border-divider/60 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="font-semibold text-content-primary">{r.name}</span>
                  </div>
                  <span className="text-xs font-bold text-content-secondary mt-0.5 block">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt required insight callout */}
          <div className="mt-4 p-3.5 rounded-xl bg-danger-light/50 border border-danger/30 text-xs text-danger-dark">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-danger block">Root Cause AI Recommendation:</span>
                <p className="text-content-primary mt-0.5 leading-relaxed">
                  "Waste spikes <strong>32% during exam week</strong> — consider reduced-portion planning and flexible breakfast timings to mitigate dinner rollovers."
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row: ESG Compliance & Reports + Hostel Block Gamification Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 7.5 Section — ESG / Compliance Card (6 cols) */}
        <div className="lg:col-span-6 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-divider">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">Compliance Ready</span>
                  <StatusPill text="SDG 12.3 Aligned" level="brand" size="sm" />
                </div>
                <h3 className="text-lg font-bold text-content-primary mt-1">
                  {data.esg.title}
                </h3>
                <p className="text-xs text-content-secondary mt-0.5">
                  Audit period: {data.esg.period} • {data.esg.accreditation}
                </p>
              </div>

              <Button
                variant="primary"
                icon={Download}
                onClick={handleDownloadReport}
                disabled={downloadingEsg}
                className="whitespace-nowrap"
              >
                {downloadingEsg ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            </div>

            {/* Download success banner */}
            {downloadSuccess && (
              <div className="mt-3 p-3 rounded-xl bg-success-light text-success border border-success/30 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Monthly ESG Report downloaded (FoodLoop_ESG_Audit_Sep2026.pdf)</span>
              </div>
            )}

            {/* Checklist from prompt: Waste data logged ✓ · Redistribution tracked ✓ · Carbon metrics calculated ✓ */}
            <div className="mt-4 space-y-2.5">
              <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider">
                Audited Verification Criteria
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.esg.checks.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-divider/70 flex items-center gap-2.5 text-xs font-medium text-content-primary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-divider flex items-center justify-between text-xs text-content-secondary">
            <span>Next auto-audit scheduled: <strong>1 Oct 2026</strong></span>
            <span className="font-semibold text-brand">Institutional Grade A+</span>
          </div>
        </div>

        {/* 7.6 Section — Leaderboard (gamification layer) (6 cols) */}
        <div className="lg:col-span-6 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
          <SectionHeader
            icon={Trophy}
            title="Hostel Block Waste Score"
            subtitle="Campus gamification ranking based on lowest per-capita plate waste"
            badge={<StatusPill text="Monthly Cup" level="warning" />}
          />

          <div className="space-y-4 mt-2">
            {data.leaderboard.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  idx === 0
                    ? 'bg-amber-50/50 border-amber-200 shadow-soft-sm'
                    : 'bg-slate-50/70 border-divider/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === 0
                          ? 'bg-amber-400 text-white'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-700'
                          : 'bg-amber-700/60 text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-content-primary">{item.block}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-divider text-content-secondary font-medium">
                      {item.wastePerCapita}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-content-secondary">{item.trend}</span>
                    <span className="text-base font-black text-brand">{item.score} / 100</span>
                  </div>
                </div>

                <ProgressBar
                  value={item.score}
                  max={100}
                  color={item.color}
                  size="md"
                />

                <div className="flex items-center justify-between text-[11px] text-content-secondary mt-2">
                  <span>{item.badge}</span>
                  <span>{100 - item.score} pts room for optimization</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7.4 Section — Redistribution Partners Network */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
        <SectionHeader
          title="Verified Redistribution Partners Network"
          subtitle="Direct shelter and community food bank redistribution channels"
        />

        <DataTable
          columns={partnerColumns}
          data={data.partners}
          keyField="id"
        />
      </div>
    </div>
  );
}
