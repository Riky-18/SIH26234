import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Navigation,
  Truck,
  Phone,
  Clock,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Compass,
  Eye,
  X,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  HeartHandshake,
  Check,
  Maximize2,
  LocateFixed,
  Route,
  Crosshair,
  Building2,
  Users,
  ExternalLink
} from 'lucide-react';

import StatCard from '../common/StatCard';
import StatusPill from '../common/StatusPill';
import Button from '../common/Button';

// Central NGO Depot Coordinates (Rainbow Children Shelter HQ)
const DEPOT_COORDS = [12.9716, 77.5946];

// Haversine formula to calculate accurate distance between two lat/lng points in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export default function LiveSurplusMap({
  ngoData,
  onNavigateHome,
  onAcceptAlertToPickup
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const ngoMarkersLayerRef = useRef(null);
  const userLocationLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const circleLayerRef = useRef(null);

  // Center mode: 'user' (current location) or 'depot' (HQ)
  const [activeCenterMode, setActiveCenterMode] = useState('user');

  // User Current Location State (initialized with urban center, updated via live browser GPS)
  const [userLocation, setUserLocation] = useState({
    lat: 12.9735,
    lng: 77.5920,
    accuracy: 25,
    isGpsLive: false,
    address: 'Bengaluru Central Urban Corridor (Near Cubbon Park / MG Road)'
  });
  const [isLocating, setIsLocating] = useState(false);

  // Radar radius & filters
  const [radiusKm, setRadiusKm] = useState(4.0);
  const [urgencyFilter, setUrgencyFilter] = useState('All'); // 'All' | 'urgent' | 'high' | 'medium'
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [mapTileStyle, setMapTileStyle] = useState('streets'); // 'streets' | 'light'

  // Active View Tab on Right Console: 'nearbyNgos' | 'donorKitchens'
  const [activeConsoleTab, setActiveConsoleTab] = useState('nearbyNgos');

  // Layer Toggles
  const [showDonors, setShowDonors] = useState(true);
  const [showNgos, setShowNgos] = useState(true);

  const [ngoRegionFilter, setNgoRegionFilter] = useState('All'); // 'All' | 'TN'

  // Base Public NGOs, Shelters & Community Feeding Centers (Tamil Nadu & Regional Network)
  const rawPublicNgos = [
    {
      id: 'ngo-tn-1',
      name: 'No Food Waste Foundation',
      state: 'Tamil Nadu',
      district: 'Coimbatore & Erode',
      type: 'Tamil Nadu Food Recovery Network',
      lat: 12.9680,
      lng: 77.5810,
      beneficiaries: '450 Daily Beneficiaries',
      dailyDemand: '450 meals/day',
      contact: '+91 94438 88999 (Padmanaban G.)',
      address: '14 East Sambandam Rd, RS Puram, Coimbatore / Erode Hub, TN',
      verifiedFssai: 'TN-FSSAI-RECOV-641002',
      openHours: 'Open 24/7 (Hot Delivery 6:30 PM)',
      needStatus: 'Needs 90 dinner meals across 3 community feeding points',
      needLevel: 'urgent',
      direction: 'South-West',
      isTamilNadu: true
    },
    {
      id: 'ngo-tn-2',
      name: 'Anbagam Destitute Special Home',
      state: 'Tamil Nadu',
      district: 'Erode / Sathyamangalam',
      type: 'Special Needs Destitute & Child Haven',
      lat: 12.9610,
      lng: 77.6020,
      beneficiaries: '140 Children & Special Residents',
      dailyDemand: '140 meals/day',
      contact: '+91 94432 55670 (Rajeswari M.)',
      address: 'Bhavani Main Road, Sathyamangalam (Near BIT Sathy Campus), Erode, TN',
      verifiedFssai: 'TN-FSSAI-RECOV-638401',
      openHours: 'Dinner: 6:00 PM',
      needStatus: 'Urgent: Fresh dinner required for 45 children',
      needLevel: 'urgent',
      direction: 'South',
      isTamilNadu: true
    },
    {
      id: 'ngo-tn-3',
      name: 'Udavum Karangal Center',
      state: 'Tamil Nadu',
      district: 'Chennai Central',
      type: 'Rehabilitation, Orphanage & Palliative Care',
      lat: 12.9810,
      lng: 77.6150,
      beneficiaries: '520 Resident Beneficiaries',
      dailyDemand: '520 meals/day',
      contact: '+91 98400 33445 (Vidyaakar S.)',
      address: 'Gandhi Road, Thiruverkadu, Chennai Division, Tamil Nadu',
      verifiedFssai: 'TN-FSSAI-RECOV-600077',
      openHours: 'Intake: 6:00 PM onwards',
      needStatus: 'High: Diabetic elderly & children diet needed',
      needLevel: 'high',
      direction: 'North-East',
      isTamilNadu: true
    },
    {
      id: 'ngo-tn-4',
      name: 'Akshaya Trust Haven',
      state: 'Tamil Nadu',
      district: 'Madurai & South TN',
      type: 'Destitute Elder Care & Mental Health Shelter',
      lat: 12.9590,
      lng: 77.5750,
      beneficiaries: '380 Destitute Elders',
      dailyDemand: '380 meals/day',
      contact: '+91 98421 22345 (Narayanan K.)',
      address: 'Vilangudi Bypass Road, Madurai Hub, Tamil Nadu',
      verifiedFssai: 'TN-FSSAI-RECOV-625018',
      openHours: 'Daily 7:00 AM - 8:30 PM',
      needStatus: 'Critical: Needs 60 soft dinner meals tonight',
      needLevel: 'urgent',
      direction: 'South-West',
      isTamilNadu: true
    },
    {
      id: 'ngo-tn-5',
      name: 'Shanti Ashram Child Nutrition Hub',
      state: 'Tamil Nadu',
      district: 'Coimbatore West',
      type: 'Child Malnutrition Eradication & Women Care',
      lat: 12.9890,
      lng: 77.5850,
      beneficiaries: '260 Children & Mothers',
      dailyDemand: '260 meals/day',
      contact: '+91 98940 11223 (Dr. Kezevino)',
      address: 'Sri Avinashilingam Post, Kovaipudur, Coimbatore, Tamil Nadu',
      verifiedFssai: 'TN-FSSAI-RECOV-641042',
      openHours: 'Evening Nutrition: 5:00 PM - 7:30 PM',
      needStatus: 'Moderate: Accepting bulk cooked grain & dal surplus',
      needLevel: 'medium',
      direction: 'North-West',
      isTamilNadu: true
    },
    {
      id: 'ngo-1',
      name: 'Hope Children Home',
      state: 'Tamil Nadu',
      district: 'North Division',
      type: 'Child Welfare & Orphanage',
      lat: 12.9640,
      lng: 77.5880,
      beneficiaries: '120 Children',
      dailyDemand: '150 meals/day',
      contact: '+91 94432 11098 (Sister Mary)',
      address: 'Community Welfare Wing, Sector 4, Tamil Nadu Zone',
      verifiedFssai: 'TN-FSSAI-RECOV-884201',
      openHours: 'Open 24/7 (Dinner 6:30 PM)',
      needStatus: 'Needs 45 dinner meals today',
      needLevel: 'urgent',
      direction: 'South-West',
      isTamilNadu: true
    },
    {
      id: 'ngo-2',
      name: 'Rainbow Senior Care Haven',
      state: 'Tamil Nadu',
      district: 'Urban Shelter Base',
      type: 'Elderly Haven & Palliative Care',
      lat: 12.9780,
      lng: 77.6180,
      beneficiaries: '85 Senior Citizens',
      dailyDemand: '85 meals/day (Soft/Mild diet)',
      contact: '+91 98840 22331 (Dr. Venkat)',
      address: 'Old Age Shelter Wing, Tamil Nadu Border Post',
      verifiedFssai: 'TN-FSSAI-RECOV-910202',
      openHours: 'Dinner: 7:00 PM',
      needStatus: 'Diabetic/Mild meals needed',
      needLevel: 'medium',
      direction: 'North-East',
      isTamilNadu: true
    },
    {
      id: 'ngo-3',
      name: 'Slum Children Evening Care Hub',
      state: 'Tamil Nadu',
      district: 'Erode & Salem Zone',
      type: 'Child Education & Evening Nutrition',
      lat: 12.9520,
      lng: 77.5650,
      beneficiaries: '210 Underprivileged Kids',
      dailyDemand: '200+ snacks/meals',
      contact: '+91 97910 44556 (Brother Joseph)',
      address: 'Railway Gate Settlement Center, Erode Highway',
      verifiedFssai: 'TN-FSSAI-RECOV-772103',
      openHours: 'Feeding: 5:00 PM - 8:00 PM',
      needStatus: 'Critical: Needs 80 evening meals',
      needLevel: 'urgent',
      direction: 'South-West',
      isTamilNadu: true
    }
  ];

  // Base Donor Kitchens
  const rawAlerts = [
    {
      id: 'alt-1',
      kitchen: 'BIT Hostel Mess A',
      location: 'North Campus, Gate 2 Loading Bay',
      qty: '22 kg',
      meals: '~55 meals',
      items: 'Mixed Rice, Sambar & Poriyal',
      window: '6:00 PM (45 mins left)',
      urgency: 'high',
      tempCheck: '68.5°C (HACCP Safe)',
      preparedAt: '1:30 PM',
      contact: '+91 98421 55601 (Chef Raman)',
      lat: 12.9815,
      lng: 77.5842,
      packaging: '3x Sealed Stainless Canisters',
      claimed: false,
    },
    {
      id: 'alt-2',
      kitchen: 'City General Hospital Canteen',
      location: 'Main Medical Wing, B1 Dining Hall',
      qty: '15 kg',
      meals: '~38 meals',
      items: 'Chapati, Vegetable Curry & Dal',
      window: '5:30 PM (15 mins left 🚨)',
      urgency: 'urgent',
      tempCheck: '65.2°C (HACCP Safe)',
      preparedAt: '1:00 PM',
      contact: '+91 97890 22314 (Supervisor Anita)',
      lat: 12.9560,
      lng: 77.6120,
      packaging: '4x Food-Grade Catering Trays',
      claimed: false,
    },
    {
      id: 'alt-3',
      kitchen: 'Sathy College Canteen',
      location: 'Student Union Hub, Ground Floor',
      qty: '9 kg',
      meals: '~22 meals',
      items: 'Idli, Upma & Coconut Chutney',
      window: '7:00 PM (1 hr 45m left)',
      urgency: 'medium',
      tempCheck: '64.0°C (HACCP Safe)',
      preparedAt: '2:15 PM',
      contact: '+91 94422 66781 (Chef Murugan)',
      lat: 12.9870,
      lng: 77.6080,
      packaging: '2x Insulated Boxes',
      claimed: false,
    },
    {
      id: 'alt-4',
      kitchen: 'Green Valley Catering Hall 4',
      location: 'Industrial Estate Banquet Pavilion',
      qty: '30 kg',
      meals: '~75 meals',
      items: 'Veg Pulao, Paneer Gravy & Curd',
      window: '6:45 PM (1 hr 30m left)',
      urgency: 'medium',
      tempCheck: '69.0°C (HACCP Safe)',
      preparedAt: '2:00 PM',
      contact: '+91 99941 87654 (Manager Suresh)',
      lat: 12.9420,
      lng: 77.5740,
      packaging: '5x Bulk Insulated Drums',
      claimed: false,
    },
    {
      id: 'alt-5',
      kitchen: 'Apex IT Park Cafeteria',
      location: 'Tower B Dining Concourse',
      qty: '18 kg',
      meals: '~45 meals',
      items: 'Jeera Rice, Yellow Dal & Rotis',
      window: '8:00 PM (2 hrs 45m left)',
      urgency: 'medium',
      tempCheck: '66.8°C (HACCP Safe)',
      preparedAt: '3:00 PM',
      contact: '+91 98402 11092 (Chef Deepak)',
      lat: 13.0020,
      lng: 77.5980,
      packaging: '3x Sealed Boxes',
      claimed: false,
    }
  ];

  // Dynamically compute live distances relative to user's location
  const centerLat = activeCenterMode === 'user' ? userLocation.lat : DEPOT_COORDS[0];
  const centerLng = activeCenterMode === 'user' ? userLocation.lng : DEPOT_COORDS[1];

  const publicNgosWithDistance = rawPublicNgos.map((ngo) => {
    const dist = calculateDistanceKm(centerLat, centerLng, ngo.lat, ngo.lng);
    return {
      ...ngo,
      distanceNum: dist,
      distanceText: `${dist} km from you`
    };
  }).sort((a, b) => a.distanceNum - b.distanceNum);

  const [alerts, setAlerts] = useState(rawAlerts);
  const [selectedAlert, setSelectedAlert] = useState(rawAlerts[0]);
  const [selectedNgo, setSelectedNgo] = useState(publicNgosWithDistance[0]);

  // NGO Fleet Vehicles for Dispatch
  const fleetVehicles = [
    { id: 'v-1', name: 'Transit Van #1 (KA-05-MN-2201)', driver: 'Karthik S.', capacity: '60 kg', etaToSelected: '12 mins', status: 'Available' },
    { id: 'v-2', name: 'Eco-Rikshaw #2 (Electric)', driver: 'Ramesh K.', capacity: '25 kg', etaToSelected: '18 mins', status: 'Available' },
    { id: 'v-3', name: 'Cargo Van #3 (Refrigerated)', driver: 'Suresh Babu', capacity: '100 kg', etaToSelected: '15 mins', status: 'In Transit' },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState('v-1');

  // Active Pickups in Transit
  const [inTransitList, setInTransitList] = useState([]);

  // Modals
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [qrModalItem, setQrModalItem] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered alerts by radius and urgency
  const filteredAlerts = alerts
    .map((alert) => {
      const dist = calculateDistanceKm(centerLat, centerLng, alert.lat, alert.lng);
      return {
        ...alert,
        distanceNum: dist,
        distanceText: `${dist} km away`
      };
    })
    .filter((alert) => {
      const matchRadius = alert.distanceNum <= radiusKm;
      const matchUrgency = urgencyFilter === 'All' || alert.urgency === urgencyFilter;
      const matchSearch =
        !searchQuery ||
        alert.kitchen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.items.toLowerCase().includes(searchQuery.toLowerCase());

      return matchRadius && matchUrgency && matchSearch;
    });

  // Filtered NGOs by radius and Tamil Nadu region
  const filteredNgos = publicNgosWithDistance.filter((ngo) => {
    const matchRadius = ngo.distanceNum <= radiusKm;
    const matchRegion = ngoRegionFilter === 'All' || (ngoRegionFilter === 'TN' && ngo.isTamilNadu);
    const matchSearch =
      !searchQuery ||
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ngo.district && ngo.district.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRadius && matchRegion && matchSearch;
  });

  const totalAvailableKg = filteredAlerts
    .filter((a) => !a.claimed)
    .reduce((acc, a) => acc + parseFloat(a.qty), 0);

  const totalAvailableMeals = Math.round(totalAvailableKg * 2.5);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center initially on User Location
    const map = L.map(mapRef.current, {
      center: [userLocation.lat, userLocation.lng],
      zoom: 13,
      zoomControl: false,
    });

    const tileUrl =
      mapTileStyle === 'light'
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution =
      mapTileStyle === 'light'
        ? '&copy; <a href="https://carto.com/">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer Groups
    const circleLayer = L.layerGroup().addTo(map);
    const routeLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);
    const ngoMarkersLayer = L.layerGroup().addTo(map);
    const userLocationLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    circleLayerRef.current = circleLayer;
    routeLayerRef.current = routeLayer;
    markersLayerRef.current = markersLayer;
    ngoMarkersLayerRef.current = ngoMarkersLayer;
    userLocationLayerRef.current = userLocationLayer;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer if style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const tileUrl =
      mapTileStyle === 'light'
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);
  }, [mapTileStyle]);

  // Request Live Browser GPS Location
  const handleGetLiveLocation = () => {
    setIsLocating(true);

    if (!navigator.geolocation) {
      showToast('⚠️ Geolocation not supported by browser. Using current central position.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const newLoc = {
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          isGpsLive: true,
          address: `Live GPS Fix (±${Math.round(accuracy)}m accuracy)`
        };
        setUserLocation(newLoc);
        setActiveCenterMode('user');
        setIsLocating(false);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 14, { duration: 1.2 });
        }
        showToast(`📍 Live GPS locked: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`);
      },
      (err) => {
        console.warn('Geolocation fallback:', err.message);
        setIsLocating(false);
        setActiveCenterMode('user');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1 });
        }
        showToast('📍 Positioned at your local urban area (Bengaluru Central)');
      },
      { timeout: 6000, enableHighAccuracy: true }
    );
  };

  // Fly to User Location
  const handleCenterOnUser = () => {
    setActiveCenterMode('user');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1 });
    }
    showToast('📍 Map centered on Your Current Location');
  };

  // Fly to Depot HQ
  const handleCenterOnDepot = () => {
    setActiveCenterMode('depot');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(DEPOT_COORDS, 14, { duration: 1 });
    }
    showToast('🏢 Map centered on Rainbow Depot HQ');
  };

  // Redraw All Map Layers (User, Circle, Donors, NGOs, and Routes)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    circleLayerRef.current?.clearLayers();
    routeLayerRef.current?.clearLayers();
    markersLayerRef.current?.clearLayers();
    ngoMarkersLayerRef.current?.clearLayers();
    userLocationLayerRef.current?.clearLayers();

    const activeCenter = activeCenterMode === 'user' ? [userLocation.lat, userLocation.lng] : DEPOT_COORDS;

    // 1. Proximity Coverage Circle centered on the active focus point
    const coverageCircle = L.circle(activeCenter, {
      radius: radiusKm * 1000,
      color: activeCenterMode === 'user' ? '#2563EB' : '#059669',
      fillColor: activeCenterMode === 'user' ? '#60A5FA' : '#10B981',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '6, 6',
    });
    circleLayerRef.current?.addLayer(coverageCircle);

    // 2. High-Visibility User Current Location Marker
    const userHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-blue-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="absolute top-11 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-blue-800 text-white text-[10px] font-black shadow-lg border border-blue-300">
          YOU (Current Location)
        </div>
      </div>
    `;

    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: userHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
    userMarker.bindPopup(`
      <div class="p-2 text-slate-800 font-sans max-w-[220px]">
        <div class="flex items-center gap-1.5 text-blue-700 font-black text-xs pb-1 border-b border-blue-200">
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          <span>Your Current GPS Location</span>
        </div>
        <p class="text-[11px] text-slate-600 mt-1 font-medium">${userLocation.address}</p>
        <p class="text-[10px] text-slate-500 mt-0.5">Lat: ${userLocation.lat.toFixed(4)}° | Lng: ${userLocation.lng.toFixed(4)}°</p>
        <div class="mt-2 text-center py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded border border-blue-200">
          Active Search Radius: ${radiusKm} km
        </div>
      </div>
    `);
    userLocationLayerRef.current?.addLayer(userMarker);

    // 3. Central NGO Depot Marker
    const depotHtml = `
      <div class="relative flex items-center justify-center">
        <div class="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-emerald-500/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
        <div class="absolute top-11 whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-bold shadow-md border border-slate-700">
          Rainbow Depot HQ
        </div>
      </div>
    `;

    const depotIcon = L.divIcon({
      className: 'custom-depot-marker',
      html: depotHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const depotMarker = L.marker(DEPOT_COORDS, { icon: depotIcon });
    depotMarker.bindPopup(`
      <div class="p-2 text-slate-800 font-sans">
        <p class="font-bold text-xs text-emerald-800">Rainbow Children Shelter Central Depot</p>
        <p class="text-[11px] text-slate-600 mt-0.5">Fleet Base & Cold Room Hub</p>
      </div>
    `);
    markersLayerRef.current?.addLayer(depotMarker);

    // 4. Public NGOs / Community Shelters Markers (Purple)
    if (showNgos) {
      publicNgosWithDistance.forEach((ngo) => {
        const isNgoSelected = selectedNgo?.id === ngo.id;
        const isUrgentNeed = ngo.needLevel === 'urgent';

        const ngoHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${
            isNgoSelected ? 'scale-125 z-30' : ''
          }">
            ${isUrgentNeed ? '<div class="absolute -inset-2 bg-purple-500 rounded-full animate-ping opacity-40"></div>' : ''}
            <div class="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-xl border-2 border-white ring-4 ${
              isNgoSelected ? 'ring-purple-400 ring-8 shadow-2xl' : 'ring-purple-500/30'
            }">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div class="absolute top-11 whitespace-nowrap px-2 py-0.5 rounded-md ${
              isNgoSelected ? 'bg-purple-900 text-white font-black' : 'bg-white/95 text-purple-900 font-bold'
            } text-[10px] shadow-sm border border-purple-300">
              ${ngo.name.split(' ')[0]} • ${ngo.distanceNum} km
            </div>
          </div>
        `;

        const ngoIcon = L.divIcon({
          className: 'custom-ngo-marker',
          html: ngoHtml,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const ngoMarker = L.marker([ngo.lat, ngo.lng], { icon: ngoIcon });

        ngoMarker.on('click', () => {
          setSelectedNgo(ngo);
          setActiveConsoleTab('nearbyNgos');
        });

        ngoMarker.bindPopup(`
          <div class="p-2 text-slate-800 font-sans max-w-[230px]">
            <div class="flex items-center justify-between gap-1 pb-1 border-b border-purple-200">
              <span class="font-bold text-xs text-purple-900">${ngo.name}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-bold bg-purple-100 text-purple-800">${ngo.distanceNum} km away</span>
            </div>
            <p class="text-[11px] font-semibold text-slate-600 mt-1">${ngo.type}</p>
            <div class="text-[10px] text-slate-600 mt-1 space-y-0.5">
              <p>👥 <span class="font-bold text-slate-800">${ngo.beneficiaries}</span></p>
              <p>📍 ${ngo.address}</p>
              <p>📞 ${ngo.contact}</p>
              <p class="text-purple-700 font-semibold mt-1">⚠️ Need: ${ngo.needStatus}</p>
            </div>
          </div>
        `);

        ngoMarkersLayerRef.current?.addLayer(ngoMarker);
      });
    }

    // 5. Donor Kitchen Markers (Amber/Red/Green)
    if (showDonors) {
      filteredAlerts.forEach((alert) => {
        const isSelected = selectedAlert?.id === alert.id;
        const isUrgent = alert.urgency === 'urgent';
        const isClaimed = alert.claimed;

        let bgColor = 'bg-brand';
        let ringColor = 'ring-brand/30';
        let pulseHtml = '';

        if (isClaimed) {
          bgColor = 'bg-emerald-600';
          ringColor = 'ring-emerald-500/40';
        } else if (isUrgent) {
          bgColor = 'bg-rose-600';
          ringColor = 'ring-rose-500/50';
          pulseHtml = '<div class="absolute -inset-2 bg-rose-500 rounded-full animate-ping opacity-40"></div>';
        } else if (alert.urgency === 'high') {
          bgColor = 'bg-amber-600';
          ringColor = 'ring-amber-500/40';
        }

        const kitchenHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${
            isSelected ? 'scale-115' : ''
          }">
            ${pulseHtml}
            <div class="w-10 h-10 rounded-full ${bgColor} text-white flex items-center justify-center shadow-xl border-2 border-white ring-4 ${ringColor}">
              ${
                isClaimed
                  ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
                  : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5 2 2"/></svg>'
              }
            </div>
            <div class="absolute top-11 whitespace-nowrap px-2 py-0.5 rounded-md ${
              isSelected ? 'bg-slate-900 text-white font-extrabold' : 'bg-white/95 text-slate-800 font-bold'
            } text-[10px] shadow-sm border border-slate-300">
              ${alert.kitchen.split(' ')[0]} • ${alert.qty}
            </div>
          </div>
        `;

        const kitchenIcon = L.divIcon({
          className: 'custom-kitchen-marker',
          html: kitchenHtml,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([alert.lat, alert.lng], { icon: kitchenIcon });

        marker.on('click', () => {
          setSelectedAlert(alert);
          setActiveConsoleTab('donorKitchens');
        });

        marker.bindPopup(`
          <div class="p-2 text-slate-800 font-sans max-w-[220px]">
            <div class="flex items-center justify-between gap-2 pb-1 border-b border-slate-200">
              <span class="font-bold text-xs text-slate-900">${alert.kitchen}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-bold ${
                isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
              }">${alert.qty}</span>
            </div>
            <p class="text-[11px] font-semibold text-slate-700 mt-1">${alert.items}</p>
            <div class="text-[10px] text-slate-500 mt-1 space-y-0.5">
              <p>📍 ${alert.location}</p>
              <p>⏱️ Window: ${alert.window}</p>
              <p>🌡️ Probe: ${alert.tempCheck}</p>
            </div>
          </div>
        `);

        markersLayerRef.current?.addLayer(marker);
      });
    }

    // 6. Draw Direct Route from Current Location to Selected NGO
    if (selectedNgo) {
      const midLat = (userLocation.lat + selectedNgo.lat) / 2 + 0.002;
      const midLng = (userLocation.lng + selectedNgo.lng) / 2 - 0.002;

      const userToNgoPoints = [
        [userLocation.lat, userLocation.lng],
        [midLat, midLng],
        [selectedNgo.lat, selectedNgo.lng]
      ];

      const userRoute = L.polyline(userToNgoPoints, {
        color: '#7C3AED',
        weight: 3.5,
        dashArray: '8, 8',
        opacity: 0.9,
      });
      routeLayerRef.current?.addLayer(userRoute);

      const routeBadgeHtml = `
        <div class="px-2 py-0.5 rounded-full bg-purple-900 text-white text-[10px] font-bold shadow-md flex items-center gap-1 border border-purple-400">
          <span>${selectedNgo.distanceNum} km from you</span>
        </div>
      `;
      const badgeIcon = L.divIcon({
        className: 'custom-badge-marker',
        html: routeBadgeHtml,
        iconSize: [110, 20],
        iconAnchor: [55, 10],
      });
      const badgeMarker = L.marker([midLat, midLng], { icon: badgeIcon });
      routeLayerRef.current?.addLayer(badgeMarker);
    }
  }, [radiusKm, filteredAlerts, selectedAlert, alerts, userLocation, showDonors, showNgos, selectedNgo, activeCenterMode]);

  // Handle selecting an NGO
  const handleSelectNgo = (ngo) => {
    setSelectedNgo(ngo);
    setActiveConsoleTab('nearbyNgos');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([ngo.lat, ngo.lng], 14, { duration: 1.2 });
    }
    showToast(`📍 Selected ${ngo.name} (${ngo.distanceNum} km from your current location)`);
  };

  // Handle selecting a donor kitchen
  const handleSelectKitchen = (kitchen) => {
    setSelectedAlert(kitchen);
    setActiveConsoleTab('donorKitchens');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([kitchen.lat, kitchen.lng], 14, { duration: 1.2 });
    }
  };

  // Recenter map to view user location and all nearby NGOs
  const handleFitBounds = () => {
    if (!mapInstanceRef.current) return;
    const allCoords = [
      [userLocation.lat, userLocation.lng],
      ...publicNgosWithDistance.map((n) => [n.lat, n.lng]),
      ...filteredAlerts.map((a) => [a.lat, a.lng])
    ];
    const bounds = L.latLngBounds(allCoords);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  // Trigger radar scan
  const handleScanRadar = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleFitBounds();
      showToast(`🎯 Proximity scan complete: ${filteredNgos.length} NGOs & ${filteredAlerts.length} donor kitchens in your ${radiusKm} km radius.`);
    }, 900);
  };

  // Claim and dispatch driver
  const handleConfirmDispatch = () => {
    if (!selectedAlert) return;

    const assigned = fleetVehicles.find((v) => v.id === selectedVehicle) || fleetVehicles[0];

    const newTransit = {
      id: `pickup-${Date.now()}`,
      kitchen: selectedAlert.kitchen,
      address: selectedAlert.location,
      qty: selectedAlert.qty,
      meals: selectedAlert.meals,
      items: selectedAlert.items,
      vehicle: assigned.name,
      driverName: assigned.driver,
      eta: assigned.etaToSelected,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'Driver Dispatched',
      tempCheck: selectedAlert.tempCheck,
    };

    setInTransitList([newTransit, ...inTransitList]);

    setAlerts((prev) =>
      prev.map((a) => (a.id === selectedAlert.id ? { ...a, claimed: true } : a))
    );

    setSelectedAlert((prev) => (prev ? { ...prev, claimed: true } : null));
    setDispatchModalOpen(false);
    showToast(`✓ Driver ${assigned.driver} dispatched to ${selectedAlert.kitchen}! ETA: ${assigned.etaToSelected}`);

    if (onAcceptAlertToPickup) {
      onAcceptAlertToPickup(selectedAlert);
    }
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

      {/* Top Banner Header: Current Location & Nearby NGO Context */}
      <div className="bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
                Live Current Location & Nearby NGOs
              </span>
              <span className="text-xs text-content-muted">•</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Telemetric Proximity Radar</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight mt-1.5">
              Nearby Public NGOs & Surplus Redistribution Map
            </h2>
            <p className="text-xs md:text-sm text-content-secondary mt-1 max-w-3xl">
              Pinpoints your current geographic coordinates to find, rank, and route to the nearest verified community shelters, children homes, and food banks.
            </p>
          </div>

          {/* Quick Header GPS Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
            {/* Live GPS Lock Button */}
            <Button
              variant="primary"
              size="sm"
              icon={Crosshair}
              onClick={handleGetLiveLocation}
              disabled={isLocating}
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-md"
            >
              {isLocating ? 'Locking GPS...' : 'Update My GPS Position'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={handleScanRadar}
              disabled={isScanning}
            >
              {isScanning ? 'Pinging Radar...' : 'Scan Nearby'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              icon={ArrowRight}
              onClick={onNavigateHome}
            >
              Back to Hub
            </Button>
          </div>
        </div>

        {/* 4 Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5 pt-5 border-t border-divider">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center justify-between text-blue-900 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-blue-600" />
                <span>Your Location Status</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-base md:text-lg font-black text-blue-950 mt-1 truncate">
              {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
            </p>
            <p className="text-[11px] text-blue-700 font-medium">
              Within {radiusKm} km search boundary
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Nearest Shelter</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200 text-purple-900 font-extrabold">
                {publicNgosWithDistance[0]?.distanceNum} km
              </span>
            </div>
            <p className="text-base md:text-lg font-black text-purple-900 mt-1 truncate">
              {publicNgosWithDistance[0]?.name}
            </p>
            <p className="text-[11px] text-purple-600 font-medium truncate">
              {publicNgosWithDistance[0]?.needStatus}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                <span>Nearby Surplus Available</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-emerald-700 mt-1">
              {totalAvailableKg} kg
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              ~{totalAvailableMeals} hot meals ready for pickup
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-divider/70">
            <div className="flex items-center justify-between text-content-secondary text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand" />
                <span>Available Fleet</span>
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-content-primary mt-1">
              2 / 3 Vehicles
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Ready for immediate route dispatch
            </p>
          </div>
        </div>

        {/* Center Mode Switcher & Radius Slider Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-divider">
          {/* Active Center Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-content-secondary">Map Center:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-divider">
              <button
                onClick={handleCenterOnUser}
                className={`text-xs px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                  activeCenterMode === 'user'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>My Current Location</span>
              </button>

              <button
                onClick={handleCenterOnDepot}
                className={`text-xs px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                  activeCenterMode === 'depot'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Rainbow Depot HQ</span>
              </button>
            </div>
          </div>

          {/* Proximity Radius Slider & Layer Controls */}
          <div className="flex items-center gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-content-secondary">Search Radius:</span>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={radiusKm}
                onChange={(e) => setRadiusKm(parseFloat(e.target.value))}
                className="w-24 sm:w-32 accent-blue-600 cursor-pointer"
              />
              <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                {radiusKm} km
              </span>
            </div>

            <div className="flex items-center gap-1 border-l border-divider pl-3">
              <button
                onClick={() => setShowNgos(!showNgos)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
                  showNgos ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <HeartHandshake className="w-3 h-3" />
                <span>Public NGOs ({publicNgosWithDistance.length})</span>
              </button>

              <button
                onClick={() => setShowDonors(!showDonors)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
                  showDonors ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Utensils className="w-3 h-3" />
                <span>Donors ({filteredAlerts.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Leaflet Interactive GIS Map (Left 7 cols) & Nearby NGOs / Kitchen Console (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Leaflet Interactive Map */}
        <div className="lg:col-span-7 bg-surface rounded-card p-3 md:p-4 shadow-soft border border-divider/70 flex flex-col justify-between relative overflow-hidden">
          
          {/* Map Top Floating Overlay Bar */}
          <div className="flex items-center justify-between bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-soft-sm border border-divider mb-2 z-10 relative">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-bold text-blue-900">
                Centered: {activeCenterMode === 'user' ? 'My Current Location' : 'Rainbow Depot HQ'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCenterOnUser}
                className="p-1.5 rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs flex items-center gap-1 font-bold"
                title="Center on Your Current Location"
              >
                <Crosshair className="w-3.5 h-3.5 text-blue-600" />
                <span>Locate Me</span>
              </button>

              <button
                onClick={handleFitBounds}
                className="p-1.5 rounded-lg border border-divider hover:bg-slate-100 text-content-secondary text-xs flex items-center gap-1 font-semibold"
                title="Fit All on Screen"
              >
                <Maximize2 className="w-3.5 h-3.5 text-brand" />
                <span>Fit All</span>
              </button>
            </div>
          </div>

          {/* Actual Leaflet Container */}
          <div
            id="leaflet-surplus-map"
            ref={mapRef}
            className="w-full h-[520px] rounded-xl border border-divider/80 relative z-0 shadow-inner"
            style={{ minHeight: '520px' }}
          />

          {/* Radar Scanning Sweep Beam Animation */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-[450px] h-[450px] rounded-full border-4 border-blue-500/50 animate-ping opacity-50" />
            </div>
          )}

          {/* Map Bottom Legend / Active Selection Bar */}
          <div className="relative z-10 mt-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-soft-sm border border-divider flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-300" />
                <span className="text-blue-900 font-bold">You (Current Location)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-700" />
                <span className="text-purple-900 font-semibold">Public NGOs / Shelters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brand" />
                <span className="text-content-secondary font-medium">Donor Kitchens</span>
              </div>
            </div>

            {selectedNgo && (
              <span className="text-[11px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                Route to: {selectedNgo.name} ({selectedNgo.distanceNum} km)
              </span>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Nearby NGOs to Current Location & Donor Inspection */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Tab Switcher: Nearby NGOs vs Donor Kitchens */}
          <div className="bg-surface rounded-card p-4 shadow-soft border border-divider/70">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveConsoleTab('nearbyNgos')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeConsoleTab === 'nearbyNgos'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'text-content-secondary hover:text-content-primary'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Nearby NGOs ({publicNgosWithDistance.length})</span>
                </button>

                <button
                  onClick={() => setActiveConsoleTab('donorKitchens')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeConsoleTab === 'donorKitchens'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-content-secondary hover:text-content-primary'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Donor Kitchens ({filteredAlerts.length})</span>
                </button>
              </div>

              <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                Sorted by Proximity
              </span>
            </div>

            {/* TAB 1: NEARBY PUBLIC NGOS RANKED BY DISTANCE FROM USER */}
            {activeConsoleTab === 'nearbyNgos' && (
              <div className="space-y-2 mt-3 max-h-[380px] overflow-y-auto pr-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-divider/60 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setNgoRegionFilter('All')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        ngoRegionFilter === 'All'
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-slate-100 text-content-secondary hover:bg-slate-200'
                      }`}
                    >
                      All Shelters ({publicNgosWithDistance.length})
                    </button>
                    <button
                      onClick={() => setNgoRegionFilter('TN')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        ngoRegionFilter === 'TN'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      <span>📍 Tamil Nadu NGOs ({publicNgosWithDistance.filter(n => n.isTamilNadu).length})</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-content-muted">Radius: {radiusKm} km</span>
                </div>

                {filteredNgos.map((ngo, idx) => {
                  const isSelected = selectedNgo?.id === ngo.id;
                  return (
                    <div
                      key={ngo.id}
                      onClick={() => handleSelectNgo(ngo)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 text-xs ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/80 shadow-soft'
                          : 'border-divider bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            idx === 0 ? 'bg-purple-200 text-purple-900' : 'bg-slate-100 text-slate-600'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-sm text-purple-950 block">
                                {ngo.name}
                              </span>
                              {ngo.isTamilNadu && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                                  TN • {ngo.district}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-content-secondary">
                              {ngo.type} • {ngo.beneficiaries}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[11px] block">
                            {ngo.distanceNum} km from you
                          </span>
                          <span className="text-[10px] text-content-muted mt-0.5 block">{ngo.direction}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-divider/60">
                        <span className="text-rose-700 font-semibold truncate max-w-[200px]">
                          ⚠️ {ngo.needStatus}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${ngo.contact}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded hover:bg-purple-200 text-purple-700"
                            title="Call Shelter"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            FSSAI Reg.
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredNgos.length === 0 && (
                  <div className="p-6 text-center text-content-muted text-xs">
                    No NGOs found within {radiusKm} km of your location. Try expanding the radius slider!
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: DONOR KITCHENS RANKED BY DISTANCE */}
            {activeConsoleTab === 'donorKitchens' && (
              <div className="space-y-2 mt-3 max-h-[360px] overflow-y-auto pr-1">
                <div className="flex items-center justify-between text-xs text-content-muted pb-1">
                  <span>Institutional Messes & Banquet Kitchens</span>
                  <span>Active Donors: {filteredAlerts.length}</span>
                </div>

                {filteredAlerts.map((alert) => {
                  const isSelected = selectedAlert?.id === alert.id;
                  return (
                    <div
                      key={alert.id}
                      onClick={() => handleSelectKitchen(alert)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 text-xs ${
                        isSelected
                          ? 'border-brand bg-brand-light/40 shadow-soft'
                          : 'border-divider bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-content-primary text-sm">{alert.kitchen}</span>
                            <StatusPill
                              text={alert.urgency === 'urgent' ? '<30m' : 'High'}
                              level={alert.urgency === 'urgent' ? 'danger' : 'warning'}
                              size="sm"
                            />
                          </div>
                          <span className="text-[11px] text-content-secondary block mt-0.5">{alert.items}</span>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-brand text-sm block">{alert.qty}</span>
                          <span className="text-[10px] text-blue-700 font-bold">{alert.distanceText}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 text-content-muted">
                        <span>Safe Window: {alert.window}</span>
                        <span className="text-emerald-700 font-semibold">{alert.tempCheck}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected NGO Detail & Immediate Redistribution Action */}
          {selectedNgo && activeConsoleTab === 'nearbyNgos' && (
            <div className="bg-surface rounded-card p-5 shadow-soft border border-purple-200 space-y-3 animate-slideUp">
              <div className="flex items-start justify-between pb-2 border-b border-divider">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      Nearest Shelter to You ({selectedNgo.distanceNum} km)
                    </span>
                    <span className="text-xs text-content-muted">• {selectedNgo.direction}</span>
                  </div>
                  <h3 className="font-black text-lg text-purple-950 mt-1">{selectedNgo.name}</h3>
                  <p className="text-xs text-content-secondary flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                    {selectedNgo.address}
                  </p>
                </div>

                <a
                  href={`tel:${selectedNgo.contact}`}
                  className="p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800"
                  title="Call Shelter"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-divider">
                  <span className="text-content-muted text-[10px] block">Resident Beneficiaries</span>
                  <span className="font-extrabold text-sm text-content-primary">{selectedNgo.beneficiaries}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-divider">
                  <span className="text-content-muted text-[10px] block">Daily Feeding Goal</span>
                  <span className="font-extrabold text-sm text-purple-800">{selectedNgo.dailyDemand}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1">
                <span className="font-bold text-purple-900 block">Current Verified Urgent Need:</span>
                <p className="text-purple-800 font-semibold">{selectedNgo.needStatus}</p>
                <p className="text-[11px] text-content-muted">Accepting deliveries until {selectedNgo.openHours}</p>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white border-purple-700 font-bold"
                icon={Route}
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo([selectedNgo.lat, selectedNgo.lng], 15, { duration: 1.2 });
                  }
                  showToast(`🗺️ Direct routing line displayed from your position to ${selectedNgo.name}`);
                }}
              >
                Focus Route on Map ({selectedNgo.distanceNum} km)
              </Button>
            </div>
          )}

          {/* Selected Donor Kitchen Detail (if on Donor tab) */}
          {selectedAlert && activeConsoleTab === 'donorKitchens' && (
            <div className="bg-surface rounded-card p-5 shadow-soft border border-divider/70 space-y-3">
              <div className="flex items-start justify-between pb-2 border-b border-divider">
                <div>
                  <h3 className="font-bold text-base text-content-primary">{selectedAlert.kitchen}</h3>
                  <p className="text-xs text-content-secondary mt-0.5">{selectedAlert.location}</p>
                </div>
                <span className="font-extrabold text-brand text-sm">{selectedAlert.qty}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-divider text-xs space-y-1">
                <span className="font-bold text-content-primary block">{selectedAlert.items}</span>
                <p className="text-content-secondary">Servings: {selectedAlert.meals} • Probe: {selectedAlert.tempCheck}</p>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full font-bold shadow-md"
                icon={Truck}
                onClick={() => setDispatchModalOpen(true)}
              >
                Claim & Dispatch Driver to Kitchen
              </Button>
            </div>
          )}

          {/* Active Pickups in Transit Mini List */}
          {inTransitList.length > 0 && (
            <div className="bg-surface rounded-card p-4 shadow-soft border border-divider/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-content-secondary block">
                  Active Fleet Pickups in Transit ({inTransitList.length})
                </span>
                <span className="text-[10px] text-emerald-600 font-bold animate-pulse">● Live GPS Tracker</span>
              </div>

              <div className="space-y-2">
                {inTransitList.map((transit) => (
                  <div
                    key={transit.id}
                    className="p-3 rounded-xl border border-divider bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-content-primary block">{transit.kitchen}</span>
                      <span className="text-content-secondary">{transit.vehicle} • ETA {transit.eta}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand bg-white px-2 py-1 rounded border border-divider">
                        OTP: {transit.otp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: FLEET DRIVER DISPATCH ASSIGNMENT */}
      {dispatchModalOpen && selectedAlert && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-soft-lg border border-divider animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-divider">
              <div>
                <h3 className="font-bold text-base text-content-primary">
                  Dispatch Driver to {selectedAlert.kitchen}
                </h3>
                <p className="text-xs text-content-secondary">
                  Surplus: {selectedAlert.qty} ({selectedAlert.meals})
                </p>
              </div>
              <button
                onClick={() => setDispatchModalOpen(false)}
                className="text-content-secondary hover:text-content-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-content-secondary block mb-1.5">
                  Select Fleet Vehicle & Driver
                </label>
                <div className="space-y-2">
                  {fleetVehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedVehicle === v.id
                          ? 'border-brand bg-brand-light/50 shadow-xs'
                          : 'border-divider bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-content-primary block">{v.name}</span>
                        <span className="text-content-secondary">
                          Driver: {v.driver} • Cap: {v.capacity}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-bold text-brand block">ETA {v.etaToSelected}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">{v.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="font-bold text-purple-900 block">Destination Shelter:</span>
                <p className="text-purple-700 text-[11px]">
                  {selectedNgo ? `${selectedNgo.name} (${selectedNgo.distanceNum} km from you)` : 'Hope Children Home'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-divider">
              <Button variant="ghost" onClick={() => setDispatchModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={Check}
                onClick={handleConfirmDispatch}
              >
                Confirm Driver Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
