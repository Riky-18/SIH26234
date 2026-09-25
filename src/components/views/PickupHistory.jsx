import React, { useState } from 'react';
import {
  History,
  Building,
  HeartHandshake,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Search,
  Filter,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  ChevronRight,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Eye,
  X,
  AlertTriangle,
  QrCode,
  Check,
  Scale,
  Utensils
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import Button from '../common/Button';

export default function PickupHistory({
  ngoData,
  onNavigateHome,
  onNavigateToMap
}) {
  // Comprehensive Initial Historical Pickups
  const initialHistory = [
    {
      id: 'PKP-8921',
      date: '24 Sep 2026',
      time: '5:45 PM',
      kitchen: 'BIT Hostel Mess A',
      kitchenLocation: 'North Campus, Gate 2 Loading Bay',
      kitchenContact: '+91 98421 55601 (Chef Raman)',
      recipient: 'Hope Children Home',
      recipientAddress: 'Sector 4 Community Wing, South Ext.',
      recipientContact: '+91 94432 11098 (Sister Mary)',
      items: 'Mixed Veg Rice, Sambar, Cabbage Poriyal & Chapatis',
      qty: '22 kg',
      qtyNum: 22,
      meals: '55 meals',
      vehicle: 'Transit Van #1 (KA-05-MN-2201)',
      driver: 'Karthik S.',
      driverPhone: '+91 99012 34567',
      status: 'Delivered',
      pickupTemp: '68.5°C',
      deliveryTemp: '64.2°C',
      otp: '4829',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0921',
      dietType: 'Vegetarian',
      packaging: '3x Sealed Stainless Insulated Canisters',
      notes: 'Picked up within 25 mins of alert. Temperature maintained above 60°C hot-holding threshold.'
    },
    {
      id: 'PKP-8920',
      date: '23 Sep 2026',
      time: '6:15 PM',
      kitchen: 'City General Hospital Canteen',
      kitchenLocation: 'Main Medical Wing, B1 Dining Hall',
      kitchenContact: '+91 97890 22314 (Anita K.)',
      recipient: 'Rainbow Senior Citizens Care',
      recipientAddress: '7th Cross, Gandhi Road Old Age Shelter',
      recipientContact: '+91 98840 22331 (Dr. Venkat)',
      items: 'Soft Chapatis, Moong Dal Khichdi & Steamed Veggies',
      qty: '18 kg',
      qtyNum: 18,
      meals: '45 meals',
      vehicle: 'Eco-Rikshaw #2 (Electric)',
      driver: 'Ramesh K.',
      driverPhone: '+91 98401 98765',
      status: 'Delivered',
      pickupTemp: '66.0°C',
      deliveryTemp: '62.8°C',
      otp: '3194',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0920',
      dietType: 'Mild Diabetic/Senior Friendly',
      packaging: '4x Food-Grade Catering Trays',
      notes: 'Low spice, diabetic-friendly portions served directly to 45 resident seniors.'
    },
    {
      id: 'PKP-8919',
      date: '22 Sep 2026',
      time: '7:30 PM',
      kitchen: 'Green Valley Catering Hall 4',
      kitchenLocation: 'Industrial Estate Banquet Pavilion',
      kitchenContact: '+91 99941 87654 (Suresh B.)',
      recipient: 'Slum Children Evening Care Hub',
      recipientAddress: 'Railway Gate Settlement Center',
      recipientContact: '+91 97910 44556 (Brother Joseph)',
      items: 'Vegetable Dum Biryani, Mirchi Ka Salan & Raitha',
      qty: '34 kg',
      qtyNum: 34,
      meals: '85 meals',
      vehicle: 'Cargo Van #3 (Refrigerated)',
      driver: 'Suresh Babu',
      driverPhone: '+91 97891 12345',
      status: 'Delivered',
      pickupTemp: '71.2°C',
      deliveryTemp: '66.5°C',
      otp: '7721',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0919',
      dietType: 'Vegetarian',
      packaging: '5x Bulk Insulated Food Drums',
      notes: 'Wedding banquet surplus packed immediately after function dinner ended.'
    },
    {
      id: 'PKP-8918',
      date: '21 Sep 2026',
      time: '3:00 PM',
      kitchen: 'Sathy College Canteen',
      kitchenLocation: 'Student Union Hub, Ground Floor',
      kitchenContact: '+91 94422 66781 (Murugan C.)',
      recipient: 'Shelter of Grace Night Refuge',
      recipientAddress: 'Near Central Bus Terminus',
      recipientContact: '+91 94430 88990 (Pastor Thomas)',
      items: 'Idli, Medu Vada & Coconut Chutney',
      qty: '14 kg',
      qtyNum: 14,
      meals: '35 meals',
      vehicle: 'Transit Van #1 (KA-05-MN-2201)',
      driver: 'Karthik S.',
      driverPhone: '+91 99012 34567',
      status: 'Delivered',
      pickupTemp: '65.0°C',
      deliveryTemp: '61.4°C',
      otp: '1832',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0918',
      dietType: 'Breakfast/Snack',
      packaging: '2x Thermal Insulated Boxes',
      notes: 'Breakfast excess collected and served as high-protein afternoon refreshments.'
    },
    {
      id: 'PKP-8917',
      date: '20 Sep 2026',
      time: '6:40 PM',
      kitchen: 'Apex IT Park Cafeteria',
      kitchenLocation: 'Tower B Dining Concourse',
      kitchenContact: '+91 98402 11092 (Deepak R.)',
      recipient: 'Hope Children Home',
      recipientAddress: 'Sector 4 Community Wing, South Ext.',
      recipientContact: '+91 94432 11098 (Sister Mary)',
      items: 'Paneer Butter Masala, Jeera Rice & Phulkas',
      qty: '20 kg',
      qtyNum: 20,
      meals: '50 meals',
      vehicle: 'Eco-Rikshaw #2 (Electric)',
      driver: 'Ramesh K.',
      driverPhone: '+91 98401 98765',
      status: 'Delivered',
      pickupTemp: '67.8°C',
      deliveryTemp: '63.5°C',
      otp: '9014',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0917',
      dietType: 'Vegetarian',
      packaging: '3x Sealed Stainless Containers',
      notes: 'Corporate cafeteria dinner buffet surplus collected under sealed custody.'
    },
    {
      id: 'PKP-8916',
      date: '19 Sep 2026',
      time: '5:50 PM',
      kitchen: 'BIT Hostel Mess B',
      kitchenLocation: 'South Campus Dining Hall',
      kitchenContact: '+91 98421 77889 (Chef Selvam)',
      recipient: 'Migrant Workers Welfare Colony',
      recipientAddress: 'Construction Site B, Ring Road bypass',
      recipientContact: '+91 93450 12390 (Site Rep Mohan)',
      items: 'Tomato Rice, Dal Fry, Potato Roast & Curd Rice',
      qty: '26 kg',
      qtyNum: 26,
      meals: '65 meals',
      vehicle: 'Cargo Van #3 (Refrigerated)',
      driver: 'Suresh Babu',
      driverPhone: '+91 97891 12345',
      status: 'Delivered',
      pickupTemp: '69.0°C',
      deliveryTemp: '65.1°C',
      otp: '6540',
      fssaiCert: 'FSSAI-SURPLUS-PASS-2026-0916',
      dietType: 'Vegetarian',
      packaging: '4x Insulated Catering Vessels',
      notes: 'All batches inspected with digital laser infrared thermometer prior to loading.'
    }
  ];

  const [historyList, setHistoryList] = useState(initialHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Delivered' | 'In Transit'
  const [sourceFilter, setSourceFilter] = useState('All');
  const [recipientFilter, setRecipientFilter] = useState('All');

  // Modals
  const [selectedAuditItem, setSelectedAuditItem] = useState(null);
  const [printSlipItem, setPrintSlipItem] = useState(null);
  const [newLogModalOpen, setNewLogModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form for Manual Offline Donation
  const [newLogForm, setNewLogForm] = useState({
    kitchen: 'BIT Hostel Mess A',
    recipient: 'Hope Children Home',
    items: '',
    qty: '',
    driver: 'Karthik S.',
    vehicle: 'Transit Van #1 (KA-05-MN-2201)',
    temp: '68.0°C',
    notes: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered List
  const filteredList = historyList.filter((item) => {
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchSource = sourceFilter === 'All' || item.kitchen.includes(sourceFilter);
    const matchRecipient = recipientFilter === 'All' || item.recipient.includes(recipientFilter);

    const matchSearch =
      !searchQuery ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kitchen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSource && matchRecipient && matchSearch;
  });

  // Calculate Cumulative KPIs
  const totalWeightKg = historyList.reduce((acc, curr) => acc + curr.qtyNum, 0);
  const totalMeals = Math.round(totalWeightKg * 2.5);
  const totalSheltersServed = new Set(historyList.map((h) => h.recipient)).size;

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = 'Pickup ID,Date,Time,Source Kitchen,Recipient Shelter,Items,Weight (kg),Servings,Driver,Vehicle,Pickup Temp,Delivery Temp,OTP,FSSAI Reference\n';
    const rows = filteredList
      .map(
        (h) =>
          `"${h.id}","${h.date}","${h.time}","${h.kitchen}","${h.recipient}","${h.items.replace(/"/g, '""')}","${h.qty}","${h.meals}","${h.driver}","${h.vehicle}","${h.pickupTemp}","${h.deliveryTemp}","${h.otp}","${h.fssaiCert}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `foodloop_pickup_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Successfully exported Pickup History CSV!');
  };

  // Handle Manual Log Submission
  const handleSaveManualLog = (e) => {
    e.preventDefault();
    if (!newLogForm.items || !newLogForm.qty) {
      showToast('⚠️ Please enter food items and quantity weight.');
      return;
    }

    const weightNum = parseFloat(newLogForm.qty) || 10;
    const newEntry = {
      id: `PKP-${Math.floor(8922 + Math.random() * 500)}`,
      date: 'Today (Manual Log)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      kitchen: newLogForm.kitchen,
      kitchenLocation: 'Loading Bay Zone',
      kitchenContact: '+91 98421 00000',
      recipient: newLogForm.recipient,
      recipientAddress: 'Community Center',
      recipientContact: '+91 94432 00000',
      items: newLogForm.items,
      qty: `${weightNum} kg`,
      qtyNum: weightNum,
      meals: `${Math.round(weightNum * 2.5)} meals`,
      vehicle: newLogForm.vehicle,
      driver: newLogForm.driver,
      driverPhone: '+91 99012 34567',
      status: 'Delivered',
      pickupTemp: newLogForm.temp || '67.0°C',
      deliveryTemp: '63.5°C',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      fssaiCert: `FSSAI-SURPLUS-PASS-${Date.now().toString().slice(-6)}`,
      dietType: 'Standard Cooked',
      packaging: 'Food Grade Stainless Vessels',
      notes: newLogForm.notes || 'Manually logged offline donation handover.'
    };

    setHistoryList([newEntry, ...historyList]);
    setNewLogModalOpen(false);
    setNewLogForm({
      kitchen: 'BIT Hostel Mess A',
      recipient: 'Hope Children Home',
      items: '',
      qty: '',
      driver: 'Karthik S.',
      vehicle: 'Transit Van #1 (KA-05-MN-2201)',
      temp: '68.0°C',
      notes: ''
    });
    showToast(`✓ New Pickup ${newEntry.id} recorded with verified FSSAI manifest!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-soft-lg border border-slate-700 animate-slideUp">
          <Sparkles className="w-4 h-4 text-brand-light" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-info-light text-info uppercase tracking-wider">
                NGO Coordinator • Custody Audit
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Handover Chain Active (FSSAI Safe Food)</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Surplus Food Pickup & Custody History
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Complete historical ledger of all institutional kitchen food pickups, driver telemetry, temperature safe-holding logs, and digital recipient shelter sign-offs.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            <Button
              variant="secondary"
              size="sm"
              icon={PlusCircle}
              onClick={() => setNewLogModalOpen(true)}
            >
              Log Offline Pickup
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={MapPin}
              onClick={onNavigateToMap}
            >
              Open Live Surplus Map
            </Button>
          </div>
        </div>

        {/* 4 Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5 pt-5 border-t border-divider">
          <div className="p-3.5 rounded-xl bg-info-light/40 border border-info/30">
            <div className="flex items-center justify-between text-info text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Total Completed Pickups</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-info" />
            </div>
            <p className="text-xl md:text-2xl font-black text-info mt-1">
              {historyList.length} Pickups
            </p>
            <p className="text-[11px] text-content-secondary font-medium">
              100% successful handovers
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Total Weight Rescued</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-emerald-700 mt-1">
              {totalWeightKg} kg
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              ~{totalMeals} nutritious meals served
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                <span>Thermal Chain Compliance</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              99.6% Pass
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              HACCP hot-holding &gt;60°C verified
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-brand" />
                <span>Shelters Supported</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              {totalSheltersServed} Shelters
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Daily scheduled drop-offs
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-divider">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by pickup ID, kitchen, shelter, driver, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-divider text-xs focus:outline-none focus:border-brand bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-content-muted" />
              <span className="text-xs text-content-muted">Source:</span>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-divider bg-white text-content-primary font-medium focus:outline-none"
              >
                <option value="All">All Donors</option>
                <option value="BIT Hostel">BIT Hostel Mess</option>
                <option value="City General">City General Hospital</option>
                <option value="Green Valley">Green Valley Catering</option>
                <option value="Sathy College">Sathy College</option>
                <option value="Apex IT">Apex IT Park</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-content-muted">Shelter:</span>
              <select
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-divider bg-white text-content-primary font-medium focus:outline-none"
              >
                <option value="All">All Shelters</option>
                <option value="Hope Children">Hope Children Home</option>
                <option value="Rainbow Senior">Rainbow Senior Care</option>
                <option value="Slum Children">Slum Children Hub</option>
                <option value="Shelter of Grace">Shelter of Grace</option>
                <option value="Migrant Workers">Migrant Welfare</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table / Cards View */}
      <div className="bg-surface rounded-card shadow-soft border border-divider overflow-hidden">
        <div className="p-4 md:p-5 border-b border-divider flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-brand" />
            <h3 className="font-extrabold text-base text-content-primary">
              Completed Handover Manifests ({filteredList.length})
            </h3>
          </div>
          <span className="text-xs text-content-muted font-medium">
            Showing verified deliveries with digital OTP sign-offs
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-divider text-content-secondary font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Source Kitchen</th>
                <th className="py-3 px-4">Recipient Shelter</th>
                <th className="py-3 px-4">Rescued Food Batch</th>
                <th className="py-3 px-4">Thermal Log</th>
                <th className="py-3 px-4">Driver & Fleet</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Receipt ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-brand block">
                      {item.id}
                    </span>
                    <span className="text-[10px] text-content-muted">
                      OTP: {item.otp}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-content-primary block">
                      {item.date}
                    </span>
                    <span className="text-[11px] text-content-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3 text-content-muted" />
                      {item.time}
                    </span>
                  </td>

                  {/* Source Kitchen */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-1.5">
                      <Building className="w-3.5 h-3.5 text-content-muted shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-content-primary block">
                          {item.kitchen}
                        </span>
                        <span className="text-[11px] text-content-muted truncate max-w-[140px] block">
                          {item.kitchenLocation}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Recipient Shelter */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-800 block">
                          {item.recipient}
                        </span>
                        <span className="text-[11px] text-content-muted truncate max-w-[140px] block">
                          {item.recipientAddress}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Rescued Batch */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-brand">
                          {item.qty}
                        </span>
                        <span className="text-[11px] font-semibold text-content-secondary">
                          ({item.meals})
                        </span>
                      </div>
                      <span className="text-[11px] text-content-secondary truncate max-w-[180px] block">
                        {item.items}
                      </span>
                    </div>
                  </td>

                  {/* Thermal Log */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pick: {item.pickupTemp}</span>
                      </div>
                      <div className="text-[10px] text-content-muted pl-4">
                        Drop: {item.deliveryTemp}
                      </div>
                    </div>
                  </td>

                  {/* Driver & Vehicle */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-content-primary block">
                      {item.driver}
                    </span>
                    <span className="text-[11px] text-content-muted truncate max-w-[120px] block">
                      {item.vehicle.split('(')[0]}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Delivered
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedAuditItem(item)}
                        className="p-1.5 rounded-lg border border-divider hover:bg-slate-100 text-content-secondary hover:text-brand transition-colors"
                        title="View Custody Audit Trail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setPrintSlipItem(item)}
                        className="p-1.5 rounded-lg border border-divider hover:bg-slate-100 text-content-secondary hover:text-brand transition-colors"
                        title="Print FSSAI Handover Slip"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredList.length === 0 && (
          <div className="p-8 text-center text-content-muted">
            <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-bold text-sm text-content-primary">No Matching Pickups Found</p>
            <p className="text-xs mt-1">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* MODAL 1: CHAIN OF CUSTODY AUDIT TRAIL */}
      {selectedAuditItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-xl w-full p-6 shadow-soft-lg border border-divider animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-brand">
                    {selectedAuditItem.id}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Custody Verified
                  </span>
                </div>
                <p className="text-xs text-content-secondary mt-0.5">
                  FSSAI Food Recovery Regulation 2019 • Automated Audit Trail
                </p>
              </div>
              <button
                onClick={() => setSelectedAuditItem(null)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Key Transfer Overview */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-divider">
                <div>
                  <span className="text-content-muted text-[10px] block uppercase font-bold">Donor Facility</span>
                  <span className="font-bold text-content-primary text-sm block mt-0.5">{selectedAuditItem.kitchen}</span>
                  <span className="text-content-secondary">{selectedAuditItem.kitchenContact}</span>
                </div>
                <div>
                  <span className="text-content-muted text-[10px] block uppercase font-bold">Beneficiary Shelter</span>
                  <span className="font-bold text-emerald-700 text-sm block mt-0.5">{selectedAuditItem.recipient}</span>
                  <span className="text-content-secondary">{selectedAuditItem.recipientContact}</span>
                </div>
              </div>

              {/* Food Specifications */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-divider space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-content-primary">Consignment Specifications</span>
                  <span className="font-bold text-brand">{selectedAuditItem.qty} ({selectedAuditItem.meals})</span>
                </div>
                <p className="text-content-secondary">{selectedAuditItem.items}</p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-divider/60 text-[11px]">
                  <div>
                    <span className="text-content-muted block text-[10px]">Dietary Class</span>
                    <span className="font-semibold text-content-primary">{selectedAuditItem.dietType}</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">Thermal Packaging</span>
                    <span className="font-semibold text-content-primary">{selectedAuditItem.packaging}</span>
                  </div>
                  <div>
                    <span className="text-content-muted block text-[10px]">OTP Auth Code</span>
                    <span className="font-mono font-bold text-emerald-700">{selectedAuditItem.otp}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Chain of Custody Timeline */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-content-secondary uppercase tracking-wider text-[11px] block">
                  Verified Timestamp Audit Log
                </span>

                <div className="relative pl-6 space-y-4 border-l-2 border-emerald-500/30 ml-2">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-400" />
                    <span className="text-[10px] font-bold text-content-muted block">{selectedAuditItem.date} • {selectedAuditItem.time}</span>
                    <span className="font-bold text-content-primary block">Surplus Declared & Quality Tested</span>
                    <p className="text-content-secondary text-[11px] mt-0.5">
                      Chef verified temperature at {selectedAuditItem.pickupTemp}. Sensor probe calibrated under HACCP.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-400" />
                    <span className="text-[10px] font-bold text-content-muted block">+12 mins</span>
                    <span className="font-bold text-content-primary block">Fleet Driver Custody Acceptance</span>
                    <p className="text-content-secondary text-[11px] mt-0.5">
                      Driver {selectedAuditItem.driver} validated OTP {selectedAuditItem.otp} at {selectedAuditItem.kitchenLocation}.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-400" />
                    <span className="text-[10px] font-bold text-content-muted block">+28 mins</span>
                    <span className="font-bold text-content-primary block">Direct Shelter Handover Completed</span>
                    <p className="text-content-secondary text-[11px] mt-0.5">
                      Received at {selectedAuditItem.recipient}. Arrival temp {selectedAuditItem.deliveryTemp} (Safe hot-holding preserved). Digital signature collected.
                    </p>
                  </div>
                </div>
              </div>

              {/* FSSAI Regulatory Reference */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-emerald-900 block">FSSAI Reference Manifest</span>
                    <span className="font-mono text-emerald-700">{selectedAuditItem.fssaiCert}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedAuditItem(null);
                    setPrintSlipItem(selectedAuditItem);
                  }}
                  className="px-2.5 py-1 rounded bg-white text-emerald-800 font-bold border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1"
                >
                  <Printer className="w-3 h-3" />
                  Print Slip
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-divider">
              <Button variant="secondary" onClick={() => setSelectedAuditItem(null)}>
                Close Audit View
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE OFFICIAL FSSAI TRANSFER SLIP */}
      {printSlipItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-divider animate-scaleUp max-h-[92vh] overflow-y-auto">
            {/* Header with Print & Close controls */}
            <div className="flex items-center justify-between pb-4 border-b border-divider print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-base text-content-primary">
                  Official FSSAI Surplus Food Manifest Slip
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print Document
                </Button>
                <button
                  onClick={() => setPrintSlipItem(null)}
                  className="text-content-secondary hover:text-content-primary p-1.5 rounded-lg border border-divider"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body Formatted for Print */}
            <div className="py-6 space-y-6 text-slate-800 font-sans print:p-0">
              {/* Form Title & Legal Header */}
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  Food Safety & Standards Authority of India (FSSAI)
                </h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                  Surplus Food Recovery & Distribution Transfer Manifest (Form G)
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Compliant with Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations, 2019
                </p>
              </div>

              {/* Manifest Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Manifest ID</span>
                  <span className="font-mono font-bold text-slate-900">{printSlipItem.id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Dispatch Date</span>
                  <span className="font-bold text-slate-900">{printSlipItem.date} {printSlipItem.time}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Digital OTP</span>
                  <span className="font-mono font-bold text-slate-900">{printSlipItem.otp}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">FSSAI Token</span>
                  <span className="font-mono text-[10px] font-bold text-slate-700">{printSlipItem.fssaiCert}</span>
                </div>
              </div>

              {/* Donor & Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-300 bg-white">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block pb-1 border-b border-slate-200">
                    Section A: Donor Institution
                  </span>
                  <p className="font-bold text-sm text-slate-900 mt-2">{printSlipItem.kitchen}</p>
                  <p className="text-slate-600 mt-0.5">{printSlipItem.kitchenLocation}</p>
                  <p className="text-slate-600 mt-0.5">Contact: {printSlipItem.kitchenContact}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">FSSAI Lic. #11221004000382</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-300 bg-white">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block pb-1 border-b border-slate-200">
                    Section B: Recipient Charity / Shelter
                  </span>
                  <p className="font-bold text-sm text-slate-900 mt-2">{printSlipItem.recipient}</p>
                  <p className="text-slate-600 mt-0.5">{printSlipItem.recipientAddress}</p>
                  <p className="text-slate-600 mt-0.5">Contact: {printSlipItem.recipientContact}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">NGO Trust Reg. #TR-8842-TN</p>
                </div>
              </div>

              {/* Food Consignment Details Table */}
              <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
                <div className="p-2.5 bg-slate-100 font-bold uppercase tracking-wider text-[11px] text-slate-700 border-b border-slate-300">
                  Section C: Surplus Food Batch Particulars
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-600">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5">Net Qty</th>
                      <th className="p-2.5">Meals</th>
                      <th className="p-2.5">Packaging</th>
                      <th className="p-2.5">Pickup Temp</th>
                      <th className="p-2.5">Drop Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold text-slate-900">{printSlipItem.items}</td>
                      <td className="p-2.5 font-bold">{printSlipItem.qty}</td>
                      <td className="p-2.5">{printSlipItem.meals}</td>
                      <td className="p-2.5">{printSlipItem.packaging}</td>
                      <td className="p-2.5 text-emerald-700 font-bold">{printSlipItem.pickupTemp}</td>
                      <td className="p-2.5 text-emerald-700 font-bold">{printSlipItem.deliveryTemp}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fleet & Safe Transit Verification */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Fleet & Logistics Verification:</span>
                <p className="text-slate-600">
                  Vehicle: <span className="font-semibold text-slate-800">{printSlipItem.vehicle}</span> | Driver:{' '}
                  <span className="font-semibold text-slate-800">{printSlipItem.driver} ({printSlipItem.driverPhone})</span>
                </p>
                <p className="text-[11px] text-slate-500 italic mt-1">
                  "The food described above was cooked under hygienic conditions and transferred in temperature-controlled containers for immediate consumption in compliance with FSSAI regulations."
                </p>
              </div>

              {/* Signatures & Stamps */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300 text-center text-xs">
                <div>
                  <div className="h-12 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-slate-700 text-lg">
                    Raman K.
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">Donor Chef Signature</span>
                </div>
                <div>
                  <div className="h-12 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-slate-700 text-lg">
                    Karthik S.
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">Fleet Driver Signature</span>
                </div>
                <div>
                  <div className="h-12 border-b border-dashed border-slate-400 flex items-center justify-center font-cursive text-emerald-800 text-lg">
                    Sister Mary
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600 block mt-1">Shelter Head Signature</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-divider print:hidden">
              <Button variant="ghost" onClick={() => setPrintSlipItem(null)}>
                Dismiss
              </Button>
              <Button variant="primary" icon={Printer} onClick={() => window.print()}>
                Print / Save PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: LOG OFFLINE / MANUAL PICKUP */}
      {newLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-base text-content-primary">
                  Record Manual Offline Food Pickup
                </h3>
              </div>
              <button
                onClick={() => setNewLogModalOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualLog} className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-content-secondary block mb-1">Source Donor Kitchen</label>
                  <select
                    value={newLogForm.kitchen}
                    onChange={(e) => setNewLogForm({ ...newLogForm, kitchen: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider bg-white text-content-primary focus:outline-none"
                  >
                    <option value="BIT Hostel Mess A">BIT Hostel Mess A</option>
                    <option value="City General Hospital Canteen">City General Hospital</option>
                    <option value="Green Valley Catering Hall 4">Green Valley Catering</option>
                    <option value="Sathy College Canteen">Sathy College Canteen</option>
                    <option value="Apex IT Park Cafeteria">Apex IT Park</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-content-secondary block mb-1">Recipient Shelter</label>
                  <select
                    value={newLogForm.recipient}
                    onChange={(e) => setNewLogForm({ ...newLogForm, recipient: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider bg-white text-content-primary focus:outline-none"
                  >
                    <option value="Hope Children Home">Hope Children Home</option>
                    <option value="Rainbow Senior Citizens Care">Rainbow Senior Care</option>
                    <option value="Slum Children Evening Care Hub">Slum Children Care</option>
                    <option value="Shelter of Grace Night Refuge">Shelter of Grace</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-content-secondary block mb-1">Food Items & Dishes *</label>
                <input
                  type="text"
                  placeholder="e.g. Mixed Rice, Dal Tadka, 50 Chapatis"
                  value={newLogForm.items}
                  onChange={(e) => setNewLogForm({ ...newLogForm, items: e.target.value })}
                  className="w-full p-2 rounded-lg border border-divider text-xs focus:outline-none focus:border-brand"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-content-secondary block mb-1">Batch Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 25"
                    value={newLogForm.qty}
                    onChange={(e) => setNewLogForm({ ...newLogForm, qty: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider text-xs focus:outline-none focus:border-brand"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-content-secondary block mb-1">Probe Temp (°C)</label>
                  <input
                    type="text"
                    placeholder="e.g. 68.5°C"
                    value={newLogForm.temp}
                    onChange={(e) => setNewLogForm({ ...newLogForm, temp: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-content-secondary block mb-1">Driver Name</label>
                  <select
                    value={newLogForm.driver}
                    onChange={(e) => setNewLogForm({ ...newLogForm, driver: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider bg-white text-content-primary focus:outline-none"
                  >
                    <option value="Karthik S.">Karthik S.</option>
                    <option value="Ramesh K.">Ramesh K.</option>
                    <option value="Suresh Babu">Suresh Babu</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-content-secondary block mb-1">Assigned Vehicle</label>
                  <select
                    value={newLogForm.vehicle}
                    onChange={(e) => setNewLogForm({ ...newLogForm, vehicle: e.target.value })}
                    className="w-full p-2 rounded-lg border border-divider bg-white text-content-primary focus:outline-none"
                  >
                    <option value="Transit Van #1 (KA-05-MN-2201)">Transit Van #1</option>
                    <option value="Eco-Rikshaw #2 (Electric)">Eco-Rikshaw #2</option>
                    <option value="Cargo Van #3 (Refrigerated)">Cargo Van #3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-content-secondary block mb-1">Notes / Special Instructions</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Collected directly from banquet loading bay; packed in insulated boxes."
                  value={newLogForm.notes}
                  onChange={(e) => setNewLogForm({ ...newLogForm, notes: e.target.value })}
                  className="w-full p-2 rounded-lg border border-divider text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-divider">
                <Button variant="ghost" onClick={() => setNewLogModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" icon={Check} type="submit">
                  Record Handover Manifest
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
