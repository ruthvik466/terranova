import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, MapPin, Truck, Clock } from 'lucide-react';

interface GPSTrackerProps {
  onBack: () => void;
}

interface TruckData {
  id: number;
  name: string;
  location: string;
  eta: string;
  status: 'on-route' | 'arrived' | 'delayed';
  lat: number;
  lng: number;
}

export function GPSTracker({ onBack }: GPSTrackerProps) {
  const [trucks, setTrucks] = useState<TruckData[]>([
    {
      id: 1,
      name: 'Truck Alpha',
      location: '2.5 km away',
      eta: '15 mins',
      status: 'on-route',
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 2,
      name: 'Truck Beta',
      location: '5.8 km away',
      eta: '30 mins',
      status: 'on-route',
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 3,
      name: 'Truck Gamma',
      location: 'At your location',
      eta: 'Now',
      status: 'arrived',
      lat: 40.7306,
      lng: -73.9352
    }
  ]);

  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [nearbyFactories, setNearbyFactories] = useState([
    { name: 'Green Recycling Facility', distance: '3.2 km', type: 'General Recycling' },
    { name: 'EcoWaste Processing Center', distance: '5.7 km', type: 'Organic Waste' },
    { name: 'TechRecycle Hub', distance: '8.1 km', type: 'E-Waste' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return 'bg-blue-500';
      case 'arrived': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <h2>GPS Tracker</h2>
        <p className="text-muted-foreground">Track waste collection trucks in real-time</p>
      </div>

      {/* Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-2" />
                <p>Map View</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Showing trucks in your area
                </p>
              </div>
            </div>
            
            {/* Truck markers */}
            <div className="absolute top-10 left-10 animate-pulse">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="absolute top-20 right-20 animate-pulse">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trucks List */}
      <div className="mb-6">
        <h3 className="mb-4">Active Trucks</h3>
        <div className="space-y-3">
          {trucks.map((truck) => (
            <Card
              key={truck.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTruck(selectedTruck?.id === truck.id ? null : truck)}
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(truck.status)}`} />
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{truck.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                        {truck.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{truck.eta}</span>
                    </div>
                  </div>
                </div>
                
                {selectedTruck?.id === truck.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p style={{ fontSize: '0.875rem' }}>
                      Status: <span className="capitalize">{truck.status.replace('-', ' ')}</span>
                    </p>
                    <p style={{ fontSize: '0.875rem' }}>
                      Coordinates: {truck.lat.toFixed(4)}, {truck.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Recycling Facilities */}
      <div>
        <h3 className="mb-4">Nearby Recycling Facilities</h3>
        <div className="space-y-3">
          {nearbyFactories.map((factory, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span style={{ fontSize: '1.25rem' }}>🏭</span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{factory.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                        {factory.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: '0.875rem' }}>{factory.distance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
