import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Cpu,
  Wifi,
  Scale,
  Thermometer,
  Eye,
  Bell,
  Save,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  RefreshCw,
  Sparkles,
  Clock,
  Users,
  Utensils,
  Check,
  X,
  ArrowRight,
  Building
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

export default function KitchenSettings({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'iot-sensors' | 'ai-rules' | 'alerts'
  const [toastMessage, setToastMessage] = useState(null);

  // General Kitchen Profile State
  const [profile, setProfile] = useState({
    kitchenName: 'Mess Hall A — North Campus Dining',
    institution: 'Bhagwan Parshuram Institute of Technology (BIT)',
    headChef: 'Chef Raman',
    chefContact: '+91 98421 55601',
    fssaiLicense: 'FSSAI-LIC-10022041008819',
    enrolledStudents: 450,
    defaultBatchSize: 250,
    serviceTimes: {
      breakfast: '07:30 AM – 09:30 AM',
      lunch: '12:30 PM – 02:30 PM',
      snacks: '05:00 PM – 06:00 PM',
      dinner: '07:30 PM – 09:45 PM',
    }
  });

  // IoT Hardware & Sensor Calibration State
  const [sensors, setSensors] = useState({
    binA1Tare: 1.20,
    binA1Offset: 0.00,
    binA1Status: 'Online (Calibrated)',
    binA2Tare: 1.50,
    binA2Status: 'Online (Calibrated)',
    coolerThreshold: 4.0,
    coldRoomThreshold: 4.0,
    cvSensitivity: 60,
    cvIntervalMins: 15,
  });

  // AI Planner & Automation Rules State
  const [aiRules, setAiRules] = useState({
    autoPrioritizeExpiring: true,
    autoBroadcastSurplus: true,
    attendanceBufferPercent: 10,
    maxDailyWasteLimitKg: 15.0,
    surplusThresholdKg: 10.0,
    defaultDietary: 'North & South Blend',
    preferredNgoRadiusKm: 5,
  });

  // Alert Notifications State
  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    whatsappAlerts: true,
    wasteSpikeAlert: true,
    coldChainBreachAlert: true,
    fssaiExpiryWarning: true,
    alertPhone: '+91 98421 55601',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Tare / Zero Load Cell Bin
  const handleTareBin = (binId) => {
    setSensors((prev) => ({
      ...prev,
      [`${binId}Offset`]: 0.00,
    }));
    showToast(`✓ Smart Load Cell ${binId.toUpperCase()} successfully tared to 0.00 kg!`);
  };

  // Ping sensors
  const handlePingSensors = () => {
    showToast('📡 All 6 IoT telemetry sensors pinged — 100% signal strength & low packet latency.');
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e?.preventDefault();
    showToast('✓ Kitchen profile & sensor calibration parameters saved successfully!');
  };

  // Reset Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all sensor offsets and AI rules to default factory values?')) {
      setAiRules({
        autoPrioritizeExpiring: true,
        autoBroadcastSurplus: true,
        attendanceBufferPercent: 10,
        maxDailyWasteLimitKg: 15.0,
        surplusThresholdKg: 10.0,
        defaultDietary: 'North & South Blend',
        preferredNgoRadiusKm: 5,
      });
      showToast('Restored system defaults.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-content-primary text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-soft-lg border border-slate-700 animate-slideUp">
          <Sparkles className="w-4 h-4 text-brand-light" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Quick Controls */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand-light text-brand uppercase tracking-wider">
                Kitchen Module • Settings & IoT Calibration
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Hardware Connected: 2 Load Cells, 4 Probes, 1 CV Cam</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Kitchen Profile & Sensor Calibration
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Configure dining hall capacities, zero-waste AI operational thresholds, IoT load cell tare weights, and automated NGO surplus dispatch rules.
            </p>
          </div>

          {/* Quick Header Actions: Save & Return Home */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetDefaults}
            >
              Reset Defaults
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Save}
              onClick={handleSaveSettings}
            >
              Save Changes
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-divider pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Facility Profile & Timetable</span>
          </button>

          <button
            onClick={() => setActiveTab('iot-sensors')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'iot-sensors'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>IoT Sensors & Load Cell Tare</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-rules')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ai-rules'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>AI Zero-Waste Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'alerts'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts & SMS Notifications</span>
          </button>
        </div>
      </div>

      {/* TAB 1: GENERAL KITCHEN PROFILE & TIMETABLE */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-5">
            <SectionHeader
              icon={Building}
              title="Kitchen Facility & Staff Details"
              subtitle="Identity and registration records for regulatory and redistribution operations"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Kitchen / Mess Name
                </label>
                <input
                  type="text"
                  value={profile.kitchenName}
                  onChange={(e) => setProfile({ ...profile, kitchenName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Parent Academic / Institutional Authority
                </label>
                <input
                  type="text"
                  value={profile.institution}
                  onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Head Mess Chef / Designated Supervisor
                </label>
                <input
                  type="text"
                  value={profile.headChef}
                  onChange={(e) => setProfile({ ...profile, headChef: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Direct Contact Mobile (For Driver & Dispatch Coordination)
                </label>
                <input
                  type="text"
                  value={profile.chefContact}
                  onChange={(e) => setProfile({ ...profile, chefContact: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  FSSAI Food Safety License Number
                </label>
                <input
                  type="text"
                  value={profile.fssaiLicense}
                  onChange={(e) => setProfile({ ...profile, fssaiLicense: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 font-mono focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Enrolled Diners
                  </label>
                  <input
                    type="number"
                    value={profile.enrolledStudents}
                    onChange={(e) => setProfile({ ...profile, enrolledStudents: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Default Batch (Portions)
                  </label>
                  <input
                    type="number"
                    value={profile.defaultBatchSize}
                    onChange={(e) => setProfile({ ...profile, defaultBatchSize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Timetable */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
            <SectionHeader
              icon={Clock}
              title="Daily Dining Service Shift Timetable"
              subtitle="Controls automated telemetry window scheduling and NGO donation pickup windows"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1">
                <span className="font-bold text-content-primary">Breakfast Shift</span>
                <input
                  type="text"
                  value={profile.serviceTimes.breakfast}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      serviceTimes: { ...profile.serviceTimes, breakfast: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-divider bg-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1">
                <span className="font-bold text-content-primary">Lunch Shift (Peak)</span>
                <input
                  type="text"
                  value={profile.serviceTimes.lunch}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      serviceTimes: { ...profile.serviceTimes, lunch: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-divider bg-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1">
                <span className="font-bold text-content-primary">Evening Snacks</span>
                <input
                  type="text"
                  value={profile.serviceTimes.snacks}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      serviceTimes: { ...profile.serviceTimes, snacks: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-divider bg-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-divider space-y-1">
                <span className="font-bold text-content-primary">Dinner Shift</span>
                <input
                  type="text"
                  value={profile.serviceTimes.dinner}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      serviceTimes: { ...profile.serviceTimes, dinner: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-divider bg-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="primary" type="submit" icon={Save}>
                Save Profile Configuration
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: IOT SENSORS & LOAD CELL CALIBRATION */}
      {activeTab === 'iot-sensors' && (
        <div className="space-y-6">
          {/* Smart Load Cell Discard Bins */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <SectionHeader
                icon={Scale}
                title="Smart Load Cell Bins (Plate Waste Telemetry)"
                subtitle="Calibrate strain gauge zero offsets and tare weights to prevent sensor drift"
              />
              <Button
                variant="secondary"
                size="sm"
                icon={RefreshCw}
                onClick={handlePingSensors}
              >
                Ping Telemetry
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Bin A1 */}
              <div className="p-4 rounded-xl border border-divider bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-content-primary">
                      Bin #A1 — Plate Return Conveyor
                    </h4>
                    <p className="text-[11px] text-content-secondary mt-0.5">
                      Hardware Model: HX711 Load Cell • Sensitivity: ±10g
                    </p>
                  </div>
                  <StatusPill text="Online" level="success" size="sm" dot={true} />
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-white border border-divider">
                  <div>
                    <span className="text-content-muted block text-[10px]">Container Tare Weight</span>
                    <span className="font-bold text-content-primary">{sensors.binA1Tare} kg</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">Current Zero Offset</span>
                    <span className="font-bold text-brand">{sensors.binA1Offset.toFixed(2)} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-content-secondary">Battery: <strong>94% (Li-ion)</strong></span>
                  <Button
                    size="sm"
                    variant="primary"
                    icon={Scale}
                    onClick={() => handleTareBin('binA1')}
                  >
                    Tare / Zero Bin #A1
                  </Button>
                </div>
              </div>

              {/* Bin A2 */}
              <div className="p-4 rounded-xl border border-divider bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-content-primary">
                      Bin #A2 — Kitchen Prep & Trimmings
                    </h4>
                    <p className="text-[11px] text-content-secondary mt-0.5">
                      Hardware Model: HX711 Load Cell • Sensitivity: ±20g
                    </p>
                  </div>
                  <StatusPill text="Online" level="success" size="sm" dot={true} />
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-white border border-divider">
                  <div>
                    <span className="text-content-muted block text-[10px]">Container Tare Weight</span>
                    <span className="font-bold text-content-primary">{sensors.binA2Tare} kg</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">Current Zero Offset</span>
                    <span className="font-bold text-brand">0.00 kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-content-secondary">Battery: <strong>89% (Li-ion)</strong></span>
                  <Button
                    size="sm"
                    variant="primary"
                    icon={Scale}
                    onClick={() => handleTareBin('binA2')}
                  >
                    Tare / Zero Bin #A2
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cold Chain & Temperature Probes */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
            <SectionHeader
              icon={Thermometer}
              title="Cold Chain Temperature Telemetry Thresholds"
              subtitle="Thermal alert parameters for Walk-in Coolers and Cold Rooms"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-divider space-y-2">
                <span className="font-bold text-content-primary block">
                  Walk-in Cooler A (Veg)
                </span>
                <p className="text-content-secondary text-[11px]">
                  Alert if temperature exceeds:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={sensors.coolerThreshold}
                    onChange={(e) =>
                      setSensors({ ...sensors, coolerThreshold: parseFloat(e.target.value) })
                    }
                    className="w-20 px-2 py-1 rounded-lg border border-divider bg-white text-xs font-bold"
                  />
                  <span className="font-bold text-content-primary">°C</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-divider space-y-2">
                <span className="font-bold text-content-primary block">
                  Cold Room 2 (Dairy/Paneer)
                </span>
                <p className="text-content-secondary text-[11px]">
                  Alert if temperature exceeds:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={sensors.coldRoomThreshold}
                    onChange={(e) =>
                      setSensors({ ...sensors, coldRoomThreshold: parseFloat(e.target.value) })
                    }
                    className="w-20 px-2 py-1 rounded-lg border border-divider bg-white text-xs font-bold"
                  />
                  <span className="font-bold text-content-primary">°C</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-divider space-y-2">
                <span className="font-bold text-content-primary block">
                  Computer Vision Freshness Cam
                </span>
                <p className="text-content-secondary text-[11px]">
                  Scan interval frequency:
                </p>
                <div className="flex items-center gap-2">
                  <select
                    value={sensors.cvIntervalMins}
                    onChange={(e) =>
                      setSensors({ ...sensors, cvIntervalMins: parseInt(e.target.value) })
                    }
                    className="px-2 py-1 rounded-lg border border-divider bg-white text-xs font-medium"
                  >
                    <option value="5">Every 5 mins</option>
                    <option value="15">Every 15 mins</option>
                    <option value="30">Every 30 mins</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" icon={Save} onClick={handleSaveSettings}>
                Save Sensor Configurations
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI ZERO-WASTE RULES */}
      {activeTab === 'ai-rules' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-5">
          <SectionHeader
            icon={Sliders}
            title="AI Menu Optimization & Waste Prevention Rules"
            subtitle="Configures automatic decision-making thresholds for ChefMind AI and the redistribution engine"
          />

          <div className="space-y-4 text-xs divide-y divide-divider/70">
            {/* Rule 1: Auto-prioritize expiring items */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-content-primary text-sm block">
                  Automatic Expiring Inventory Depletion
                </span>
                <p className="text-content-secondary mt-0.5">
                  ChefMind AI automatically schedules recipe ingredients with ≤ 24 hours shelf-life as primary bases for today's menu.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={aiRules.autoPrioritizeExpiring}
                  onChange={(e) =>
                    setAiRules({ ...aiRules, autoPrioritizeExpiring: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
              </label>
            </div>

            {/* Rule 2: Auto-broadcast surplus */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-content-primary text-sm block">
                  Automatic Surplus Dispatch Drafting
                </span>
                <p className="text-content-secondary mt-0.5">
                  When preparation volume exceeds actual diner consumption by more than {aiRules.surplusThresholdKg} kg, automatically ping verified NGO shelters.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={aiRules.autoBroadcastSurplus}
                  onChange={(e) =>
                    setAiRules({ ...aiRules, autoBroadcastSurplus: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
              </label>
            </div>

            {/* Rule 3: Attendance Buffer */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-content-primary text-sm block">
                  Diner Turnout Buffer Margin ({aiRules.attendanceBufferPercent}%)
                </span>
                <p className="text-content-secondary mt-0.5">
                  Safety buffer calculated on top of predicted student turnout to prevent food shortfall during peak exams or events.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="5"
                  value={aiRules.attendanceBufferPercent}
                  onChange={(e) =>
                    setAiRules({ ...aiRules, attendanceBufferPercent: parseInt(e.target.value) })
                  }
                  className="accent-brand cursor-pointer"
                />
                <span className="font-bold text-brand w-12 text-right">
                  +{aiRules.attendanceBufferPercent}%
                </span>
              </div>
            </div>

            {/* Rule 4: Daily Waste Limit Alert Threshold */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-content-primary text-sm block">
                  Critical Daily Waste Limit ({aiRules.maxDailyWasteLimitKg} kg / day)
                </span>
                <p className="text-content-secondary mt-0.5">
                  Daily campus benchmark limit. Exceeding this triggers automated root-cause autopsy reports for institution administration.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="1"
                  value={aiRules.maxDailyWasteLimitKg}
                  onChange={(e) =>
                    setAiRules({ ...aiRules, maxDailyWasteLimitKg: parseFloat(e.target.value) })
                  }
                  className="w-20 px-2 py-1 rounded-lg border border-divider bg-slate-50 text-xs font-bold"
                />
                <span className="font-bold text-content-primary">kg</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <Button variant="primary" icon={Save} onClick={handleSaveSettings}>
              Save AI Automation Rules
            </Button>
          </div>
        </div>
      )}

      {/* TAB 4: ALERTS & SMS NOTIFICATIONS */}
      {activeTab === 'alerts' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-5">
          <SectionHeader
            icon={Bell}
            title="Real-Time Alerts & Notification Escalation"
            subtitle="Instant mobile SMS and WhatsApp telemetry dispatches for kitchen management"
          />

          <div className="space-y-4 text-xs divide-y divide-divider/70">
            <div>
              <label className="font-semibold text-content-secondary block mb-1">
                Notification Recipient Mobile Number
              </label>
              <input
                type="text"
                value={notifications.alertPhone}
                onChange={(e) =>
                  setNotifications({ ...notifications, alertPhone: e.target.value })
                }
                className="w-full max-w-sm px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-content-primary block">
                  WhatsApp Instant Dispatch Alerts
                </span>
                <p className="text-content-secondary mt-0.5">
                  Receive live driver ETA notifications and NGO pickup confirmation receipts via WhatsApp.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.whatsappAlerts}
                onChange={(e) =>
                  setNotifications({ ...notifications, whatsappAlerts: e.target.checked })
                }
                className="rounded text-brand w-4 h-4"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-content-primary block">
                  Cold-Chain Thermal Breach SMS
                </span>
                <p className="text-content-secondary mt-0.5">
                  High-priority SMS if Walk-in Cooler or Cold Room temperature exceeds threshold for &gt; 15 minutes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.coldChainBreachAlert}
                onChange={(e) =>
                  setNotifications({ ...notifications, coldChainBreachAlert: e.target.checked })
                }
                className="rounded text-brand w-4 h-4"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-content-primary block">
                  Daily Plate Waste Spike Warning
                </span>
                <p className="text-content-secondary mt-0.5">
                  Alert sent if plate discard during Lunch session spikes by &gt; 20% vs yesterday.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.wasteSpikeAlert}
                onChange={(e) =>
                  setNotifications({ ...notifications, wasteSpikeAlert: e.target.checked })
                }
                className="rounded text-brand w-4 h-4"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <Button variant="primary" icon={Save} onClick={handleSaveSettings}>
              Save Notification Preferences
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
