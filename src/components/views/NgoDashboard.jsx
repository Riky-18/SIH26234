import React, { useState } from 'react';
import {
  BellRing,
  Utensils,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Check,
  X,
  Truck,
  Building,
  HeartHandshake,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import DataTable from '../common/DataTable';
import AlertCard from '../common/AlertCard';

export default function NgoDashboard({ data }) {
  const [alerts, setAlerts] = useState(data.alerts);
  const [activePickup, setActivePickup] = useState(data.initialActivePickup);
  const [history, setHistory] = useState(data.history);
  const [selectedMapPin, setSelectedMapPin] = useState(null);
  const [pickupSuccessToast, setPickupSuccessToast] = useState(false);

  // Accept alert handler
  const handleAcceptAlert = (alert) => {
    setActivePickup({
      id: `pickup-${Date.now()}`,
      kitchen: alert.kitchen,
      address: alert.location || 'Central Campus Distribution Gate',
      contact: alert.contact || '+91 98421 00000',
      qty: `${alert.qty} (${alert.meals})`,
      vehicleAssigned: 'Transit Van (KA-05-MN-2201)',
      driverName: 'Karthik S.',
      eta: '12 mins',
      acceptedTime: 'Just Now',
      windowDeadline: alert.window,
      tempControlled: true,
    });
    // Remove from active alerts list
    setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
  };

  // Decline alert handler
  const handleDeclineAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Mark picked up handler
  const handleMarkPickedUp = () => {
    if (!activePickup) return;
    const newHistoryEntry = {
      id: `h-${Date.now()}`,
      date: 'Today (Just Now)',
      kitchen: activePickup.kitchen,
      qty: activePickup.qty.split(' ')[0] + ' kg',
      meals: activePickup.qty.includes('(') ? activePickup.qty.split('(')[1].replace(')', '') : '50 meals',
      status: 'Delivered',
      recipient: 'Hope Community Center',
    };

    setHistory([newHistoryEntry, ...history]);
    setActivePickup(null);
    setPickupSuccessToast(true);
    setTimeout(() => setPickupSuccessToast(false), 4000);
  };

  const historyColumns = [
    {
      header: 'Date & Time',
      accessor: 'date',
      render: (val) => <span className="font-semibold text-content-primary">{val}</span>
    },
    {
      header: 'Source Kitchen',
      accessor: 'kitchen',
      render: (val) => (
        <div className="flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-content-muted" />
          <span className="font-medium text-content-primary">{val}</span>
        </div>
      )
    },
    {
      header: 'Quantity & Servings',
      accessor: 'qty',
      render: (val, row) => (
        <div>
          <span className="font-bold text-content-primary">{val}</span>
          <span className="text-xs text-content-secondary ml-1">({row.meals})</span>
        </div>
      )
    },
    {
      header: 'Shelter Recipient',
      accessor: 'recipient',
      render: (val) => <span className="text-xs text-content-secondary">{val}</span>
    },
    {
      header: 'Delivery Status',
      accessor: 'status',
      render: (val) => (
        <StatusPill
          text={val}
          level="success"
          dot={true}
          size="sm"
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {pickupSuccessToast && (
        <div className="p-4 rounded-xl bg-success-light border border-success/30 flex items-center justify-between text-success animate-fade-in shadow-soft">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-bold">
              Pickup successfully recorded and logged into verified delivery history!
            </span>
          </div>
          <button
            onClick={() => setPickupSuccessToast(false)}
            className="text-xs font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 6.1 Top Row — Quick Stat Cards (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={BellRing}
          iconColor="warning"
          label="Active Alerts Nearby"
          value={alerts.length.toString()}
          badge={<StatusPill text="Ready to Claim" level="warning" dot={true} />}
          subtitle="Within 5 km radius"
        />

        <StatCard
          icon={Utensils}
          iconColor="brand"
          label="Meals Received This Month"
          value={data.stats.mealsThisMonth.toLocaleString()}
          trend="↑ 22% vs last month"
          trendDirection="up"
          trendPositive={true}
          subtitle="Direct shelter servings"
        />

        <StatCard
          icon={CheckCircle}
          iconColor="success"
          label="Pickups Completed"
          value={data.stats.pickupsCompleted.toString()}
          subtitle="Zero missed pickups"
        />

        <StatCard
          icon={Clock}
          iconColor="info"
          label="Avg. Response Time"
          value={data.stats.avgResponse}
          trend="↓ 4m faster"
          trendDirection="down"
          trendPositive={true}
          subtitle="Alert to claim acceptance"
        />
      </div>

      {/* 6.3 Section — Active Pickup (Conditional Highlight) */}
      {activePickup && (
        <div className="bg-white rounded-card p-5 md:p-6 shadow-soft border-2 border-brand/40 bg-gradient-to-r from-brand-light/30 via-white to-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <StatusPill text="ACTIVE DISPATCH EN ROUTE" level="brand" dot={true} size="sm" />
                <span className="text-xs text-content-secondary">
                  Claimed {activePickup.acceptedTime}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-content-primary">
                  {activePickup.kitchen}
                </h3>
                <p className="text-sm text-content-secondary flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-brand" />
                  {activePickup.address}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-content-muted" />
                  <span className="font-semibold text-content-primary">{activePickup.qty}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-content-muted" />
                  <span className="text-content-secondary">{activePickup.contact}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-content-muted" />
                  <span className="text-content-secondary">{activePickup.vehicleAssigned} ({activePickup.driverName})</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-warning-light text-warning font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pickup by {activePickup.windowDeadline}</span>
                </div>
              </div>
            </div>

            {/* ETA & Confirmation Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-divider">
              <div className="text-center sm:text-right px-4 py-2 rounded-xl bg-brand-light/60 border border-brand/20 w-full sm:w-auto">
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block">
                  Driver ETA
                </span>
                <span className="text-2xl font-black text-brand tracking-tight">
                  {activePickup.eta}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                icon={Check}
                onClick={handleMarkPickedUp}
                className="w-full sm:w-auto font-bold shadow-md hover:shadow-lg"
              >
                Mark as Picked Up
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 6.2 Section — Live Surplus Feed (split view: list left, map right) */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
        <SectionHeader
          icon={Navigation}
          title="Live Surplus Radar & Available Food Donations"
          subtitle="Instant match feed from kitchens within delivery radius"
          badge={<StatusPill text={`${alerts.length} Active Feeds`} level="brand" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          
          {/* Left Panel: Scrollable Alert Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
            {alerts.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-50 border border-divider">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <h4 className="font-semibold text-content-primary">All Surplus Pickups Claimed</h4>
                <p className="text-xs text-content-secondary mt-1">
                  You've claimed all active batches in your zone. New batches will ping here automatically.
                </p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedMapPin(alert)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedMapPin?.id === alert.id
                      ? 'border-brand ring-2 ring-brand/20 bg-brand-light/20'
                      : 'border-divider hover:border-brand/40 bg-slate-50/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-content-primary">{alert.kitchen}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-amber-100 text-amber-800">
                          {alert.distance}
                        </span>
                      </div>
                      <p className="text-xs text-content-secondary mt-0.5">{alert.location}</p>
                    </div>

                    <StatusPill
                      text={`By ${alert.window}`}
                      level={alert.urgency === 'urgent' ? 'danger' : 'warning'}
                      size="sm"
                    />
                  </div>

                  <div className="mt-2.5 p-2 rounded-lg bg-white border border-divider/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-brand text-sm">{alert.qty}</span>
                      <span className="text-content-secondary ml-1.5 font-medium">({alert.meals})</span>
                    </div>
                    <span className="text-[11px] text-content-secondary truncate max-w-[150px]">
                      {alert.items}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-divider/60">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeclineAlert(alert.id);
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={ArrowRight}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptAlert(alert);
                      }}
                    >
                      Accept Pickup
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Panel: Simulated Interactive Map Placeholder (7 cols) */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl border border-divider relative overflow-hidden min-h-[380px] lg:min-h-[520px] flex flex-col justify-between p-4">
            
            {/* Map styling grid background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #CBD5E1 1px, transparent 1px),
                  linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Stylized road & zone contours */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 200 150 400 80 T 800 200" fill="none" stroke="#94A3B8" strokeWidth="8" />
              <path d="M 150 0 Q 180 300 350 600" fill="none" stroke="#94A3B8" strokeWidth="6" />
              <path d="M 300 100 L 500 400" fill="none" stroke="#94A3B8" strokeWidth="4" strokeDasharray="6,6" />
              <circle cx="280" cy="240" r="140" fill="none" stroke="#2E6F5E" strokeWidth="1.5" strokeDasharray="4,4" />
            </svg>

            {/* Map Top Header Controls */}
            <div className="relative z-10 flex items-center justify-between bg-white/90 backdrop-blur-xs p-3 rounded-xl shadow-soft-sm border border-divider">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand animate-ping" />
                <span className="text-xs font-bold text-content-primary">
                  NGO Hub Location: Rainbow Children Shelter
                </span>
              </div>
              <span className="text-[11px] font-medium text-content-secondary bg-slate-100 px-2 py-0.5 rounded-md">
                Radius: 5.0 km
              </span>
            </div>

            {/* Central NGO Base Marker */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: '50%', top: '50%' }}
            >
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg ring-4 ring-brand/20 animate-pulse">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-bold text-brand shadow-sm border border-brand/20">
                You (Shelter HQ)
              </span>
            </div>

            {/* Kitchen Map Pin Markers */}
            {alerts.map((alert) => {
              const isSelected = selectedMapPin?.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedMapPin(alert)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform hover:scale-110"
                  style={{ left: `${alert.coords.x}%`, top: `${alert.coords.y}%` }}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      isSelected
                        ? 'bg-danger text-white ring-4 ring-danger/30 scale-110'
                        : 'bg-white text-brand border-2 border-brand hover:bg-brand hover:text-white'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                  </div>

                  {/* Popover on hover or selection */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-white shadow-soft-lg border border-divider text-center transition-all ${
                      isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  >
                    <p className="text-xs font-bold text-content-primary truncate">{alert.kitchen}</p>
                    <p className="text-[11px] text-brand font-semibold">{alert.qty} • {alert.distance}</p>
                    <p className="text-[10px] text-content-secondary mt-0.5">Pickup by {alert.window}</p>
                  </div>
                </div>
              );
            })}

            {/* Map Bottom Legend / Active Selection Bar */}
            <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-soft-sm border border-divider flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  <span className="text-content-secondary font-medium">Your Depot</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                  <span className="text-content-secondary font-medium">Available Kitchens</span>
                </div>
              </div>

              {selectedMapPin ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-content-primary hidden sm:inline">
                    Selected: {selectedMapPin.kitchen}
                  </span>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleAcceptAlert(selectedMapPin)}
                  >
                    Claim {selectedMapPin.qty}
                  </Button>
                </div>
              ) : (
                <span className="text-[11px] text-content-muted">
                  Click any pin on radar to preview
                </span>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 6.5 Section — Impact Snapshot (Soft green tinted row) */}
      <div className="p-6 rounded-card bg-success-light/50 border border-success/30 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-success" />
            <h3 className="font-bold text-content-primary text-base">
              Cumulative Community Impact Snapshot
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-success border border-success/30">
            September 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-success/20 shadow-soft-sm">
            <span className="text-xs font-medium text-content-secondary uppercase tracking-wider block">
              Total Meals Redistributed
            </span>
            <span className="text-3xl font-extrabold text-success tracking-tight mt-1 block">
              {data.impact.meals}
            </span>
            <p className="text-xs text-content-secondary mt-1">
              Pure wholesome surplus safely redirected
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-success/20 shadow-soft-sm">
            <span className="text-xs font-medium text-content-secondary uppercase tracking-wider block">
              Estimated People Served
            </span>
            <span className="text-3xl font-extrabold text-brand tracking-tight mt-1 block">
              {data.impact.peopleServed}
            </span>
            <p className="text-xs text-content-secondary mt-1">
              Across 4 verified community centers
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-success/20 shadow-soft-sm">
            <span className="text-xs font-medium text-content-secondary uppercase tracking-wider block">
              Kitchens Partnered
            </span>
            <span className="text-3xl font-extrabold text-info tracking-tight mt-1 block">
              {data.impact.kitchensPartnered}
            </span>
            <p className="text-xs text-content-secondary mt-1">
              Hostels, hospitals & college canteens
            </p>
          </div>
        </div>
      </div>

      {/* 6.4 Section — Pickup History Table */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60">
        <SectionHeader
          icon={Users}
          title="Pickup & Delivery History"
          subtitle="Audit-ready logs of surplus collection and beneficiary deliveries"
        />

        <DataTable
          columns={historyColumns}
          data={history}
          keyField="id"
        />
      </div>
    </div>
  );
}
