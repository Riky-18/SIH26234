import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import KitchenDashboard from './components/views/KitchenDashboard';
import NgoDashboard from './components/views/NgoDashboard';
import AdminDashboard from './components/views/AdminDashboard';
import { mockData } from './data/mockData';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import Button from './components/common/Button';

export default function App() {
  const [role, setRole] = useState('kitchen'); // 'kitchen' | 'ngo' | 'admin'
  const [activeNav, setActiveNav] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Switch role helper
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setActiveNav('home');
  };

  return (
    <div className="min-h-screen bg-app flex text-content-primary">
      {/* Fixed Left Sidebar */}
      <Sidebar
        role={role}
        setRole={handleRoleChange}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Fixed Top Bar */}
        <TopBar
          role={role}
          activeNav={activeNav}
          onOpenSidebar={() => setSidebarOpen(true)}
          onRoleChange={handleRoleChange}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {/* Active Role Quick Banner (Hackathon Pitch Demo Context) */}
          <div className="mb-6 p-4 rounded-card bg-surface border border-divider shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                role === 'kitchen' ? 'bg-brand' : role === 'ngo' ? 'bg-info' : 'bg-purple-600'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-content-primary">
                    {role === 'kitchen'
                      ? 'Role 1: Kitchen / Mess Manager'
                      : role === 'ngo'
                      ? 'Role 2: NGO / Shelter Coordinator'
                      : 'Role 3: Institution Admin / Sustainability Officer'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-content-secondary">
                    Live Demo View
                  </span>
                </div>
                <p className="text-xs text-content-secondary mt-0.5">
                  {role === 'kitchen'
                    ? 'Prevent waste during menu-prep, track IoT load cell discard in real time, and route clean surplus.'
                    : role === 'ngo'
                    ? 'One-tap surplus claim radar with distance tracking, pickup deadlines, and verified delivery chain.'
                    : 'Campus-wide waste autopsy, ESG compliance audit reports, cost/carbon savings, and hostel leaderboards.'}
                </p>
              </div>
            </div>

            {/* Quick Switch Buttons right inside banner */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-content-muted hidden sm:inline">Switch Role:</span>
              <button
                onClick={() => handleRoleChange('kitchen')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  role === 'kitchen' ? 'bg-brand text-white font-bold shadow-xs' : 'bg-slate-100 text-content-secondary hover:bg-slate-200'
                }`}
              >
                Kitchen
              </button>
              <button
                onClick={() => handleRoleChange('ngo')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  role === 'ngo' ? 'bg-info text-white font-bold shadow-xs' : 'bg-slate-100 text-content-secondary hover:bg-slate-200'
                }`}
              >
                NGO
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  role === 'admin' ? 'bg-purple-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-content-secondary hover:bg-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Conditional Navigation Views */}
          {activeNav === 'home' ? (
            role === 'kitchen' ? (
              <KitchenDashboard data={mockData.kitchen} />
            ) : role === 'ngo' ? (
              <NgoDashboard data={mockData.ngo} />
            ) : (
              <AdminDashboard data={mockData.admin} />
            )
          ) : (
            /* Sub-navigation placeholder view */
            <div className="bg-surface rounded-card p-8 md:p-12 shadow-soft border border-divider text-center max-w-xl mx-auto my-12">
              <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand flex items-center justify-center mx-auto mb-4">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-content-primary">
                Sub-Module Navigation
              </h3>
              <p className="text-sm text-content-secondary mt-2 mb-6">
                You selected the <strong>{activeNav.toUpperCase()}</strong> tab. For this prototype, all primary operational capabilities are consolidated in the main Home overview.
              </p>
              <Button
                variant="primary"
                icon={ArrowRight}
                onClick={() => setActiveNav('home')}
              >
                Return to {role.toUpperCase()} Overview
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
