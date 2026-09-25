import React, { useState } from 'react';
import {
  Settings,
  Truck,
  ShieldCheck,
  Building,
  Save,
  RotateCcw,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Thermometer,
  Check
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

export default function NgoSettings({ onNavigateHome }) {
  const [toastMessage, setToastMessage] = useState(null);

  const [ngoProfile, setNgoProfile] = useState({
    name: 'Feeding Hope Foundation',
    darpanId: 'TN/2019/0219481',
    fssaiLicense: 'FSSAI-TN-11221004000312',
    headCoordinator: 'Karthik S.',
    phone: '+91 98421 90877',
    email: 'coordinator@feedinghope.org',
    baseAddress: '14, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu 641012',
    dispatchRadiusKm: 30,
    activeVans: 3,
    coldStorageCapacityKg: 450
  });

  const [fleetList, setFleetList] = useState([
    {
      id: 1,
      plate: 'KA-05-MN-2201',
      type: 'Transit Van (Insulated)',
      driver: 'Karthik S.',
      phone: '+91 98421 55601',
      capacity: '200 kg',
      status: 'Active / On-Duty'
    },
    {
      id: 2,
      plate: 'TN-38-BZ-4419',
      type: 'Electric Eco-Loader',
      driver: 'Murugan P.',
      phone: '+91 94432 11045',
      capacity: '120 kg',
      status: 'Standby / Ready'
    },
    {
      id: 3,
      plate: 'TN-33-AX-8910',
      type: 'Thermal Delivery Van',
      driver: 'Suresh Kumar',
      phone: '+91 97890 23411',
      capacity: '250 kg',
      status: 'Scheduled for 6 PM Pickup'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('✓ NGO organization profile & fleet registry updated successfully!');
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
            <span className="text-xs font-bold uppercase tracking-wider text-info">NGO Relief Coordinator</span>
            <StatusPill text="FSSAI Verified Agency" level="info" size="sm" dot={true} />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-content-secondary">
              Tamil Nadu State Chapter
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-content-primary mt-1">
            NGO Profile & Fleet Registry
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Manage authorized redistribution vehicles, cold-chain capacity, driver contact assignments, and statutory credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            icon={Save}
            onClick={handleSave}
            className="text-xs font-bold"
          >
            Save Registry Changes
          </Button>
        </div>
      </div>

      {/* Form: NGO Details */}
      <form onSubmit={handleSave} className="bg-surface rounded-card p-6 shadow-soft border border-divider space-y-6">
        <SectionHeader
          icon={Building}
          title="Organization Registration Details"
          subtitle="Statutory identity recognized under the Food Safety & Standards Act"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-content-secondary block mb-1">
              NGO / Foundation Registered Name
            </label>
            <input
              type="text"
              value={ngoProfile.name}
              onChange={(e) => setNgoProfile({ ...ngoProfile, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-content-secondary block mb-1">
              NITI Aayog NGO Darpan ID
            </label>
            <input
              type="text"
              value={ngoProfile.darpanId}
              onChange={(e) => setNgoProfile({ ...ngoProfile, darpanId: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-content-secondary block mb-1">
              FSSAI Food Donation License No.
            </label>
            <input
              type="text"
              value={ngoProfile.fssaiLicense}
              onChange={(e) => setNgoProfile({ ...ngoProfile, fssaiLicense: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-content-secondary block mb-1">
              Lead Coordinator Phone / WhatsApp
            </label>
            <input
              type="text"
              value={ngoProfile.phone}
              onChange={(e) => setNgoProfile({ ...ngoProfile, phone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-content-secondary block mb-1">
              Base Logistics Hub Address (Tamil Nadu)
            </label>
            <input
              type="text"
              value={ngoProfile.baseAddress}
              onChange={(e) => setNgoProfile({ ...ngoProfile, baseAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs text-content-primary font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
        </div>

        {/* Fleet Vehicles Table */}
        <div className="pt-4 border-t border-divider">
          <SectionHeader
            icon={Truck}
            title="Assigned Fleet & Thermal Vehicles"
            subtitle="Real-time vehicles equipped with insulated boxes and rapid GPS tracking"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {fleetList.map((veh) => (
              <div
                key={veh.id}
                className="p-4 rounded-xl bg-slate-50 border border-divider hover:border-info/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-divider text-content-primary">
                      {veh.plate}
                    </span>
                    <StatusPill text={veh.status} level="info" size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-content-primary">{veh.type}</h4>
                  <p className="text-[11px] text-content-secondary mt-1">Driver: {veh.driver} • {veh.phone}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-divider/60 flex items-center justify-between text-[11px]">
                  <span className="text-content-muted">Max Load:</span>
                  <span className="font-bold text-info">{veh.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-divider">
          <Button type="submit" variant="primary" icon={Save}>
            Save Organization Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
