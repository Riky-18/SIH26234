import React, { useState } from 'react';
import {
  Share2,
  Truck,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Printer,
  Sparkles,
  RefreshCw,
  Users,
  QrCode,
  Calendar,
  Leaf,
  Scale,
  Utensils,
  X,
  ChevronRight,
  Info,
  Check,
  Zap,
  Building,
  Thermometer
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function RedistributionHub({
  redistributionData,
  onNavigateHome,
  onNavigateToNgo,
  onUpdateDispatches
}) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('live-dispatches'); // 'live-dispatches' | 'partner-ngos' | 'compliance-logs'

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  // Staged surplus ready for dispatch
  const [readySurplus, setReadySurplus] = useState({
    item: 'Cooked Steamed Rice & Dal Tadka',
    qty: '18 kg',
    portions: '~45 meals',
    readyTime: '1:45 PM',
    safeUntil: '6:30 PM (4 hrs remaining)',
    tempLogged: '68.5°C (HACCP Compliant Hot-Hold)',
    packaging: '3x Insulated Food-Grade Thermal Containers',
    status: 'Ready for Dispatch',
  });

  // Active & recent dispatches
  const initialDispatches = [
    {
      id: 'd-101',
      ngo: 'Helping Hands Shelter',
      qty: '18 kg (~45 meals)',
      items: 'Cooked Steamed Rice & Dal Tadka',
      status: 'Driver En Route',
      time: 'Pickup by 6:00 PM',
      eta: '12 mins',
      vehicle: 'Transit Van #TN-38-4021',
      driverName: 'Karthik S.',
      driverPhone: '+91 98421 88310',
      destination: 'North Zone Shelter, Hope Enclave',
      distance: '2.4 km away',
      tempCheck: '68.2°C (Logged)',
      otpCode: '4829',
      haccpVerified: true,
      timestamp: 'Today, 2:15 PM',
    },
    {
      id: 'd-102',
      ngo: 'Annapoorna Trust',
      qty: '12 kg (~30 meals)',
      items: 'Mix Veg Sambar & Phulkas (60 pcs)',
      status: 'Delivered',
      time: 'Delivered at 1:45 PM',
      eta: 'Completed',
      vehicle: 'Eco-Rikshaw #2',
      driverName: 'Ramesh K.',
      driverPhone: '+91 94432 10982',
      destination: 'Rainbow Senior Care Center',
      distance: '3.1 km away',
      tempCheck: '65.0°C (Verified)',
      otpCode: '7104',
      haccpVerified: true,
      timestamp: 'Today, 1:10 PM',
    },
    {
      id: 'd-103',
      ngo: 'Green Earth Community Kitchen',
      qty: '24 kg (~60 meals)',
      items: 'Vegetable Khichdi & Curd Packets',
      status: 'Delivered',
      time: 'Delivered yesterday, 7:30 PM',
      eta: 'Completed',
      vehicle: 'Cargo Van #KA-05-MN-2201',
      driverName: 'Suresh Babu',
      driverPhone: '+91 99941 87654',
      destination: 'Slum Children Evening Center',
      distance: '4.2 km away',
      tempCheck: '71.0°C (Verified)',
      otpCode: '9312',
      haccpVerified: true,
      timestamp: '24 Sep, 7:15 PM',
    }
  ];

  const [dispatches, setDispatches] = useState(initialDispatches);

  // Partner NGOs Directory
  const partnerNgos = [
    {
      id: 'ngo-1',
      name: 'Helping Hands Shelter',
      focus: 'Night Shelters & Urban Homeless',
      distance: '1.8 km',
      avgResponse: '14 mins',
      fleet: '2 Insulated Vans',
      contactPerson: 'Anita Roy (Coordinator)',
      phone: '+91 98421 88310',
      fssaiReg: 'FSSAI-LIC-10022041000912',
      mealsReceived: '1,420 Meals',
      rating: '4.9 ★',
      status: 'Available for Immediate Pickup',
    },
    {
      id: 'ngo-2',
      name: 'Annapoorna Trust',
      focus: 'Senior Citizens & Child Welfare',
      distance: '2.5 km',
      avgResponse: '18 mins',
      fleet: '3 Eco Electric Rikshaws',
      contactPerson: 'Dr. Ramesh Kumar',
      phone: '+91 94432 10982',
      fssaiReg: 'FSSAI-LIC-10021038000456',
      mealsReceived: '980 Meals',
      rating: '4.8 ★',
      status: 'Available for Immediate Pickup',
    },
    {
      id: 'ngo-3',
      name: 'Green Earth Community Kitchen',
      focus: 'Displaced Communities & Daily Wage Feed',
      distance: '4.1 km',
      avgResponse: '22 mins',
      fleet: '2 Cold-Chain Vans',
      contactPerson: 'Revathi Murugan',
      phone: '+91 99941 87654',
      fssaiReg: 'FSSAI-LIC-10020033000881',
      mealsReceived: '740 Meals',
      rating: '4.7 ★',
      status: 'On Standby',
    },
    {
      id: 'ngo-4',
      name: 'City Youth Rescue Mission',
      focus: 'Orphanages & Rural Hostels',
      distance: '5.6 km',
      avgResponse: '25 mins',
      fleet: '1 Transit Van',
      contactPerson: 'Vikas Sharma',
      phone: '+91 98765 43210',
      fssaiReg: 'FSSAI-LIC-10023055000129',
      mealsReceived: '510 Meals',
      rating: '4.8 ★',
      status: 'Available',
    }
  ];

  // Modals state
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedHandoverDispatch, setSelectedHandoverDispatch] = useState(null);
  const [certificateModalDispatch, setCertificateModalDispatch] = useState(null);

  // New broadcast form
  const [newSurplus, setNewSurplus] = useState({
    item: '',
    qty: '',
    portions: '',
    safeUntil: '6:30 PM (Today)',
    packaging: 'Insulated Thermal Containers',
    temp: '68°C',
    dietary: 'Pure Vegetarian',
    notes: 'Clean, unserved batch prepared fresh in Mess A',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Broadcast surplus to NGO network
  const handleBroadcastSurplus = (e) => {
    e.preventDefault();
    if (!newSurplus.item || !newSurplus.qty) {
      alert('Please fill in Surplus Item Name and Quantity');
      return;
    }

    const newDispatch = {
      id: `d-${Date.now()}`,
      ngo: 'Helping Hands Shelter',
      qty: `${newSurplus.qty} kg (~${Math.round(parseFloat(newSurplus.qty) * 2.5)} meals)`,
      items: newSurplus.item,
      status: 'Driver Assigned',
      time: `Pickup by ${newSurplus.safeUntil}`,
      eta: '15 mins',
      vehicle: 'Transit Van #TN-38-4021',
      driverName: 'Karthik S.',
      driverPhone: '+91 98421 88310',
      destination: 'North Zone Community Shelter',
      distance: '1.8 km away',
      tempCheck: `${newSurplus.temp} (HACCP Safe)`,
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      haccpVerified: true,
      timestamp: 'Just Now',
    };

    const updated = [newDispatch, ...dispatches];
    setDispatches(updated);
    onUpdateDispatches?.(updated);
    setIsBroadcastModalOpen(false);

    // Update staged banner
    setReadySurplus({
      item: newSurplus.item,
      qty: `${newSurplus.qty} kg`,
      portions: `~${Math.round(parseFloat(newSurplus.qty) * 2.5)} meals`,
      readyTime: 'Just Now',
      safeUntil: newSurplus.safeUntil,
      tempLogged: `${newSurplus.temp} (Safe Hot-Hold)`,
      packaging: newSurplus.packaging,
      status: 'Alert Broadcasted • Awaiting Loading Bay Pickup',
    });

    showToast(`📢 Surplus alert broadcasted to 4 nearby NGOs! Helping Hands Shelter accepted pickup.`);
  };

  // Complete digital handover
  const handleConfirmHandover = (dispatchId) => {
    const updated = dispatches.map((d) =>
      d.id === dispatchId
        ? {
            ...d,
            status: 'Delivered',
            time: 'Handover Completed Just Now',
            eta: 'Completed',
          }
        : d
    );
    setDispatches(updated);
    onUpdateDispatches?.(updated);
    setSelectedHandoverDispatch(null);
    showToast(`✓ Digital Handover Verified! FSSAI chain of custody logged.`);
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

      {/* Top Banner / Breadcrumb & View Mode Switcher */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-info-light text-info uppercase tracking-wider">
                Kitchen Module • Redistribution Hub
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>4 Verified Shelter Partners Active (5 km Radius)</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Active Surplus Redistribution Hub
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Zero-waste routing of clean prepared surplus to verified community shelters with real-time driver ETA tracking, FSSAI temperature logging, and chain-of-custody verification.
            </p>
          </div>

          {/* Quick Header Actions: Broadcast Surplus & Return Home */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsBroadcastModalOpen(true)}
            >
              Broadcast Surplus Batch
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

        {/* 4 Primary Operational Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5 pt-5 border-t border-divider">
          <div className="p-3.5 rounded-xl bg-info-light/40 border border-info/30">
            <div className="flex items-center justify-between text-info text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Active En Route</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-info animate-ping" />
            </div>
            <p className="text-xl md:text-2xl font-black text-info mt-1">
              {dispatches.filter((d) => d.status.includes('Route') || d.status.includes('Assigned')).length} Dispatches
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              ETA: 12 mins at Mess Bay 2
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-brand" />
                <span>Meals Saved This Month</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              1,420 Meals
            </p>
            <p className="text-[11px] text-success font-medium">
              ↑ 22% increase vs August
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-brand" />
                <span>CO₂e Landfill Diverted</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              1,775 kg CO₂
            </p>
            <p className="text-[11px] text-success font-medium">
              SDG 12.3 Certified
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>FSSAI Hygiene Score</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              100% Passed
            </p>
            <p className="text-[11px] text-content-secondary">
              Zero thermal audit breaches
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-divider pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('live-dispatches')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'live-dispatches'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Active Dispatches & Radar ({dispatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('partner-ngos')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'partner-ngos'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Authorized NGO Partners ({partnerNgos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance-logs')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'compliance-logs'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>FSSAI Chain of Custody Audit</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE DISPATCHES & LIVE TRANSIT RADAR */}
      {activeTab === 'live-dispatches' && (
        <div className="space-y-6">
          {/* Staged Surplus Ready Banner Card */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-brand/20 bg-gradient-to-r from-brand-light/40 to-surface">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand text-white uppercase tracking-wider">
                    Staged Loading Bay Batch
                  </span>
                  <StatusPill text={readySurplus.status} level="brand" size="sm" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-content-primary">
                  {readySurplus.qty} • {readySurplus.item}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-content-secondary">
                  <span>Portions: <strong>{readySurplus.portions}</strong></span>
                  <span>•</span>
                  <span>Packaging: <strong>{readySurplus.packaging}</strong></span>
                  <span>•</span>
                  <span className="text-danger font-semibold">Safe Until: {readySurplus.safeUntil}</span>
                  <span>•</span>
                  <span className="text-brand font-semibold flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    {readySurplus.tempLogged}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start lg:self-center">
                <Button
                  variant="primary"
                  icon={Share2}
                  onClick={() => setIsBroadcastModalOpen(true)}
                >
                  Broadcast New Batch
                </Button>
              </div>
            </div>
          </div>

          {/* Active Dispatches List */}
          <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/70 space-y-4">
            <SectionHeader
              icon={Truck}
              title="Real-Time Driver & Dispatch Tracking"
              subtitle="Live telemetry coordinates, ETA timers, and loading bay handovers"
            />

            <div className="space-y-4 mt-2">
              {dispatches.map((disp) => {
                const isEnRoute = disp.status.includes('Route') || disp.status.includes('Assigned');

                return (
                  <div
                    key={disp.id}
                    className={`rounded-2xl border p-4 md:p-5 transition-all ${
                      isEnRoute
                        ? 'border-info/40 bg-info-light/20 shadow-xs'
                        : 'border-divider bg-white'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Dispatch Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-bold text-base md:text-lg text-content-primary">
                            {disp.ngo}
                          </span>
                          <StatusPill
                            text={disp.status}
                            level={isEnRoute ? 'info' : 'success'}
                            dot={true}
                            size="sm"
                          />
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-content-secondary">
                            {disp.timestamp}
                          </span>
                        </div>

                        <p className="text-xs md:text-sm text-content-primary font-medium">
                          {disp.items} • <strong className="text-brand">{disp.qty}</strong>
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-content-secondary pt-1">
                          <span className="flex items-center gap-1 font-medium">
                            <Truck className="w-3.5 h-3.5 text-content-muted" />
                            {disp.vehicle} ({disp.driverName})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-content-muted" />
                            {disp.destination} ({disp.distance})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-success font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Temp: {disp.tempCheck}
                          </span>
                        </div>
                      </div>

                      {/* Right: Driver ETA & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-end lg:self-center">
                        {isEnRoute && (
                          <div className="p-2.5 rounded-xl bg-white border border-info/30 text-center sm:text-right">
                            <span className="text-[10px] uppercase font-bold text-info tracking-wider block">
                              Live Driver ETA
                            </span>
                            <span className="text-lg font-black text-content-primary">
                              {disp.eta}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${disp.driverPhone}`}
                            className="p-2 rounded-xl border border-divider hover:bg-slate-100 text-content-secondary hover:text-content-primary transition-colors flex items-center gap-1 text-xs font-medium"
                            title="Call Driver"
                          >
                            <Phone className="w-4 h-4 text-brand" />
                            <span className="hidden sm:inline">Call</span>
                          </a>

                          {isEnRoute ? (
                            <Button
                              size="sm"
                              variant="primary"
                              icon={CheckCircle2}
                              onClick={() => setSelectedHandoverDispatch(disp)}
                            >
                              Verify Handover (OTP)
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="secondary"
                              icon={Printer}
                              onClick={() => setCertificateModalDispatch(disp)}
                            >
                              FSSAI Slip
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTNER NGOS DIRECTORY */}
      {activeTab === 'partner-ngos' && (
        <div className="space-y-5 animate-fadeIn">
          <SectionHeader
            icon={Building}
            title="Authorized NGO Partner Directory"
            subtitle="Verified food relief organizations registered under the FoodLoop redistribution charter"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerNgos.map((ngo) => (
              <div
                key={ngo.id}
                className="bg-surface rounded-card p-5 shadow-soft border border-divider space-y-3.5 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-content-primary">
                      {ngo.name}
                    </h4>
                    <p className="text-xs text-content-secondary mt-0.5">
                      {ngo.focus}
                    </p>
                  </div>

                  <StatusPill
                    text={ngo.rating}
                    level="brand"
                    size="sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-divider/60">
                  <div>
                    <span className="text-content-muted block text-[10px]">Distance & ETA</span>
                    <span className="font-bold text-content-primary">{ngo.distance} ({ngo.avgResponse})</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">Fleet Capacity</span>
                    <span className="font-bold text-content-primary">{ngo.fleet}</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">FSSAI License</span>
                    <span className="font-mono text-[11px] text-content-primary truncate block">{ngo.fssaiReg}</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">Meals Distributed</span>
                    <span className="font-bold text-brand">{ngo.mealsReceived}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-content-secondary">
                    Coordinator: <strong>{ngo.contactPerson}</strong>
                  </div>

                  <a
                    href={`tel:${ngo.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-brand-light text-brand font-semibold text-xs flex items-center gap-1.5 hover:bg-brand hover:text-white transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{ngo.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FSSAI CHAIN OF CUSTODY AUDIT */}
      {activeTab === 'compliance-logs' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider space-y-5 animate-fadeIn">
          <SectionHeader
            icon={ShieldCheck}
            title="FSSAI Safe Food Donation Audit Trail"
            subtitle="Immutable digital chain-of-custody verifying food safety parameters prior to distribution"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-divider text-content-muted uppercase font-bold text-[11px] bg-slate-50">
                  <th className="py-3 px-4">Dispatch ID</th>
                  <th className="py-3 px-4">Surplus Items</th>
                  <th className="py-3 px-4">Volume</th>
                  <th className="py-3 px-4">Recipient NGO</th>
                  <th className="py-3 px-4">Handover Temp</th>
                  <th className="py-3 px-4">OTP Verification</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Audit Slip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider/60">
                {dispatches.map((disp) => (
                  <tr key={disp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-content-primary">
                      {disp.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-content-primary">
                      {disp.items}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand">
                      {disp.qty}
                    </td>
                    <td className="py-3.5 px-4 text-content-primary">
                      {disp.ngo}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-success flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" />
                      {disp.tempCheck}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-content-primary">
                        OTP: {disp.otpCode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusPill
                        text={disp.status}
                        level={disp.status === 'Delivered' ? 'success' : 'info'}
                        size="sm"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setCertificateModalDispatch(disp)}
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        Print Slip ↗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: BROADCAST NEW SURPLUS BATCH */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <h3 className="font-bold text-base text-content-primary">
                  Broadcast Surplus Food Alert
                </h3>
                <p className="text-xs text-content-secondary">
                  Instant alert dispatched to verified NGO drivers within 5 km
                </p>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBroadcastSurplus} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Surplus Food Item Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cooked Rice, Dal & Mixed Vegetable Curry"
                  required
                  value={newSurplus.item}
                  onChange={(e) => setNewSurplus({ ...newSurplus, item: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Surplus Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 15"
                    required
                    value={newSurplus.qty}
                    onChange={(e) => setNewSurplus({ ...newSurplus, qty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Safe Consumption Deadline
                  </label>
                  <input
                    type="text"
                    defaultValue={newSurplus.safeUntil}
                    onChange={(e) => setNewSurplus({ ...newSurplus, safeUntil: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Current Food Core Temp
                  </label>
                  <input
                    type="text"
                    defaultValue={newSurplus.temp}
                    onChange={(e) => setNewSurplus({ ...newSurplus, temp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Packaging Type
                  </label>
                  <select
                    value={newSurplus.packaging}
                    onChange={(e) => setNewSurplus({ ...newSurplus, packaging: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option>Insulated Thermal Containers</option>
                    <option>Food-Grade Foil Catering Trays</option>
                    <option>Sealed Bulk Steel Canisters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Allergen & Quality Notes
                </label>
                <textarea
                  rows="2"
                  value={newSurplus.notes}
                  onChange={(e) => setNewSurplus({ ...newSurplus, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-divider">
                <Button variant="ghost" onClick={() => setIsBroadcastModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" icon={Share2}>
                  Broadcast to NGOs
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DIGITAL HANDOVER VERIFICATION (OTP & TEMPERATURE AUDIT) */}
      {selectedHandoverDispatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <h3 className="font-bold text-base text-content-primary">
                  Verify Loading Bay Handover
                </h3>
                <p className="text-xs text-content-secondary">
                  Driver: {selectedHandoverDispatch.driverName} ({selectedHandoverDispatch.ngo})
                </p>
              </div>
              <button
                onClick={() => setSelectedHandoverDispatch(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-divider space-y-2">
                <div className="flex justify-between">
                  <span className="text-content-secondary">Surplus Batch:</span>
                  <span className="font-bold text-content-primary">{selectedHandoverDispatch.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Weight & Meals:</span>
                  <span className="font-bold text-brand">{selectedHandoverDispatch.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Assigned Vehicle:</span>
                  <span className="font-bold text-content-primary">{selectedHandoverDispatch.vehicle}</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-content-secondary block mb-1">
                  Driver Digital Handover OTP
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={selectedHandoverDispatch.otpCode}
                    readOnly
                    className="text-center font-mono font-bold text-lg tracking-widest px-4 py-2 rounded-xl border border-divider bg-slate-100 text-brand w-full"
                  />
                </div>
                <p className="text-[11px] text-content-muted mt-1">
                  Verify that the driver displays OTP code #{selectedHandoverDispatch.otpCode} on their mobile terminal.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-success-light/40 border border-success/30 flex items-center gap-2 text-success font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Core Temperature Probe verified: {selectedHandoverDispatch.tempCheck}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setSelectedHandoverDispatch(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={Check}
                onClick={() => handleConfirmHandover(selectedHandoverDispatch.id)}
              >
                Confirm & Sign Handover
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PRINTABLE FSSAI HANDOVER SLIP */}
      {certificateModalDispatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-base text-content-primary">
                  FSSAI Food Donation Certificate
                </h3>
              </div>
              <button
                onClick={() => setCertificateModalDispatch(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="text-center p-3 rounded-xl bg-slate-50 border border-divider">
                <p className="font-bold text-sm text-content-primary">
                  Official Safe Food Custody Transfer Slip
                </p>
                <p className="text-[11px] text-content-muted">
                  Under FSSAI (Recovery & Distribution of Surplus Food) Regulations
                </p>
              </div>

              <div className="space-y-1.5 border-t border-b border-divider py-3">
                <div className="flex justify-between">
                  <span className="text-content-secondary">Donor Institution:</span>
                  <span className="font-bold text-content-primary">BIT Mess A (Chef Raman)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Recipient Shelter:</span>
                  <span className="font-bold text-content-primary">{certificateModalDispatch.ngo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Items Transferred:</span>
                  <span className="font-bold text-content-primary">{certificateModalDispatch.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Quantity:</span>
                  <span className="font-bold text-brand">{certificateModalDispatch.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Handover Temperature:</span>
                  <span className="font-bold text-success">{certificateModalDispatch.tempCheck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Dispatch Vehicle:</span>
                  <span className="font-bold text-content-primary">{certificateModalDispatch.vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Timestamp:</span>
                  <span className="font-medium text-content-secondary">{certificateModalDispatch.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-content-muted">
                <span>Verified by FoodLoop IoT Telemetry</span>
                <span className="font-mono">AUTH-HASH: #FL-{certificateModalDispatch.id}-SEC</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setCertificateModalDispatch(null)}>
                Close
              </Button>
              <Button variant="primary" icon={Printer} onClick={() => window.print()}>
                Print Certificate Slip
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
