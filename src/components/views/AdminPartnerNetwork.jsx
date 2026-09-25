import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Award,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Download,
  Calendar,
  Building,
  Truck,
  HeartHandshake,
  Star,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';

export default function AdminPartnerNetwork({
  adminData,
  onNavigateHome,
  onNavigateToMap
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [partnersList, setPartnersList] = useState([
    {
      id: 1,
      ngo: 'No Food Waste Foundation',
      regNumber: 'TN-NGO-2015-0041',
      fssai: 'FSSAI-TN-11221004000312',
      district: 'Coimbatore / Erode',
      state: 'Tamil Nadu',
      contact: 'Arun Kumar',
      phone: '+91 90877 90877',
      email: 'contact@nofoodwaste.org',
      meals: 1850,
      rating: '4.9',
      status: 'Active',
      mouStatus: 'Renewed until Dec 2027',
      vehicles: '3 Insulated Vans (TN-38-BZ-4419)',
      coldChain: true,
      lastPickup: 'Today, 2:15 PM'
    },
    {
      id: 2,
      ngo: 'Anbagam Destitute & Rehabilitation Home',
      regNumber: 'TN-ERD-2018-0914',
      fssai: 'FSSAI-TN-11223006000844',
      district: 'Sathyamangalam, Erode',
      state: 'Tamil Nadu',
      contact: 'Rev. Dr. S. Manoharan',
      phone: '+91 94432 67812',
      email: 'anbagam.care@gmail.com',
      meals: 1240,
      rating: '4.95',
      status: 'Active',
      mouStatus: 'Active through Oct 2026',
      vehicles: '2 E-Rickshaws & 1 Van',
      coldChain: true,
      lastPickup: 'Yesterday, 8:40 PM'
    },
    {
      id: 3,
      ngo: 'Helping Hands Shelter',
      regNumber: 'NGO-DEL-4821',
      fssai: 'FSSAI-DL-10022041008819',
      district: 'City Central Zone',
      state: 'Karnataka/Delhi',
      contact: 'Anita Roy',
      phone: '+91 98110 33412',
      email: 'anita@helpinghands.ngo',
      meals: 620,
      rating: '4.8',
      status: 'Active',
      mouStatus: 'Active through Aug 2027',
      vehicles: '1 Transit Van',
      coldChain: true,
      lastPickup: '22 Sep 2026'
    },
    {
      id: 4,
      ngo: 'Annapoorna Trust (Sri Sathya Sai)',
      regNumber: 'KA-BLR-2016-1044',
      fssai: 'FSSAI-10018043002341',
      district: 'Bengaluru / Hosur',
      state: 'South Zone',
      contact: 'Dr. Ramesh K.',
      phone: '+91 94808 89901',
      email: 'ramesh@annapoorna.org.in',
      meals: 410,
      rating: '4.9',
      status: 'Active',
      mouStatus: 'Active through Jan 2028',
      vehicles: '4 Insulated Food Trucks',
      coldChain: true,
      lastPickup: '20 Sep 2026'
    },
    {
      id: 5,
      ngo: 'Udavum Karangal (Helping Hands)',
      regNumber: 'TN-CHN-1983-0012',
      fssai: 'FSSAI-TN-11220002000518',
      district: 'Thiruvanmiyur, Chennai',
      state: 'Tamil Nadu',
      contact: 'Vidyaakar P.',
      phone: '+91 44 2626 7770',
      email: 'vidyaakar@udavumkarangal.org',
      meals: 940,
      rating: '4.9',
      status: 'Active',
      mouStatus: 'Active through May 2027',
      vehicles: '2 Refrigerated Vans',
      coldChain: true,
      lastPickup: '18 Sep 2026'
    },
    {
      id: 6,
      ngo: 'Akshaya Trust (Feed the Destitute)',
      regNumber: 'TN-MDU-2002-0442',
      fssai: 'FSSAI-TN-11219001000781',
      district: 'Madurai East',
      state: 'Tamil Nadu',
      contact: 'Chef Narayanan Krishnan',
      phone: '+91 98421 99990',
      email: 'info@akshayatrust.org',
      meals: 820,
      rating: '4.92',
      status: 'Active',
      mouStatus: 'Active through Nov 2026',
      vehicles: '2 Transit Vans',
      coldChain: true,
      lastPickup: '15 Sep 2026'
    }
  ]);

  // New Partner Form State
  const [newPartner, setNewPartner] = useState({
    ngo: '',
    fssai: '',
    district: '',
    contact: '',
    phone: '',
    email: '',
    vehicles: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!newPartner.ngo || !newPartner.contact || !newPartner.phone) {
      alert('Please fill out all required NGO details.');
      return;
    }

    const created = {
      id: Date.now(),
      ngo: newPartner.ngo,
      regNumber: `TN-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
      fssai: newPartner.fssai || 'FSSAI-PENDING-2026',
      district: newPartner.district || 'Tamil Nadu',
      state: 'Tamil Nadu',
      contact: newPartner.contact,
      phone: newPartner.phone,
      email: newPartner.email || 'partner@foodloop.org',
      meals: 0,
      rating: '5.0',
      status: 'Pending Verification',
      mouStatus: 'Drafted (Pending Signature)',
      vehicles: newPartner.vehicles || '1 Van',
      coldChain: true,
      lastPickup: 'Just onboarded'
    };

    setPartnersList([created, ...partnersList]);
    setAddModalOpen(false);
    setNewPartner({ ngo: '', fssai: '', district: '', contact: '', phone: '', email: '', vehicles: '' });
    showToast(`✓ Partner "${created.ngo}" added to network successfully!`);
  };

  const filteredPartners = partnersList.filter((p) => {
    const matchesSearch =
      p.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contact.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' ||
      (selectedRegion === 'TamilNadu' && p.state.includes('Tamil')) ||
      (selectedRegion === 'Coimbatore' && p.district.includes('Coimbatore')) ||
      (selectedRegion === 'Erode' && p.district.includes('Erode'));

    const matchesStatus =
      selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Institutional Governance</span>
            <StatusPill text="Verified Network" level="success" size="sm" dot={true} />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              FSSAI Section 31 Compliant
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-content-primary mt-1">
            Redistribution NGO Partner Network
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Authorized food banks, community shelters, and cold-chain relief partners with active institutional MoUs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            icon={MapPin}
            onClick={onNavigateToMap}
            className="text-xs font-bold"
          >
            Live Surplus Map ↗
          </Button>

          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setAddModalOpen(true)}
            className="text-xs font-bold"
          >
            Onboard New NGO Partner
          </Button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={Users}
          iconColor="brand"
          label="Authorized NGO Partners"
          value={partnersList.length}
          trend="+2 onboarded this quarter"
          trendDirection="up"
          trendPositive={true}
          subtitle="Signed MoU & verified Darpan"
        />

        <StatCard
          icon={HeartHandshake}
          iconColor="info"
          label="Total Meals Routed"
          value="5,880"
          trend="+22% month-over-month"
          trendDirection="up"
          trendPositive={true}
          subtitle="Direct shelter distributions"
        />

        <StatCard
          icon={ShieldCheck}
          iconColor="success"
          label="FSSAI Hygiene Audit Rate"
          value="100%"
          trend="0 non-compliances"
          trendDirection="up"
          trendPositive={true}
          subtitle="Schedule IV verified kitchens"
        />

        <StatCard
          icon={Truck}
          iconColor="warning"
          label="Active Cold-Chain Vans"
          value="14 Vehicles"
          trend="Avg response SLA: 18 mins"
          trendDirection="up"
          trendPositive={true}
          subtitle="Insulated thermal logistics"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface rounded-card p-4 md:p-5 shadow-soft border border-divider flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
          <input
            type="text"
            placeholder="Search by NGO name, district, or coordinator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-divider bg-slate-50 focus:bg-white text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-brand/30 font-medium"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-content-secondary">
            <Filter className="w-3.5 h-3.5 text-content-muted" />
            <span>Region:</span>
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-xl border border-divider bg-slate-50 text-content-primary font-medium focus:outline-none"
          >
            <option value="All">All Regions</option>
            <option value="TamilNadu">📍 Tamil Nadu Only</option>
            <option value="Coimbatore">Coimbatore Region</option>
            <option value="Erode">Erode / Sathyamangalam</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-xl border border-divider bg-slate-50 text-content-primary font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Pending Verification">Pending Verification</option>
          </select>
        </div>
      </div>

      {/* NGO Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-surface rounded-card p-5 shadow-soft border border-divider hover:border-brand/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-content-secondary uppercase">
                      {partner.district}
                    </span>
                    <StatusPill
                      text={partner.status}
                      level={partner.status === 'Active' ? 'success' : 'warning'}
                      dot={true}
                      size="sm"
                    />
                  </div>
                  <h3 className="text-base font-bold text-content-primary mt-1.5">
                    {partner.ngo}
                  </h3>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{partner.rating}</span>
                </div>
              </div>

              {/* Badges / IDs */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-divider/60 text-xs mb-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-content-muted">FSSAI License:</span>
                  <span className="font-mono font-semibold text-content-primary">{partner.fssai}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-content-muted">Reg / Darpan ID:</span>
                  <span className="font-mono text-content-secondary">{partner.regNumber}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-content-muted">Institutional MoU:</span>
                  <span className="font-semibold text-brand">{partner.mouStatus}</span>
                </div>
              </div>

              {/* Logistics & Coordinator Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-content-secondary">
                  <Building className="w-3.5 h-3.5 text-content-muted shrink-0" />
                  <span>Coordinator: <strong className="text-content-primary">{partner.contact}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-content-secondary">
                  <Phone className="w-3.5 h-3.5 text-content-muted shrink-0" />
                  <a href={`tel:${partner.phone}`} className="text-brand font-medium hover:underline">
                    {partner.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-content-secondary">
                  <Truck className="w-3.5 h-3.5 text-content-muted shrink-0" />
                  <span className="truncate">{partner.vehicles}</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Summary & Actions */}
            <div className="mt-5 pt-3.5 border-t border-divider flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-content-muted uppercase tracking-wider block">Delivered</span>
                <span className="text-sm font-extrabold text-brand">{partner.meals.toLocaleString()} meals</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => showToast(`Opening signed MoU manifest for ${partner.ngo}`)}
                  className="p-1.5 rounded-lg border border-divider text-content-secondary hover:text-brand hover:border-brand/40 text-xs font-semibold"
                  title="Download MoU Agreement"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateToMap}
                  className="px-2.5 py-1.5 rounded-lg bg-brand-light text-brand hover:bg-brand hover:text-white transition-all text-xs font-bold flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard New Partner Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-card p-6 md:p-8 max-w-lg w-full shadow-2xl border border-divider relative animate-scale-up">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-content-muted hover:text-content-primary rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-content-primary">Onboard New NGO Partner</h3>
                <p className="text-xs text-content-secondary">Register an authorized local food bank or shelter</p>
              </div>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-content-secondary block mb-1">
                  NGO / Foundation Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karunya Social Care Trust"
                  value={newPartner.ngo}
                  onChange={(e) => setNewPartner({ ...newPartner, ngo: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-content-secondary block mb-1">
                    FSSAI License / Registration
                  </label>
                  <input
                    type="text"
                    placeholder="FSSAI-TN-112..."
                    value={newPartner.fssai}
                    onChange={(e) => setNewPartner({ ...newPartner, fssai: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-content-secondary block mb-1">
                    District / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sathyamangalam / Erode"
                    value={newPartner.district}
                    onChange={(e) => setNewPartner({ ...newPartner, district: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-content-secondary block mb-1">
                    Primary Coordinator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Coordinator Name"
                    value={newPartner.contact}
                    onChange={(e) => setNewPartner({ ...newPartner, contact: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-content-secondary block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98421 XXXXX"
                    value={newPartner.phone}
                    onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-content-secondary block mb-1">
                  Fleet & Cold-Chain Capacity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 Insulated Vans + 4 Thermal Box Carts"
                  value={newPartner.vehicles}
                  onChange={(e) => setNewPartner({ ...newPartner, vehicles: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-divider bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-[11px] text-purple-800">
                <span>By registering, an automated FSSAI Section 31 Compliance Checklist and institutional MoU draft will be issued.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                >
                  Register Partner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
