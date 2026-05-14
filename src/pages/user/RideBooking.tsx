import React from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Navigation, Bike, Car, Clock, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 12.9716, // Bangalore
  lng: 77.5946,
};

const RIDE_TYPES = [
  { id: 'bike', name: 'Bike', icon: Bike, baseFare: 40, perKm: 8, time: '2 mins' },
  { id: 'auto', name: 'Auto', icon: Navigation, baseFare: 60, perKm: 12, time: '4 mins' },
  { id: 'mini', name: 'Mini', icon: Car, baseFare: 100, perKm: 15, time: '5 mins' },
  { id: 'sedan', name: 'Sedan', icon: Car, baseFare: 130, perKm: 18, time: '7 mins' },
];

export default function RideBooking() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const [pickup, setPickup] = React.useState<any>(null);
  const [destination, setDestination] = React.useState<any>(null);
  const [directions, setDirections] = React.useState<any>(null);
  const [selectedType, setSelectedType] = React.useState(RIDE_TYPES[0]);
  const [isSearching, setIsSearching] = React.useState(false);

  const calculateRoute = async () => {
    if (!pickup || !destination) return;
    
    // In a real app, we'd use the DirectionsService
    // For demo, we'll simulate a route
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success('Route calculated!');
    }, 1500);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-64px)] relative flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] bg-white z-10 shadow-2xl overflow-y-auto order-2 md:order-1 border-r border-slate-100">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Where to?</h1>
          
          <div className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
              <Autocomplete onPlaceChanged={() => setPickup({ lat: 12.98, lng: 77.6 })}>
                <input 
                  type="text" 
                  placeholder="Enter pickup point" 
                  className="w-full pl-10 pr-4 py-4 bg-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] outline-none transition-all"
                />
              </Autocomplete>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <Autocomplete onPlaceChanged={() => setDestination({ lat: 12.99, lng: 77.62 })}>
                <input 
                  type="text" 
                  placeholder="Enter destination" 
                  className="w-full pl-10 pr-4 py-4 bg-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] outline-none transition-all"
                />
              </Autocomplete>
            </div>
            
            <button 
              onClick={calculateRoute}
              className="w-full btn-primary py-4 mt-2"
            >
              Check Fares
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Rides</h2>
            {RIDE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`w-full p-4 rounded-[24px] border-2 transition-all flex items-center justify-between ${
                  selectedType.id === type.id 
                  ? 'border-[#FF6B00] bg-orange-50/50 shadow-lg shadow-orange-500/5' 
                  : 'border-slate-50 hover:border-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedType.id === type.id ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <type.icon size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">{type.name}</p>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {type.time} away
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-lg">₹{type.baseFare + 150}</p>
                  <p className="text-[10px] font-black text-slate-300 uppercase">Incl. tax</p>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-bold mt-8 hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
            Confirm Booking with <CreditCard size={20} />
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 h-full order-1 md:order-2">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={{
            disableDefaultUI: true,
            styles: [
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{ "visibility": "on" }]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }, { "lightness": "20" }]
              }
            ]
          }}
        >
          {pickup && <Marker position={pickup} label="A" />}
          {destination && <Marker position={destination} label="B" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        {/* Floating Search Overlay */}
        <AnimatePresence>
          {isSearching && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 text-white rounded-full flex items-center gap-3 shadow-2xl z-20"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold tracking-tight">Finding nearby partners...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
