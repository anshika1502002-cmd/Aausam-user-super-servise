import React from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Navigation, Bike, Car, Clock, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createRideRequest } from '../../services/firebaseService';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.user);
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
  const [isBooking, setIsBooking] = React.useState(false);

  const pickupAutocomplete = React.useRef<google.maps.places.Autocomplete | null>(null);
  const destAutocomplete = React.useRef<google.maps.places.Autocomplete | null>(null);

  const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
    pickupAutocomplete.current = autocomplete;
  };

  const onDestLoad = (autocomplete: google.maps.places.Autocomplete) => {
    destAutocomplete.current = autocomplete;
  };

  const onPickupChanged = () => {
    if (pickupAutocomplete.current) {
      const place = pickupAutocomplete.current.getPlace();
      if (place.geometry && place.geometry.location) {
        setPickup({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        });
      }
    }
  };

  const onDestChanged = () => {
    if (destAutocomplete.current) {
      const place = destAutocomplete.current.getPlace();
      if (place.geometry && place.geometry.location) {
        setDestination({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        });
      }
    }
  };

  const calculateRoute = async () => {
    if (!pickup || !destination) {
      toast.error('Select both pickup and destination');
      return;
    }
    
    setIsSearching(true);
    const directionsService = new google.maps.DirectionsService();
    try {
      const result = await directionsService.route({
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirections(result);
      toast.success('Route found!');
    } catch (err) {
      toast.error('Could not calculate route');
    } finally {
      setIsSearching(false);
    }
  };

  const handleBooking = async () => {
    if (!profile) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    if (!pickup || !destination) {
      toast.error('Please select pickup and destination');
      return;
    }

    setIsBooking(true);
    try {
      const rideId = await createRideRequest({
        userId: profile.uid,
        pickup,
        destination,
        type: selectedType.id,
        fare: selectedType.baseFare + 150, // This could be more dynamic
        userName: profile.displayName,
      });

      if (rideId) {
        toast.success('Ride Booked Successfully!');
        // We could redirect to a tracking page here
        // navigate(`/user/ride/${rideId}`);
      }
    } catch (error) {
      // Error handled by service
    } finally {
      setIsBooking(false);
    }
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
              <Autocomplete onLoad={onPickupLoad} onPlaceChanged={onPickupChanged}>
                <input 
                  type="text" 
                  placeholder="Enter pickup point" 
                  className="w-full pl-10 pr-4 py-4 bg-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] outline-none transition-all"
                />
              </Autocomplete>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <Autocomplete onLoad={onDestLoad} onPlaceChanged={onDestChanged}>
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

          <button 
            onClick={handleBooking}
            disabled={isBooking || !pickup || !destination}
            className="w-full py-5 bg-slate-900 text-white disabled:bg-slate-300 rounded-[24px] font-bold mt-8 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
          >
            {isBooking ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Confirm Booking with <CreditCard size={20} /></>
            )}
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
