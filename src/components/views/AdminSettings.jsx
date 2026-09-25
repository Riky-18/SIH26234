import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  ShieldCheck,
  Building,
  Save,
  RotateCcw,
  CheckCircle2,
  Bell,
  Cpu,
  Globe,
  Users,
  Award,
  Sparkles,
  Lock,
  Mail,
  Zap,
  Check
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

export default function AdminSettings({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('institution'); // 'institution' | 'iot' | 'ai' | 'compliance'
  const [toastMessage, setToastMessage] = useState(null);

  const [institutionConfig, setInstitutionConfig] = useState({
    name: 'Bhagwan Parshuram Institute of Technology (BIT)',
    campusCode: 'BIT-NORTH-CAMPUS',
    deanName: 'Dr. K. S. Sundararajan',
    deanEmail: 'sustainability.dean@bit.ac.in',
    phone: '+91 94432 10991',
    address: 'Sathyamangalam – Bhavani Road, Erode Dist, Tamil Nadu 638401',
    diningHalls: '3 Facilities (Mess A, Mess B, PG Annex)',
    totalStudents: '3,850 Enrolled Diners',
    fssaiLicense: 'FSSAI-INST-10022041008819'
  });

  const [iotConfig, setIotConfig] = useState({
    autoSyncInterval: '15 seconds',
    loadCellThresholdKg: 0.15,
    tamperDetection: true,
    mqttBrokerUrl: 'mqtt://iot.foodloop-campus.org:1883',
    alertWebhook: 'https://hooks.slack.com/services/T00/B00/campus-waste-alerts',
    bufferOverflowAlarm: true
  });

  const [aiConfig, setAiConfig] = useState({
    examWeekReductionFactor: 28,
    weekendOutingDampener: 22,
    festivalSurplusThreshold: 35,
    autoApproveMenuUnderVariance: 5,
    predictiveWeatherFactor: true
  });

  const [complianceConfig, setComplianceConfig] = useState({
    autoGenerateEsgMonthly: true,
    sdgReportRecipients: 'dean@bit.ac.in, estate@bit.ac.in',
    fssaiAuditSchedule: 'Every Monday 09:00 AM',
    carbonFactorModel: 'IPCC AR6 Landfill Methane Avoidance (2.53 kg CO₂e / kg food)'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('✓ Institutional system configuration saved and synced across all campus nodes!');
  };

  const handleReset = () => {
    if (confirm('Reset institutional parameters to default campus values?')) {
      showToast('Settings reset to campus defaults.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-xl flex items-center gap-3 border border-slate-700 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-card bg-surface border border-divider shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Central Admin Console</span>
            <StatusPill text="Campus System Online" level="brand" size="sm" dot={true} />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-content-secondary">
              Version 2.4.1 (Enterprise)
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-content-primary mt-1">
            Institutional System Configuration
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Global IoT scale telemetry parameters, multi-facility mess management, AI sensitivity rules, and ESG reporting targets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            icon={RotateCcw}
            onClick={handleReset}
            className="text-xs font-bold"
          >
            Reset Defaults
          </Button>

          <Button
            variant="primary"
            icon={Save}
            onClick={handleSave}
            className="text-xs font-bold"
          >
            Save All Configurations
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-divider pb-2 overflow-x-auto">
        {[
          { id: 'institution', label: 'Campus Profile & Facilities', icon: Building },
          { id: 'iot', label: 'IoT Scale Telemetry & Webhooks', icon: Cpu },
          { id: 'ai', label: 'AI Mitigation Sensitivity', icon: Sparkles },
          { id: 'compliance', label: 'ESG & Statutory Governance', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand text-white shadow-soft-sm'
                  : 'bg-surface text-content-secondary hover:text-content-primary hover:bg-slate-100 border border-divider'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Campus Profile & Facilities */}
      {activeTab === 'institution' && (
        <form onSubmit={handleSave} className="bg-surface rounded-card p-6 shadow-soft border border-divider space-y-6">
          <SectionHeader
            icon={Building}
            title="Institutional Governance Profile"
            subtitle="Central administrative identity, statutory affiliations, and dining facilities under mandate"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Institution Legal Title
              </label>
              <input
                type="text"
                value={institutionConfig.name}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Campus Code / AISHE ID
              </label>
              <input
                type="text"
                value={institutionConfig.campusCode}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, campusCode: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Sustainability Officer / Dean
              </label>
              <input
                type="text"
                value={institutionConfig.deanName}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, deanName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Official Contact Email
              </label>
              <input
                type="email"
                value={institutionConfig.deanEmail}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, deanEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Campus Location Address (Tamil Nadu)
              </label>
              <input
                type="text"
                value={institutionConfig.address}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Connected Dining Facilities
              </label>
              <input
                type="text"
                value={institutionConfig.diningHalls}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, diningHalls: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Total Enrolled Boarders
              </label>
              <input
                type="text"
                value={institutionConfig.totalStudents}
                onChange={(e) => setInstitutionConfig({ ...institutionConfig, totalStudents: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-divider">
            <Button type="submit" variant="primary" icon={Save}>
              Save Campus Profile
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: IoT Scale Telemetry */}
      {activeTab === 'iot' && (
        <form onSubmit={handleSave} className="bg-surface rounded-card p-6 shadow-soft border border-divider space-y-6">
          <SectionHeader
            icon={Cpu}
            title="IoT Load Cell Scale Telemetry"
            subtitle="Central telemetry gateway, MQTT broker, and high-frequency real-time discard alerts"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Auto-Sync Interval
              </label>
              <select
                value={iotConfig.autoSyncInterval}
                onChange={(e) => setIotConfig({ ...iotConfig, autoSyncInterval: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none"
              >
                <option value="5 seconds">5 seconds (High Precision)</option>
                <option value="15 seconds">15 seconds (Standard Recommended)</option>
                <option value="30 seconds">30 seconds (Low Bandwidth)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Minimum Discard Trigger (kg)
              </label>
              <input
                type="number"
                step="0.05"
                value={iotConfig.loadCellThresholdKg}
                onChange={(e) => setIotConfig({ ...iotConfig, loadCellThresholdKg: parseFloat(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Campus MQTT Broker Endpoint
              </label>
              <input
                type="text"
                value={iotConfig.mqttBrokerUrl}
                onChange={(e) => setIotConfig({ ...iotConfig, mqttBrokerUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Automated Incident Alert Webhook (Slack / Discord / Teams)
              </label>
              <input
                type="text"
                value={iotConfig.alertWebhook}
                onChange={(e) => setIotConfig({ ...iotConfig, alertWebhook: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-divider">
            <Button type="submit" variant="primary" icon={Save}>
              Save IoT Telemetry Settings
            </Button>
          </div>
        </form>
      )}

      {/* Tab 3: AI Sensitivity */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSave} className="bg-surface rounded-card p-6 shadow-soft border border-divider space-y-6">
          <SectionHeader
            icon={Sparkles}
            title="Predictive AI Model Tuning"
            subtitle="Regulate procurement dampening multipliers for exam weeks, weekends, and regional festivals"
          />

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-divider">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-xs text-content-primary">Exam Week Buffer Reduction:</span>
                  <p className="text-[11px] text-content-secondary">Percentage to taper dinner headcount prediction during revision and exam periods</p>
                </div>
                <span className="font-black text-sm text-brand">{aiConfig.examWeekReductionFactor}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={aiConfig.examWeekReductionFactor}
                onChange={(e) => setAiConfig({ ...aiConfig, examWeekReductionFactor: parseInt(e.target.value) })}
                className="w-full accent-brand cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-divider">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-xs text-content-primary">Weekend Outing Dampener:</span>
                  <p className="text-[11px] text-content-secondary">Autonomous meal count adjustment based on historical Saturday/Sunday biometric checkouts</p>
                </div>
                <span className="font-black text-sm text-brand">{aiConfig.weekendOutingDampener}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={aiConfig.weekendOutingDampener}
                onChange={(e) => setAiConfig({ ...aiConfig, weekendOutingDampener: parseInt(e.target.value) })}
                className="w-full accent-brand cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-divider">
            <Button type="submit" variant="primary" icon={Save}>
              Save AI Rules
            </Button>
          </div>
        </form>
      )}

      {/* Tab 4: ESG & Governance */}
      {activeTab === 'compliance' && (
        <form onSubmit={handleSave} className="bg-surface rounded-card p-6 shadow-soft border border-divider space-y-6">
          <SectionHeader
            icon={ShieldCheck}
            title="ESG & Statutory Governance Automation"
            subtitle="Automated monthly report deliveries and IPCC Scope 3 conversion models"
          />

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Automated Monthly ESG Report Distribution List
              </label>
              <input
                type="text"
                value={complianceConfig.sdgReportRecipients}
                onChange={(e) => setComplianceConfig({ ...complianceConfig, sdgReportRecipients: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-content-secondary block mb-1">
                Carbon Multiplier Standard
              </label>
              <input
                type="text"
                readOnly
                value={complianceConfig.carbonFactorModel}
                className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-100 text-xs text-content-secondary font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-divider">
            <Button type="submit" variant="primary" icon={Save}>
              Save Governance Settings
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
