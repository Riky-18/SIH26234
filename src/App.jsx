import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import KitchenDashboard from './components/views/KitchenDashboard';
import AiMenuPlanner from './components/views/AiMenuPlanner';
import StockAndExpiry from './components/views/StockAndExpiry';
import RedistributionHub from './components/views/RedistributionHub';
import KitchenSettings from './components/views/KitchenSettings';
import LoadCellWasteLog from './components/views/LoadCellWasteLog';
import LiveSurplusMap from './components/views/LiveSurplusMap';
import PickupHistory from './components/views/PickupHistory';
import CommunityImpact from './components/views/CommunityImpact';
import WasteAnalytics from './components/views/WasteAnalytics';
import RootCauseAutopsy from './components/views/RootCauseAutopsy';
import AdminPartnerNetwork from './components/views/AdminPartnerNetwork';
import AdminEsgCompliance from './components/views/AdminEsgCompliance';
import AdminSettings from './components/views/AdminSettings';
import NgoSettings from './components/views/NgoSettings';
import NgoDashboard from './components/views/NgoDashboard';
import AdminDashboard from './components/views/AdminDashboard';
import { mockData } from './data/mockData';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import Button from './components/common/Button';

export default function App() {
  const [role, setRole] = useState('kitchen'); // 'kitchen' | 'ngo' | 'admin'
  const [activeNav, setActiveNav] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [kitchenData, setKitchenData] = useState(mockData.kitchen);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setActiveNav('home');
  };

  // Sync accepted dish from AI Menu Planner to Kitchen Dashboard
  const handleAcceptDishToKitchen = (newDish) => {
    setKitchenData((prev) => {
      const exists = prev.menuSuggestions.some((d) => d.id === newDish.id);
      const updatedSuggestions = exists
        ? prev.menuSuggestions.map((d) =>
            d.id === newDish.id ? { ...d, status: 'accepted' } : d
          )
        : [{ ...newDish, status: 'accepted' }, ...prev.menuSuggestions];

      return {
        ...prev,
        menuSuggestions: updatedSuggestions,
      };
    });
  };

  // Sync inventory changes from Stock & Expiry module
  const handleUpdateInventory = (newInventory) => {
    setKitchenData((prev) => ({
      ...prev,
      inventory: newInventory,
    }));
  };

  return (
    <div className="min-h-screen bg-app flex text-content-primary">
      {/* Fixed Left Sidebar */}
      <Sidebar
        role={role}
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
          </div>

          {/* Conditional Navigation Views */}
          {activeNav === 'menu' ? (
            <AiMenuPlanner
              kitchenData={kitchenData}
              onAcceptDishToKitchen={handleAcceptDishToKitchen}
              onNavigateHome={() => setActiveNav('home')}
            />
          ) : activeNav === 'inventory' ? (
            <StockAndExpiry
              inventoryData={kitchenData?.inventory}
              onNavigateToPlanner={() => setActiveNav('menu')}
              onNavigateHome={() => setActiveNav('home')}
              onUpdateInventory={handleUpdateInventory}
            />
          ) : activeNav === 'redistribution' ? (
            <RedistributionHub
              redistributionData={kitchenData?.redistribution}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToNgo={() => handleRoleChange('ngo')}
              onUpdateDispatches={(newDispatches) => {
                setKitchenData((prev) => ({
                  ...prev,
                  redistribution: {
                    ...prev.redistribution,
                    dispatches: newDispatches,
                  },
                }));
              }}
            />
          ) : activeNav === 'waste' ? (
            <LoadCellWasteLog
              wasteData={kitchenData}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToPlanner={() => setActiveNav('menu')}
            />
          ) : activeNav === 'settings' ? (
            role === 'admin' ? (
              <AdminSettings
                onNavigateHome={() => setActiveNav('home')}
              />
            ) : role === 'ngo' ? (
              <NgoSettings
                onNavigateHome={() => setActiveNav('home')}
              />
            ) : (
              <KitchenSettings
                onNavigateHome={() => setActiveNav('home')}
              />
            )
          ) : activeNav === 'map' ? (
            <LiveSurplusMap
              ngoData={mockData.ngo}
              onNavigateHome={() => setActiveNav('home')}
            />
          ) : activeNav === 'pickups' ? (
            <PickupHistory
              ngoData={mockData.ngo}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToMap={() => setActiveNav('map')}
            />
          ) : activeNav === 'impact' ? (
            <CommunityImpact
              ngoData={mockData.ngo}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToMap={() => setActiveNav('map')}
              onNavigateToHistory={() => setActiveNav('pickups')}
            />
          ) : activeNav === 'analytics' ? (
            <WasteAnalytics
              adminData={mockData.admin}
              onNavigateHome={() => setActiveNav('home')}
            />
          ) : activeNav === 'autopsy' ? (
            <RootCauseAutopsy
              adminData={mockData.admin}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToAnalytics={() => setActiveNav('analytics')}
            />
          ) : activeNav === 'partners' ? (
            <AdminPartnerNetwork
              adminData={mockData.admin}
              onNavigateHome={() => setActiveNav('home')}
              onNavigateToMap={() => {
                setRole('ngo');
                setActiveNav('map');
              }}
            />
          ) : activeNav === 'esg' ? (
            <AdminEsgCompliance
              adminData={mockData.admin}
              onNavigateHome={() => setActiveNav('home')}
            />
          ) : activeNav === 'home' ? (
            role === 'kitchen' ? (
              <KitchenDashboard
                data={kitchenData}
                onNavigate={(nav) => setActiveNav(nav)}
              />
            ) : role === 'ngo' ? (
              <NgoDashboard
                data={mockData.ngo}
                onNavigate={(nav) => setActiveNav(nav)}
              />
            ) : (
              <AdminDashboard
                data={mockData.admin}
                onNavigate={(nav) => setActiveNav(nav)}
              />
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
