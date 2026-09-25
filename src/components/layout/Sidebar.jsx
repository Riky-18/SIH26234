import React from 'react';
import {
  Utensils,
  CalendarCheck,
  Package,
  Scale,
  Share2,
  Settings,
  MapPin,
  History,
  TrendingUp,
  BarChart3,
  PieChart,
  ShieldCheck,
  Users,
  FileText,
  Repeat,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar({
  role,
  setRole,
  activeNav,
  setActiveNav,
  isOpen,
  onClose,
}) {
  const roleNavItems = {
    kitchen: [
      { id: 'home', label: 'Home Dashboard', icon: Utensils },
      { id: 'menu', label: 'AI Menu Planner', icon: CalendarCheck, badge: 'Smart' },
      { id: 'inventory', label: 'Stock & Expiry', icon: Package, badge: '5 Alert' },
      { id: 'waste', label: 'Load Cell Waste Log', icon: Scale },
      { id: 'redistribution', label: 'Redistribution Hub', icon: Share2, badge: '2 Ready' },
      { id: 'settings', label: 'Kitchen Settings', icon: Settings },
    ],
    ngo: [
      { id: 'home', label: 'Coordinator Hub', icon: Utensils },
      { id: 'map', label: 'Live Surplus Map', icon: MapPin, badge: '4 Live' },
      { id: 'pickups', label: 'Pickup History', icon: History },
      { id: 'impact', label: 'Community Impact', icon: TrendingUp },
      { id: 'settings', label: 'NGO Profile & Fleet', icon: Settings },
    ],
    admin: [
      { id: 'home', label: 'Executive Overview', icon: BarChart3 },
      { id: 'analytics', label: 'Waste Analytics', icon: TrendingUp },
      { id: 'autopsy', label: 'Root Cause Autopsy', icon: PieChart, badge: 'AI Model' },
      { id: 'partners', label: 'NGO Partner Network', icon: Users },
      { id: 'esg', label: 'ESG & Compliance', icon: ShieldCheck, badge: 'Verified' },
      { id: 'settings', label: 'System Configuration', icon: Settings },
    ],
  };

  const currentNav = roleNavItems[role] || roleNavItems.kitchen;

  const roleInfo = {
    kitchen: {
      name: 'Kitchen Manager',
      sub: 'Mess A • North Campus',
      avatarBg: 'bg-brand/10 text-brand',
    },
    ngo: {
      name: 'NGO Coordinator',
      sub: 'Feeding Hope Foundation',
      avatarBg: 'bg-info/10 text-info',
    },
    admin: {
      name: 'Sustainability Admin',
      sub: 'Central Campus Authority',
      avatarBg: 'bg-purple-100 text-purple-700',
    },
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface border-r border-divider flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo Section */}
        <div>
          <div className="h-16 px-5 border-b border-divider flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-sm">
                <Repeat className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="font-bold text-lg text-content-primary tracking-tight">FoodLoop</span>
                <span className="ml-1.5 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-brand-light text-brand tracking-wide">
                  AI
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-content-secondary hover:text-content-primary rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hackathon Team Tag */}
          <div className="px-5 py-2.5 bg-slate-50/80 border-b border-divider/60 flex items-center justify-between text-[11px] text-content-secondary">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>SIH 2026 • Team InvictX</span>
            </div>
            <span className="text-[10px] font-semibold bg-white border border-divider px-1.5 py-0.5 rounded text-content-primary">
              Prototype
            </span>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            <p className="px-3 pb-1 text-[11px] font-semibold text-content-muted uppercase tracking-wider">
              Navigation
            </p>
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-brand text-white shadow-sm'
                      : 'text-content-secondary hover:bg-brand-light/60 hover:text-brand'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-content-muted'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-light text-brand'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Role Switcher & Active Persona */}
        <div className="p-3 border-t border-divider bg-slate-50/60">
          <div className="mb-2.5 px-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted">
              Role Switcher (Demo)
            </span>
          </div>

          {/* 3-Way Role Switcher Control */}
          <div className="grid grid-cols-1 gap-1.5 p-1 bg-white rounded-xl border border-divider shadow-soft-sm">
            <button
              onClick={() => {
                setRole('kitchen');
                setActiveNav('home');
              }}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                role === 'kitchen'
                  ? 'bg-brand-light text-brand font-semibold shadow-xs'
                  : 'text-content-secondary hover:text-content-primary hover:bg-slate-50'
              }`}
            >
              <span>1. Kitchen Manager</span>
              {role === 'kitchen' && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
            </button>

            <button
              onClick={() => {
                setRole('ngo');
                setActiveNav('home');
              }}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                role === 'ngo'
                  ? 'bg-info-light text-info font-semibold shadow-xs'
                  : 'text-content-secondary hover:text-content-primary hover:bg-slate-50'
              }`}
            >
              <span>2. NGO Coordinator</span>
              {role === 'ngo' && <span className="w-1.5 h-1.5 rounded-full bg-info" />}
            </button>

            <button
              onClick={() => {
                setRole('admin');
                setActiveNav('home');
              }}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                role === 'admin'
                  ? 'bg-purple-100 text-purple-700 font-semibold shadow-xs'
                  : 'text-content-secondary hover:text-content-primary hover:bg-slate-50'
              }`}
            >
              <span>3. Institution Admin</span>
              {role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
            </button>
          </div>

          {/* Persona Card */}
          <div className="mt-2.5 p-2 rounded-xl bg-white border border-divider/70 flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${roleInfo[role]?.avatarBg}`}>
              {role === 'kitchen' ? 'KM' : role === 'ngo' ? 'NC' : 'IA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-content-primary truncate">{roleInfo[role]?.name}</p>
              <p className="text-[10px] text-content-secondary truncate">{roleInfo[role]?.sub}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
