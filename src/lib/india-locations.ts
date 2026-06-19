export interface CityLocation {
  id: string;
  name: string;
  state: string;
  type: "Tier 1" | "Tier 2" | "Local Hub";
  coordinates: { lat: number; lng: number };
}

export const TARGET_CITIES: CityLocation[] = [
  // Tier 1 - Major IT Hubs (High Value)
  { id: "bangalore", name: "Bangalore", state: "Karnataka", type: "Tier 1", coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", type: "Tier 1", coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: "delhi-ncr", name: "Delhi NCR", state: "Delhi", type: "Tier 1", coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", type: "Tier 1", coordinates: { lat: 17.3850, lng: 78.4867 } },
  { id: "pune", name: "Pune", state: "Maharashtra", type: "Tier 1", coordinates: { lat: 18.5204, lng: 73.8567 } },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", type: "Tier 1", coordinates: { lat: 13.0827, lng: 80.2707 } },
  
  // Tier 2 - Emerging Tech Hubs
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", type: "Tier 2", coordinates: { lat: 23.0225, lng: 72.5714 } },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", type: "Tier 2", coordinates: { lat: 26.9124, lng: 75.7873 } },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", type: "Tier 2", coordinates: { lat: 22.5726, lng: 88.3639 } },

  // Local Hubs - Direct Regional Presence
  { id: "ranchi", name: "Ranchi", state: "Jharkhand", type: "Local Hub", coordinates: { lat: 23.3441, lng: 85.3096 } },
  { id: "dhanbad", name: "Dhanbad", state: "Jharkhand", type: "Local Hub", coordinates: { lat: 23.7957, lng: 86.4304 } },
  { id: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", type: "Local Hub", coordinates: { lat: 22.8046, lng: 86.2029 } },
  { id: "patna", name: "Patna", state: "Bihar", type: "Local Hub", coordinates: { lat: 25.5941, lng: 85.1376 } },
];

export function getCityById(id: string): CityLocation | undefined {
  return TARGET_CITIES.find((c) => c.id === id);
}
