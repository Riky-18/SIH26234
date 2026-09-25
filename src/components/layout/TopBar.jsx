import React from 'react';
import { Menu, Search, Bell, Activity, RefreshCw } from 'lucide-react';
import StatusPill from '../common/StatusPill';

export default function TopBar({
  role,
  activeNav,
  onOpenSidebar,
  roleName,
  onRoleChange,
}) {
  const titles = {
    kitchen: {
      home: "Kitchen & Mess Operations",
      menu: "AI Menu Optimization & Forecasting",
      inventory: "Stock Expiry & Inventory Tracking",
      waste: "Load Cell Automated Waste Feeds",
      redistribution: "Active Surplus Redistribution",
      settings: "Kitchen Sensor Calibration & Profile",
    },
    ngo: {
      home: "Shelter Redistribution Dashboard",
      map: "Live Nearby Surplus Radar",
      pickups: "Completed Pickups & Transit Logs",
      impact: "Community Food Security Impact",
      settings: "Shelter Fleet & Volunteer Settings",
    },
    admin: {
      home: "Institution Sustainability Command Center",
      analytics: "Multi-Hostel Waste Analytics & Trends",
      autopsy: "AI Waste Root-Cause Autopsy",
      partners: "Verified NGO Partner Network",
      esg: "ESG Compliance & SDG 12.3 Reports",
      settings: "Institutional Carbon & Waste Targets",
    }
  };

  const currentTitle = titles[role]?.[activeNav] || titles[role]?.home || "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur-md border-b border-divider px-4 md:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-content-secondary hover:text-content-primary hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-xl font-bold text-content-primary tracking-tight line-clamp-1">
            {currentTitle}
          </h1>
          <p className="hidden md:block text-xs text-content-secondary">
            FoodLoop AI • Closed-Loop Food Waste Prevention & Redistribution
          </p>
        </div>
      </div>

      {/* Right: Quick actions, Search, Live IoT, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Live IoT Sensor status chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-light border border-success/20 text-success text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>IoT Sensors Live</span>
        </div>

        {/* Single role switcher from frontend-changes branch */}
        <div className="hidden md:flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-divider text-xs">
          {[
            ['kitchen', 'Kitchen'],
            ['ngo', 'NGO'],
            ['admin', 'Admin'],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => onRoleChange(value)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                role === value
                  ? 'bg-white text-brand shadow-xs font-semibold'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-content-secondary hover:text-content-primary hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-divider">
          <div className="w-9 h-9 rounded-full bg-brand-light text-brand font-bold text-sm flex items-center justify-center border border-brand/20">
            {role === 'kitchen' ? 'CR' : role === 'ngo' ? 'PS' : 'MI'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-content-primary leading-tight">
              {role === 'kitchen' ? 'Chef Raman' : role === 'ngo' ? 'Priya Sharma' : 'Dr. Meera Iyer'}
            </p>
            <p className="text-[10px] text-content-secondary">
              {role === 'kitchen' ? 'Head Mess Chef' : role === 'ngo' ? 'Lead Dispatcher' : 'Chief ESG Officer'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
