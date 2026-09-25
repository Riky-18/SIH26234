import React, { useState, useEffect } from 'react';
import {
  Package,
  AlertTriangle,
  Clock,
  Thermometer,
  CheckCircle2,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit2,
  ArrowRight,
  Share2,
  Sparkles,
  RefreshCw,
  Sliders,
  Download,
  Printer,
  QrCode,
  ShieldCheck,
  Scale,
  Eye,
  X,
  ChevronRight,
  Info,
  Calendar,
  TrendingDown,
  Layers,
  Zap,
  Check
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

const DEFAULT_INVENTORY = [
  {
    id: 1,
    item: 'Tomatoes',
    qty: 15,
    unit: 'kg',
    category: 'Vegetables',
    expiry: 'Today (6 hrs)',
    level: 'danger',
    storage: 'Walk-in Cooler A',
    batchNo: 'BAT-2609-01',
    receivedDate: '22 Sep 2026',
    totalShelfDays: 3,
    daysLeft: 0.25,
    temp: '3.8°C',
    supplier: 'Cauvery River Valley Co-op',
    estValue: 600,
    freshness: 48,
    status: 'active',
    fifoRule: 'Exhaust batch #01 immediately in Lunch Special'
  },
  {
    id: 6,
    item: 'Spinach (Palak)',
    qty: 8,
    unit: 'kg',
    category: 'Vegetables',
    expiry: 'Today (4 hrs)',
    level: 'danger',
    storage: 'Crisper Bay',
    batchNo: 'BAT-2609-06',
    receivedDate: '23 Sep 2026',
    totalShelfDays: 2,
    daysLeft: 0.15,
    temp: '5.8°C',
    supplier: 'Green Valley Organic Farms',
    estValue: 320,
    freshness: 62,
    status: 'active',
    fifoRule: 'Cook within lunch prep cycle or flash freeze'
  },
  {
    id: 4,
    item: 'Fresh Milk',
    qty: 18,
    unit: 'L',
    category: 'Dairy',
    expiry: 'Tomorrow (24 hrs)',
    level: 'warning',
    storage: 'Fridge 1',
    batchNo: 'BAT-2609-04',
    receivedDate: '24 Sep 2026',
    totalShelfDays: 2,
    daysLeft: 1.0,
    temp: '3.2°C',
    supplier: 'Aavin Dairy Federation',
    estValue: 1080,
    freshness: 78,
    status: 'active',
    fifoRule: 'Reduce for gravy base or convert to curd'
  },
  {
    id: 8,
    item: 'Paneer Block',
    qty: 6,
    unit: 'kg',
    category: 'Dairy',
    expiry: '2 days',
    level: 'warning',
    storage: 'Cold Room 2',
    batchNo: 'BAT-2609-08',
    receivedDate: '23 Sep 2026',
    totalShelfDays: 4,
    daysLeft: 2.0,
    temp: '4.5°C',
    supplier: 'Aavin Dairy Federation',
    estValue: 1800,
    freshness: 72,
    status: 'active',
    fifoRule: 'Prioritize in Dinner Special Gravy'
  },
  {
    id: 2,
    item: 'Onions',
    qty: 22,
    unit: 'kg',
    category: 'Vegetables',
    expiry: '2 days',
    level: 'warning',
    storage: 'Dry Storage B',
    batchNo: 'BAT-2609-02',
    receivedDate: '20 Sep 2026',
    totalShelfDays: 7,
    daysLeft: 2.0,
    temp: '23.5°C',
    supplier: 'Nashik Agro Direct',
    estValue: 770,
    freshness: 80,
    status: 'active',
    fifoRule: 'Batch #02 in active rotation'
  },
  {
    id: 5,
    item: 'Potatoes',
    qty: 30,
    unit: 'kg',
    category: 'Vegetables',
    expiry: '6 days',
    level: 'success',
    storage: 'Dry Storage A',
    batchNo: 'BAT-2609-05',
    receivedDate: '21 Sep 2026',
    totalShelfDays: 10,
    daysLeft: 6.0,
    temp: '22.0°C',
    supplier: 'Hassan Farm Producers',
    estValue: 900,
    freshness: 92,
    status: 'active',
    fifoRule: 'Normal pantry rotation'
  },
  {
    id: 3,
    item: 'Rice (Sona Masoori)',
    qty: 40,
    unit: 'kg',
    category: 'Grains',
    expiry: '12 days',
    level: 'success',
    storage: 'Silo 2',
    batchNo: 'BAT-2609-03',
    receivedDate: '15 Sep 2026',
    totalShelfDays: 22,
    daysLeft: 12.0,
    temp: '22.0°C',
    supplier: 'Andhra Millers Syndicate',
    estValue: 2400,
    freshness: 98,
    status: 'active',
    fifoRule: 'Silo 2 batch active'
  },
  {
    id: 7,
    item: 'Toor Dal (Lentils)',
    qty: 25,
    unit: 'kg',
    category: 'Grains',
    expiry: '20 days',
    level: 'success',
    storage: 'Grain Bin 3',
    batchNo: 'BAT-2609-07',
    receivedDate: '18 Sep 2026',
    totalShelfDays: 30,
    daysLeft: 20.0,
    temp: '21.5°C',
    supplier: 'Karnataka Pulses Union',
    estValue: 3750,
    freshness: 96,
    status: 'active',
    fifoRule: 'Safe pantry reserve'
  },
  {
    id: 9,
    item: 'Wheat Atta (Whole Grain)',
    qty: 50,
    unit: 'kg',
    category: 'Grains',
    expiry: '25 days',
    level: 'success',
    storage: 'Silo 1',
    batchNo: 'BAT-2609-09',
    receivedDate: '12 Sep 2026',
    totalShelfDays: 45,
    daysLeft: 25.0,
    temp: '22.0°C',
    supplier: 'Sharbati Flour Mills',
    estValue: 2250,
    freshness: 95,
    status: 'active',
    fifoRule: 'Daily Roti rotation'
  },
  {
    id: 10,
    item: 'Fresh Curd / Yogurt',
    qty: 12,
    unit: 'kg',
    category: 'Dairy',
    expiry: '1 day',
    level: 'warning',
    storage: 'Cold Room 2',
    batchNo: 'BAT-2609-10',
    receivedDate: '24 Sep 2026',
    totalShelfDays: 3,
    daysLeft: 1.0,
    temp: '4.2°C',
    supplier: 'Aavin Dairy Federation',
    estValue: 720,
    freshness: 75,
    status: 'active',
    fifoRule: 'Use for Raita or Chaas today'
  }
];

const normalizeInventory = (rawList) => {
  if (!rawList || !Array.isArray(rawList) || rawList.length === 0) {
    return DEFAULT_INVENTORY;
  }
  return rawList.map((raw, idx) => {
    const fallback =
      DEFAULT_INVENTORY.find(
        (d) =>
          d.id === raw.id ||
          (raw.item && d.item.toLowerCase() === raw.item.toLowerCase())
      ) || {};

    let parsedQty =
      typeof raw.qty === 'number' ? raw.qty : parseFloat(raw.qty);
    if (isNaN(parsedQty)) parsedQty = fallback.qty || 10;

    let parsedUnit = raw.unit || fallback.unit;
    if (!parsedUnit) {
      parsedUnit =
        typeof raw.qty === 'string' && raw.qty.includes('L') ? 'L' : 'kg';
    }

    return {
      id: raw.id || fallback.id || idx + 1,
      item: raw.item || fallback.item || 'Pantry Item',
      qty: parsedQty,
      unit: parsedUnit,
      category: raw.category || fallback.category || 'Vegetables',
      expiry: raw.expiry || fallback.expiry || '3 days',
      level: raw.level || fallback.level || 'warning',
      storage: raw.storage || fallback.storage || 'Walk-in Cooler A',
      batchNo: raw.batchNo || fallback.batchNo || `BAT-2609-0${idx + 1}`,
      receivedDate: raw.receivedDate || fallback.receivedDate || '22 Sep 2026',
      totalShelfDays: raw.totalShelfDays || fallback.totalShelfDays || 4,
      daysLeft:
        raw.daysLeft !== undefined
          ? raw.daysLeft
          : fallback.daysLeft !== undefined
          ? fallback.daysLeft
          : 2,
      temp: raw.temp || fallback.temp || '3.8°C',
      supplier:
        raw.supplier || fallback.supplier || 'Regional Produce Federation',
      estValue:
        raw.estValue || fallback.estValue || Math.round(parsedQty * 45),
      freshness: raw.freshness || fallback.freshness || 80,
      status: raw.status || fallback.status || 'active',
      fifoRule:
        raw.fifoRule || fallback.fifoRule || 'Follow standard kitchen rotation',
    };
  });
};

export default function StockAndExpiry({
  inventoryData,
  onNavigateToPlanner,
  onNavigateHome,
  onUpdateInventory
}) {
  // Main view tab
  const [activeTab, setActiveTab] = useState('inventory-table'); // 'inventory-table' | 'iot-telemetry' | 'fifo-tracker'

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All'); // 'All' | 'critical' | 'warning' | 'safe'
  const [storageFilter, setStorageFilter] = useState('All');
  const [sortBy, setSortBy] = useState('expiry-asc');

  // Normalized items state
  const [items, setItems] = useState(() => normalizeInventory(inventoryData));

  // Sync when prop updates
  useEffect(() => {
    if (inventoryData && inventoryData.length > 0) {
      setItems(normalizeInventory(inventoryData));
    }
  }, [inventoryData]);

  // Selected item for drawer/inspection
  const [selectedItem, setSelectedItem] = useState(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New stock form state
  const [newStock, setNewStock] = useState({
    item: '',
    qty: '',
    unit: 'kg',
    category: 'Vegetables',
    expiry: '3 days',
    level: 'warning',
    storage: 'Walk-in Cooler A',
    supplier: 'Local Market Vendor',
    estValue: '',
  });

  // IoT sensor telemetry chambers
  const storageChambers = [
    {
      id: 'sc-1',
      name: 'Walk-in Cooler A (Vegetables)',
      currentTemp: '3.8°C',
      optimalRange: '2.0°C – 4.0°C',
      humidity: '86%',
      status: 'normal',
      doorEvents: '12 opens today',
      sensorHealth: 'Online (Battery 94%)',
      itemsStored: items.filter((i) => i.storage === 'Walk-in Cooler A').length,
    },
    {
      id: 'sc-2',
      name: 'Cold Room 2 (Dairy & Paneer)',
      currentTemp: '4.8°C',
      optimalRange: '1.0°C – 4.0°C',
      humidity: '74%',
      status: 'warning',
      doorEvents: '28 opens today (Peak Shift)',
      sensorHealth: 'Alert: 0.8°C Above Threshold',
      itemsStored: items.filter((i) => i.storage === 'Cold Room 2').length,
    },
    {
      id: 'sc-3',
      name: 'Crisper Bay (Leafy Greens)',
      currentTemp: '5.8°C',
      optimalRange: '4.0°C – 6.0°C',
      humidity: '92%',
      status: 'normal',
      doorEvents: '8 opens today',
      sensorHealth: 'Online (Moisture High)',
      itemsStored: items.filter((i) => i.storage === 'Crisper Bay').length,
    },
    {
      id: 'sc-4',
      name: 'Fridge 1 (Milk & Liquids)',
      currentTemp: '3.2°C',
      optimalRange: '2.0°C – 4.0°C',
      humidity: '68%',
      status: 'normal',
      doorEvents: '18 opens today',
      sensorHealth: 'Online (Steady)',
      itemsStored: items.filter((i) => i.storage === 'Fridge 1').length,
    },
    {
      id: 'sc-5',
      name: 'Dry Storage A & B (Roots & Staples)',
      currentTemp: '23.2°C',
      optimalRange: '18.0°C – 25.0°C',
      humidity: '42%',
      status: 'normal',
      doorEvents: 'Controlled ventilation',
      sensorHealth: 'Online (Ambient Normal)',
      itemsStored: items.filter((i) => i.storage && i.storage.includes('Dry Storage')).length,
    },
    {
      id: 'sc-6',
      name: 'Grain Silos 1 & 2 (Rice & Flour)',
      currentTemp: '22.0°C',
      optimalRange: '15.0°C – 24.0°C',
      humidity: '11.8% grain moisture',
      status: 'normal',
      doorEvents: 'Airtight sealed vacuum',
      sensorHealth: 'Online (Pest Sensor Cleared)',
      itemsStored: items.filter((i) => i.storage && (i.storage.includes('Silo') || i.storage.includes('Grain Bin'))).length,
    }
  ];

  // Toast trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filter items safely
  const filteredItems = items
    .filter((item) => {
      const q = (searchQuery || '').toLowerCase();
      const matchSearch =
        !q ||
        (item.item || '').toLowerCase().includes(q) ||
        (item.storage || '').toLowerCase().includes(q) ||
        (item.batchNo || '').toLowerCase().includes(q) ||
        (item.supplier || '').toLowerCase().includes(q);

      const matchCategory =
        categoryFilter === 'All' || item.category === categoryFilter;

      const matchStorage =
        storageFilter === 'All' || item.storage === storageFilter;

      const matchUrgency =
        urgencyFilter === 'All' ||
        (urgencyFilter === 'critical' && item.level === 'danger') ||
        (urgencyFilter === 'warning' && item.level === 'warning') ||
        (urgencyFilter === 'safe' && item.level === 'success');

      return matchSearch && matchCategory && matchStorage && matchUrgency;
    })
    .sort((a, b) => {
      if (sortBy === 'expiry-asc') return (a.daysLeft || 0) - (b.daysLeft || 0);
      if (sortBy === 'expiry-desc') return (b.daysLeft || 0) - (a.daysLeft || 0);
      if (sortBy === 'qty-desc') return (b.qty || 0) - (a.qty || 0);
      if (sortBy === 'value-desc') return (b.estValue || 0) - (a.estValue || 0);
      if (sortBy === 'name-asc') return (a.item || '').localeCompare(b.item || '');
      return 0;
    });

  // KPI Calculations
  const criticalCount = items.filter((i) => i.level === 'danger').length;
  const warningCount = items.filter((i) => i.level === 'warning').length;
  const totalValueAtRisk = items
    .filter((i) => i.level === 'danger' || i.level === 'warning')
    .reduce((acc, i) => acc + (i.estValue || 0), 0);
  const totalWeightKg = items.reduce(
    (acc, i) => acc + (i.unit === 'kg' ? i.qty : i.unit === 'L' ? i.qty : 0),
    0
  );

  // Quick Action: Flag item for AI Menu Planner
  const handleFlagForPlanner = (item) => {
    const updated = items.map((i) =>
      i.id === item.id ? { ...i, status: 'flagged_planner' } : i
    );
    setItems(updated);
    onUpdateInventory?.(updated);
    showToast(`⚡ Flagged "${item.item}" to prioritize in AI Menu Planner!`);
    if (onNavigateToPlanner) {
      setTimeout(() => {
        onNavigateToPlanner();
      }, 700);
    }
  };

  // Quick Action: Flag item for NGO Redistribution
  const handleFlagForNgo = (item) => {
    const updated = items.map((i) =>
      i.id === item.id ? { ...i, status: 'flagged_ngo' } : i
    );
    setItems(updated);
    onUpdateInventory?.(updated);
    showToast(`🕊️ Routed ${item.qty} ${item.unit} of ${item.item} to NGO Redistribution Hub!`);
  };

  // Quick Quantity Update (+ / -)
  const handleUpdateQty = (itemId, delta) => {
    const updated = items.map((i) => {
      if (i.id !== itemId) return i;
      const newQty = Math.max(0, i.qty + delta);
      return {
        ...i,
        qty: newQty,
        estValue: Math.round((i.estValue / (i.qty || 1)) * newQty),
      };
    });
    setItems(updated);
    onUpdateInventory?.(updated);
    showToast(`Updated stock count (${delta > 0 ? '+' : ''}${delta})`);
  };

  // Add new stock batch
  const handleAddNewStock = (e) => {
    e.preventDefault();
    if (!newStock.item || !newStock.qty) {
      alert('Please fill in Item Name and Quantity');
      return;
    }

    const created = {
      id: Date.now(),
      item: newStock.item,
      qty: parseFloat(newStock.qty),
      unit: newStock.unit,
      category: newStock.category,
      expiry: newStock.expiry,
      level:
        newStock.expiry.includes('Today') || newStock.expiry.includes('hr')
          ? 'danger'
          : newStock.expiry.includes('1') || newStock.expiry.includes('2')
          ? 'warning'
          : 'success',
      storage: newStock.storage,
      batchNo: `BAT-2609-${Math.floor(10 + Math.random() * 90)}`,
      receivedDate: '25 Sep 2026 (Today)',
      totalShelfDays: 5,
      daysLeft: 3.0,
      temp: '4.0°C',
      supplier: newStock.supplier || 'Local Fresh Produce Hub',
      estValue: parseFloat(newStock.estValue) || Math.round(parseFloat(newStock.qty) * 45),
      freshness: 98,
      status: 'active',
      fifoRule: 'New batch logged into rotation',
    };

    const updated = [created, ...items];
    setItems(updated);
    onUpdateInventory?.(updated);
    setIsAddModalOpen(false);
    setNewStock({
      item: '',
      qty: '',
      unit: 'kg',
      category: 'Vegetables',
      expiry: '3 days',
      level: 'warning',
      storage: 'Walk-in Cooler A',
      supplier: 'Local Market Vendor',
      estValue: '',
    });
    showToast(`✓ Added new batch for "${created.item}" (${created.qty} ${created.unit})`);
  };

  // Barcode scanner simulation trigger
  const handleSimulateScan = () => {
    setIsScannerOpen(true);
    setTimeout(() => {
      const found = items.find((i) => i.id === 6) || items[0];
      setIsScannerOpen(false);
      setSelectedItem(found);
      showToast(`🎯 Barcode Scanned: [${found.batchNo}] ${found.item}`);
    }, 1800);
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
                Kitchen Module • Smart Inventory
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>6 IoT Storage Telemetry Sensors Active</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Stock, Expiry & Thermal Telemetry
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Real-time pantry stock levels, automated FIFO rotation alerts, cold-room temperature telemetry, and zero-waste routing to AI Menu Planner.
            </p>
          </div>

          {/* Quick Header Actions: Add Batch, Scan QR, Plan Menu */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={QrCode}
              onClick={handleSimulateScan}
            >
              Scan Barcode / QR
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddModalOpen(true)}
            >
              Log New Batch
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
          <div
            onClick={() => setUrgencyFilter('critical')}
            className="p-3.5 rounded-xl bg-danger-light/40 border border-danger/30 cursor-pointer hover:bg-danger-light/60 transition-colors"
          >
            <div className="flex items-center justify-between text-danger text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Expiry (Today)</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-danger animate-ping" />
            </div>
            <p className="text-xl md:text-2xl font-black text-danger mt-1">
              {criticalCount} SKUs
            </p>
            <p className="text-[11px] text-danger/80 font-medium">
              Tomatoes & Spinach need cooking
            </p>
          </div>

          <div
            onClick={() => setUrgencyFilter('warning')}
            className="p-3.5 rounded-xl bg-warning-light/40 border border-warning/30 cursor-pointer hover:bg-warning-light/60 transition-colors"
          >
            <div className="flex items-center justify-between text-warning text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Warning (1–2 Days)</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-warning mt-1">
              {warningCount} SKUs
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              Milk, Paneer & Curd in cold chain
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-brand" />
                <span>Total Active Pantry</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              {totalWeightKg} kg / L
            </p>
            <p className="text-[11px] text-content-secondary">
              Across {items.length} logged batches
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>Value at Expiry Risk</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              ₹{totalValueAtRisk.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-success font-medium">
              Target: 0% write-off via AI Plan
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-divider pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inventory-table')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inventory-table'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Active Stock Roster ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('iot-telemetry')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'iot-telemetry'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>IoT Cold Room Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('fifo-tracker')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'fifo-tracker'
                ? 'bg-brand text-white shadow-sm'
                : 'bg-slate-100 text-content-secondary hover:text-content-primary hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>FIFO Shelf-Life Aging Flow</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE STOCK ROSTER & EXPIRY COUNTDOWN */}
      {activeTab === 'inventory-table' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-surface rounded-card p-4 md:p-5 shadow-soft border border-divider/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
              <input
                type="text"
                placeholder="Search by ingredient, batch ID, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-divider bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>

            {/* Quick Filter Selectors */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Grains">Grains & Pulses</option>
              </select>

              {/* Urgency */}
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium"
              >
                <option value="All">All Expiry Windows</option>
                <option value="critical">🚨 Critical (Today)</option>
                <option value="warning">⚠️ Warning (1–2 Days)</option>
                <option value="safe">✅ Safe (&gt; 3 Days)</option>
              </select>

              {/* Storage */}
              <select
                value={storageFilter}
                onChange={(e) => setStorageFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium hidden sm:block"
              >
                <option value="All">All Storage Zones</option>
                <option value="Walk-in Cooler A">Walk-in Cooler A</option>
                <option value="Cold Room 2">Cold Room 2</option>
                <option value="Crisper Bay">Crisper Bay</option>
                <option value="Fridge 1">Fridge 1</option>
                <option value="Dry Storage A">Dry Storage A</option>
                <option value="Dry Storage B">Dry Storage B</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-divider bg-slate-50 font-medium"
              >
                <option value="expiry-asc">Expiry: Earliest First</option>
                <option value="qty-desc">Quantity: High to Low</option>
                <option value="value-desc">Value: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Stock Table */}
          <div className="bg-surface rounded-card shadow-soft border border-divider/70 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-divider text-content-muted uppercase font-bold text-[11px]">
                    <th className="py-3.5 px-4">Ingredient & Batch</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Current Stock</th>
                    <th className="py-3.5 px-4">Storage Chamber</th>
                    <th className="py-3.5 px-4">Expiry Countdown</th>
                    <th className="py-3.5 px-4">Est. Value</th>
                    <th className="py-3.5 px-4 text-right">Zero-Waste Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider/60">
                  {filteredItems.map((item) => {
                    const isCritical = item.level === 'danger';
                    const isWarning = item.level === 'warning';

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-slate-50/70 ${
                          isCritical
                            ? 'bg-danger-light/10'
                            : isWarning
                            ? 'bg-warning-light/10'
                            : ''
                        }`}
                      >
                        {/* Ingredient & Batch */}
                        <td className="py-3.5 px-4">
                          <div
                            onClick={() => setSelectedItem(item)}
                            className="cursor-pointer group"
                          >
                            <span className="font-bold text-sm text-content-primary group-hover:text-brand flex items-center gap-1.5">
                              {item.item}
                              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-content-secondary mt-0.5">
                              <span className="font-mono bg-slate-100 px-1 rounded">
                                {item.batchNo}
                              </span>
                              <span>• Recv: {item.receivedDate}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-content-secondary font-medium">
                            {item.category}
                          </span>
                        </td>

                        {/* Quantity with quick +/- stepper */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-content-primary text-sm">
                              {item.qty} {item.unit}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={() => handleUpdateQty(item.id, -1)}
                                title="Deduct 1 unit (used in prep)"
                                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-content-primary flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleUpdateQty(item.id, 1)}
                                title="Add 1 unit"
                                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-content-primary flex items-center justify-center font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Storage Location & Sensor */}
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-medium text-content-primary block">
                              {item.storage}
                            </span>
                            <span className="text-[11px] text-content-muted flex items-center gap-1 mt-0.5">
                              <Thermometer className="w-3 h-3 text-brand" />
                              {item.temp}
                            </span>
                          </div>
                        </td>

                        {/* Expiry Countdown */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <StatusPill
                              text={item.expiry}
                              level={item.level}
                              dot={true}
                              size="sm"
                            />
                            {item.status === 'flagged_planner' && (
                              <span className="block text-[10px] font-bold text-brand">
                                ⚡ Sent to AI Planner
                              </span>
                            )}
                            {item.status === 'flagged_ngo' && (
                              <span className="block text-[10px] font-bold text-info">
                                🕊️ Routed to NGO
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Est. Value */}
                        <td className="py-3.5 px-4 font-bold text-content-primary">
                          ₹{item.estValue?.toLocaleString('en-IN') || 0}
                        </td>

                        {/* Zero-Waste Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Route to AI Menu Planner */}
                            <button
                              onClick={() => handleFlagForPlanner(item)}
                              title="Cook with this ingredient in AI Menu Planner"
                              className="px-2.5 py-1.5 rounded-lg bg-brand-light text-brand hover:bg-brand hover:text-white transition-all text-xs font-semibold flex items-center gap-1 shadow-xs"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Cook in AI Menu</span>
                            </button>

                            {/* Route to NGO Surplus */}
                            {(isCritical || isWarning) && (
                              <button
                                onClick={() => handleFlagForNgo(item)}
                                title="Flag clean batch to NGO Redistribution Hub"
                                className="px-2 py-1.5 rounded-lg bg-info-light text-info hover:bg-info hover:text-white transition-all text-xs font-semibold"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* View Details */}
                            <button
                              onClick={() => setSelectedItem(item)}
                              title="View Provenance & Temperature Log"
                              className="p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-slate-100"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-content-secondary">
                <Package className="w-10 h-10 text-content-muted mx-auto mb-2 opacity-50" />
                <p className="font-semibold text-sm">No inventory items matched your filter</p>
                <p className="text-xs text-content-muted mt-1">
                  Try clearing your search query or reset the urgency filter.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: IOT COLD ROOM TELEMETRY */}
      {activeTab === 'iot-telemetry' && (
        <div className="space-y-5 animate-fadeIn">
          <SectionHeader
            icon={Thermometer}
            title="IoT Smart Cold Chain Chambers"
            subtitle="Automated thermal monitoring across Mess A walk-ins, freezers, and dry storage silos"
            actions={
              <Button
                variant="secondary"
                size="sm"
                icon={RefreshCw}
                onClick={() => showToast('Pulled latest sensor telemetry packet (Just Now)')}
              >
                Refresh Telemetry
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storageChambers.map((chamber) => (
              <div
                key={chamber.id}
                className="bg-surface rounded-card p-5 shadow-soft border border-divider/70 space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-content-primary">
                      {chamber.name}
                    </h4>
                    <p className="text-xs text-content-secondary mt-0.5">
                      Target Range: {chamber.optimalRange}
                    </p>
                  </div>

                  <StatusPill
                    text={chamber.status === 'warning' ? 'Alert ⚠️' : 'Optimal'}
                    level={chamber.status === 'warning' ? 'warning' : 'success'}
                    size="sm"
                    dot={true}
                  />
                </div>

                {/* Big Temp Metric */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-divider flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                      Current Probe Temp
                    </span>
                    <p className="text-2xl font-black text-content-primary">
                      {chamber.currentTemp}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                      Humidity
                    </span>
                    <p className="text-lg font-bold text-content-primary">
                      {chamber.humidity}
                    </p>
                  </div>
                </div>

                {/* Additional Sensor Specs */}
                <div className="space-y-1.5 text-xs text-content-secondary pt-1">
                  <div className="flex justify-between">
                    <span>Door Access Events:</span>
                    <span className="font-semibold text-content-primary">
                      {chamber.doorEvents}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory Batches Inside:</span>
                    <span className="font-semibold text-content-primary">
                      {chamber.itemsStored} Batches
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-divider text-[11px]">
                    <span>Telemetry Health:</span>
                    <span
                      className={`font-semibold ${
                        chamber.status === 'warning'
                          ? 'text-warning'
                          : 'text-success'
                      }`}
                    >
                      {chamber.sensorHealth}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FIFO SHELF-LIFE AGING FLOW */}
      {activeTab === 'fifo-tracker' && (
        <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider space-y-6 animate-fadeIn">
          <SectionHeader
            icon={Layers}
            title="FIFO (First-In, First-Out) Compliance & Shelf-Life Aging"
            subtitle="Ensuring older batches are consumed prior to opening newly received deliveries"
          />

          <div className="space-y-4">
            {items
              .filter((i) => i.level === 'danger' || i.level === 'warning')
              .map((item) => {
                const totalDays = item.totalShelfDays || 4;
                const daysLeft = item.daysLeft !== undefined ? item.daysLeft : 2;
                const percentRemaining = Math.max(
                  5,
                  Math.min(100, Math.round((daysLeft / totalDays) * 100))
                );

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-divider bg-slate-50/70 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-content-primary">
                            {item.item}
                          </span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-divider text-content-secondary">
                            {item.batchNo}
                          </span>
                          <StatusPill
                            text={item.expiry}
                            level={item.level}
                            size="sm"
                          />
                        </div>
                        <p className="text-xs text-content-secondary mt-1">
                          Received on <strong>{item.receivedDate}</strong> from{' '}
                          <strong>{item.supplier}</strong> • Stock:{' '}
                          <strong>
                            {item.qty} {item.unit}
                          </strong>
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="primary"
                        icon={Sparkles}
                        onClick={() => handleFlagForPlanner(item)}
                      >
                        Cook in AI Planner
                      </Button>
                    </div>

                    {/* Progress Bar of Shelf Life */}
                    <div>
                      <div className="flex justify-between text-xs text-content-secondary mb-1">
                        <span>Shelf-Life Depletion Timeline</span>
                        <span className="font-bold text-content-primary">
                          {percentRemaining}% freshness margin remaining
                        </span>
                      </div>
                      <ProgressBar
                        value={percentRemaining}
                        max={100}
                        color={item.level === 'danger' ? 'danger' : 'warning'}
                        size="sm"
                        showLabel={false}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-content-secondary pt-1 border-t border-divider">
                      <span className="font-semibold text-brand">
                        📋 FIFO Directive: {item.fifoRule}
                      </span>
                      <span>
                        Estimated procurement cost at risk: ₹{item.estValue}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* DRAWER / MODAL: ITEM PROVENANCE & DETAIL INSPECTOR */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <h3 className="font-bold text-base text-content-primary flex items-center gap-2">
                  {selectedItem.item}
                  <StatusPill
                    text={selectedItem.expiry}
                    level={selectedItem.level}
                    size="sm"
                  />
                </h3>
                <p className="text-xs text-content-secondary">
                  Batch Code: <span className="font-mono">{selectedItem.batchNo}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50">
                <div>
                  <span className="text-content-muted block text-[10px]">Current Quantity</span>
                  <span className="font-bold text-content-primary text-sm">
                    {selectedItem.qty} {selectedItem.unit}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block text-[10px]">Storage Chamber</span>
                  <span className="font-bold text-content-primary text-sm">
                    {selectedItem.storage}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block text-[10px]">Probe Temp</span>
                  <span className="font-bold text-content-primary text-sm">
                    {selectedItem.temp}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block text-[10px]">Financial Value</span>
                  <span className="font-bold text-content-primary text-sm">
                    ₹{selectedItem.estValue}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-content-secondary block mb-1">
                  Supplier / Provenance
                </span>
                <p className="text-content-primary font-medium">
                  {selectedItem.supplier} (Delivered {selectedItem.receivedDate})
                </p>
              </div>

              <div>
                <span className="font-semibold text-content-secondary block mb-1">
                  Computer Vision Freshness Score
                </span>
                <ProgressBar
                  value={selectedItem.freshness || 80}
                  max={100}
                  color={(selectedItem.freshness || 80) < 60 ? 'danger' : 'success'}
                  size="sm"
                  labelLeft="Camera Sensor Quality"
                  labelRight={`${selectedItem.freshness || 80}% Fresh`}
                />
              </div>

              <div>
                <span className="font-semibold text-content-secondary block mb-1">
                  FIFO Priority Rule
                </span>
                <p className="text-content-primary font-medium bg-brand-light/60 p-2.5 rounded-lg border border-brand/20">
                  {selectedItem.fifoRule}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                icon={Sparkles}
                onClick={() => {
                  handleFlagForPlanner(selectedItem);
                  setSelectedItem(null);
                }}
              >
                Cook in AI Planner
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LOG NEW INVENTORY BATCH */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <h3 className="font-bold text-base text-content-primary">
                Log New Inventory Batch
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewStock} className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cauliflower / Bell Peppers / Paneer"
                  required
                  value={newStock.item}
                  onChange={(e) => setNewStock({ ...newStock, item: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 20"
                    required
                    value={newStock.qty}
                    onChange={(e) => setNewStock({ ...newStock, qty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Unit
                  </label>
                  <select
                    value={newStock.unit}
                    onChange={(e) => setNewStock({ ...newStock, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="L">Liters (L)</option>
                    <option value="crates">Crates</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Category
                  </label>
                  <select
                    value={newStock.category}
                    onChange={(e) => setNewStock({ ...newStock, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Grains">Grains & Pulses</option>
                    <option value="Bakery">Bakery & Snacks</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Storage Chamber
                  </label>
                  <select
                    value={newStock.storage}
                    onChange={(e) => setNewStock({ ...newStock, storage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option value="Walk-in Cooler A">Walk-in Cooler A</option>
                    <option value="Cold Room 2">Cold Room 2</option>
                    <option value="Crisper Bay">Crisper Bay</option>
                    <option value="Fridge 1">Fridge 1</option>
                    <option value="Dry Storage A">Dry Storage A</option>
                    <option value="Dry Storage B">Dry Storage B</option>
                    <option value="Silo 1">Silo 1</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Expiry Window
                  </label>
                  <select
                    value={newStock.expiry}
                    onChange={(e) => setNewStock({ ...newStock, expiry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50"
                  >
                    <option value="Today (8 hrs)">Today (8 hrs)</option>
                    <option value="Tomorrow (24 hrs)">Tomorrow (24 hrs)</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="10 days">10 days</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-content-secondary block mb-1">
                    Est. Total Cost (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 800"
                    value={newStock.estValue}
                    onChange={(e) => setNewStock({ ...newStock, estValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-content-secondary block mb-1">
                  Supplier / Vendor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. FreshFarms Local Mandi"
                  value={newStock.supplier}
                  onChange={(e) => setNewStock({ ...newStock, supplier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-divider">
                <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save & Log Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCANNER MODAL SIMULATION */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-6 text-center shadow-soft-lg border border-divider space-y-4 animate-scaleUp">
            <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-brand rounded-2xl flex items-center justify-center bg-slate-950 overflow-hidden">
              <QrCode className="w-20 h-20 text-brand animate-pulse" />
              <div className="absolute inset-x-0 h-0.5 bg-danger animate-bounce" />
            </div>

            <div>
              <h3 className="font-bold text-base text-content-primary">
                Scanning Pantry QR / Barcode...
              </h3>
              <p className="text-xs text-content-secondary mt-1">
                Align crate barcode within target camera viewfinder
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
