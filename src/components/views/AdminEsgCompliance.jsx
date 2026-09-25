import React, { useState } from 'react';
import {
  ShieldCheck,
  Leaf,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  DollarSign,
  TrendingUp,
  Scale,
  Sparkles,
  ExternalLink,
  Info,
  Clock,
  Building,
  Check
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

export default function AdminEsgCompliance({ adminData, onNavigateHome }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const complianceStandards = [
    {
      code: 'UN SDG 12.3',
      name: 'Responsible Consumption & Production',
      target: 'Halve per-capita food waste by 2030',
      status: 'Target Met (21.6% reduction achieved)',
      level: 'success'
    },
    {
      code: 'GHG Protocol Scope 3',
      name: 'Category 5: Waste Generated in Operations',
      target: 'Zero organic waste to unmanaged landfills',
      status: 'Audited & Certified (7.42 t CO₂e saved)',
      level: 'success'
    },
    {
      code: 'FSSAI Suraksha',
      name: 'Safe Food Share & Hygiene Schedule IV',
      target: '100% temperature-controlled custody logs',
      status: '100% Compliant (Clean Delivery Chain)',
      level: 'brand'
    },
    {
      code: 'NAAC Criteria 7.1',
      name: 'Institutional Values & Social Responsibilities',
      target: 'Verifiable green campus circular practices',
      status: 'Grade A+ Documentation Ready',
      level: 'success'
    }
  ];

  const auditCriteria = [
    {
      title: 'IoT Load Cell Waste Discard Ledger',
      description: 'Continuous digital scale logging of kitchen preparation and dining plate waste with tamper-proof timestamps.',
      verifiedBy: 'FoodLoop Automated Node v2.4',
      date: 'Logged Daily',
      status: 'Verified'
    },
    {
      title: 'Redistribution Chain of Custody & Temp Control',
      description: 'End-to-end QR code handshake and temperature verification between kitchen dispatch and authorized NGO.',
      verifiedBy: 'FSSAI Section 31 Digital Seal',
      date: 'Verified Real-time',
      status: 'Verified'
    },
    {
      title: 'Scope 3 Avoided Emissions Attribution',
      description: 'Standardized WRI emission factors calculated per kg of organic food saved from methane-producing anaerobic landfill degradation.',
      verifiedBy: 'IPCC AR6 Environmental Multipliers',
      date: 'Audited Sep 2026',
      status: 'Verified'
    },
    {
      title: 'Student Body Food Literacy & Gamification',
      description: 'Hostel block per-capita ranking and portion awareness programs active across all dining facilities.',
      verifiedBy: 'Campus Sustainability Committee',
      date: 'Active Weekly',
      status: 'Verified'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-card bg-surface border border-divider shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Institutional ESG & Sustainability</span>
            <StatusPill text="Audit Period: Sep 2026" level="brand" size="sm" />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Grade A+ Certified
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-content-primary mt-1">
            ESG & Statutory Compliance Audit
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Audited green campus metrics, GHG Protocol Scope 3 food diversion records, and UN SDG 12.3 compliance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            icon={Printer}
            onClick={handlePrint}
            className="text-xs font-bold"
          >
            Print Audit Sheet
          </Button>

          <Button
            variant="primary"
            icon={Download}
            onClick={handleDownload}
            disabled={downloading}
            className="text-xs font-bold"
          >
            {downloading ? 'Compiling PDF...' : 'Download ESG Audit (PDF)'}
          </Button>
        </div>
      </div>

      {/* Download Alert */}
      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fade-in shadow-soft-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Official Institutional ESG Sustainability Audit Certificate (Sep 2026) exported successfully!</span>
          </div>
          <button
            onClick={() => setDownloadSuccess(false)}
            className="text-emerald-700 hover:text-emerald-950 font-black text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top 4 Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={Leaf}
          iconColor="success"
          label="Total GHG Avoidance"
          value="7.42 t CO₂e"
          trend="+18% vs last month"
          trendDirection="up"
          trendPositive={true}
          subtitle="Landfill methane diversion"
        />

        <StatCard
          icon={Scale}
          iconColor="brand"
          label="Surplus Food Diverted"
          value="5,880 kg"
          trend="+22% vs baseline"
          trendDirection="up"
          trendPositive={true}
          subtitle="Total meals: 14,700"
        />

        <StatCard
          icon={TrendingUp}
          iconColor="warning"
          label="Freshwater Footprint Saved"
          value="1.82M Liters"
          trend="Agricultural life-cycle saved"
          trendDirection="up"
          trendPositive={true}
          subtitle="Irrigation & processing water"
        />

        <StatCard
          icon={DollarSign}
          iconColor="info"
          label="Net Procurement Recovery"
          value="₹4,62,400"
          trend="Saved over current academic year"
          trendDirection="up"
          trendPositive={true}
          subtitle="Reduced inventory losses"
        />
      </div>

      {/* Two Column Layout: Standards Matrix + Verification Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Standards Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider flex flex-col justify-between">
          <div>
            <SectionHeader
              icon={Award}
              title="Statutory Alignment & Accreditation"
              subtitle="Audited framework benchmarks for institutional ESG reporting"
            />

            <div className="space-y-3 mt-4">
              {complianceStandards.map((std, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-divider/70 hover:border-brand/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-brand tracking-wide">
                      {std.code}
                    </span>
                    <StatusPill text={std.status} level={std.level} size="sm" />
                  </div>
                  <h4 className="text-sm font-bold text-content-primary">
                    {std.name}
                  </h4>
                  <p className="text-xs text-content-secondary mt-1">
                    Standard Target: {std.target}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-divider flex items-center justify-between text-xs text-content-secondary">
            <span>External Auditor: <strong>TUV Rheinland / Green Campus Cell</strong></span>
            <span className="font-semibold text-emerald-600">Status: Fully Verified</span>
          </div>
        </div>

        {/* Right Column: Audited Verification Criteria (6 cols) */}
        <div className="lg:col-span-6 bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider flex flex-col justify-between">
          <div>
            <SectionHeader
              icon={ShieldCheck}
              title="Audited Verification Criteria"
              subtitle="Four pillars of immutable evidentiary compliance"
            />

            <div className="space-y-3 mt-4">
              {auditCriteria.map((crit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-divider/70 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-content-primary">{crit.title}</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {crit.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-content-secondary mt-1 leading-relaxed">
                      {crit.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-content-muted mt-2 pt-2 border-t border-divider/40">
                      <span>Authority: {crit.verifiedBy}</span>
                      <span>Frequency: {crit.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-divider flex items-center justify-between text-xs">
            <span className="text-content-secondary">Next scheduled renewal: <strong>15 Oct 2026</strong></span>
            <Button
              variant="secondary"
              size="sm"
              icon={FileText}
              onClick={() => setCertModalOpen(true)}
              className="text-xs"
            >
              View Certificate Preview
            </Button>
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-card p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-divider relative animate-scale-up">
            <div className="border-4 border-double border-brand/30 p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">Institutional Certificate of ESG Excellence</span>
              <h2 className="text-2xl font-black text-content-primary mt-1">
                Zero Organic Food Waste Campus
              </h2>
              <p className="text-xs text-content-secondary mt-1">
                Conferred under UN SDG 12.3 & Ministry of Education Green Institutional Framework
              </p>

              <div className="my-6 py-4 px-6 rounded-xl bg-white border border-divider shadow-xs text-left grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-content-muted block">Awardee Institution:</span>
                  <strong className="text-content-primary text-sm">Bhagwan Parshuram Institute of Tech (BIT)</strong>
                </div>
                <div>
                  <span className="text-content-muted block">Campus Scope:</span>
                  <strong className="text-content-primary text-sm">Dining Halls A, B & Central Mess</strong>
                </div>
                <div>
                  <span className="text-content-muted block">Carbon Diverted (YTD):</span>
                  <strong className="text-emerald-600 text-sm font-black">7.42 Tons CO₂ Equivalent</strong>
                </div>
                <div>
                  <span className="text-content-muted block">Verification Authority:</span>
                  <strong className="text-brand text-sm font-semibold">FoodLoop AI ESG Ledger</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-content-muted pt-4 border-t border-divider">
                <span className="font-mono text-[10px]">CERT ID: FL-ESG-2026-09-BIT-01</span>
                <span>Authorized Digital Signature ✓</span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-5">
              <Button variant="secondary" size="sm" onClick={() => setCertModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
                Print Certificate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
