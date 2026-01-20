"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSun, Wind, Droplets, Thermometer } from "lucide-react";

type WeatherData = {
  city: string;
  country: string;
  temp: number;
  condition: "sunny" | "cloudy" | "partly-cloudy" | "rainy";
  humidity: number;
  wind: number;
  high: number;
  low: number;
};

// Simulated weather data for African cities and capitals
const cityWeatherData: Record<string, WeatherData> = {
  // West Africa
  lagos: { city: "Lagos", country: "Nigeria", temp: 31, condition: "partly-cloudy", humidity: 78, wind: 12, high: 33, low: 26 },
  accra: { city: "Accra", country: "Ghana", temp: 30, condition: "sunny", humidity: 72, wind: 10, high: 32, low: 25 },
  dakar: { city: "Dakar", country: "Senegal", temp: 27, condition: "sunny", humidity: 65, wind: 14, high: 29, low: 22 },
  abidjan: { city: "Abidjan", country: "Côte d'Ivoire", temp: 29, condition: "partly-cloudy", humidity: 75, wind: 11, high: 31, low: 24 },
  bamako: { city: "Bamako", country: "Mali", temp: 35, condition: "sunny", humidity: 25, wind: 9, high: 38, low: 24 },
  ouagadougou: { city: "Ouagadougou", country: "Burkina Faso", temp: 34, condition: "sunny", humidity: 22, wind: 10, high: 37, low: 25 },
  conakry: { city: "Conakry", country: "Guinea", temp: 28, condition: "partly-cloudy", humidity: 78, wind: 13, high: 30, low: 24 },
  freetown: { city: "Freetown", country: "Sierra Leone", temp: 29, condition: "rainy", humidity: 82, wind: 12, high: 31, low: 24 },
  monrovia: { city: "Monrovia", country: "Liberia", temp: 28, condition: "rainy", humidity: 80, wind: 11, high: 30, low: 23 },
  
  // North Africa
  cairo: { city: "Cairo", country: "Egypt", temp: 28, condition: "sunny", humidity: 35, wind: 15, high: 30, low: 18 },
  marrakech: { city: "Marrakech", country: "Morocco", temp: 26, condition: "sunny", humidity: 40, wind: 18, high: 29, low: 16 },
  rabat: { city: "Rabat", country: "Morocco", temp: 22, condition: "partly-cloudy", humidity: 65, wind: 16, high: 24, low: 15 },
  tunis: { city: "Tunis", country: "Tunisia", temp: 25, condition: "sunny", humidity: 55, wind: 14, high: 28, low: 17 },
  algiers: { city: "Algiers", country: "Algeria", temp: 23, condition: "partly-cloudy", humidity: 60, wind: 17, high: 26, low: 16 },
  tripoli: { city: "Tripoli", country: "Libya", temp: 27, condition: "sunny", humidity: 50, wind: 18, high: 30, low: 19 },
  
  // East Africa
  nairobi: { city: "Nairobi", country: "Kenya", temp: 22, condition: "cloudy", humidity: 65, wind: 8, high: 24, low: 14 },
  addisababa: { city: "Addis Ababa", country: "Ethiopia", temp: 20, condition: "rainy", humidity: 75, wind: 6, high: 22, low: 11 },
  kigali: { city: "Kigali", country: "Rwanda", temp: 23, condition: "partly-cloudy", humidity: 68, wind: 9, high: 26, low: 16 },
  daressalaam: { city: "Dar es Salaam", country: "Tanzania", temp: 29, condition: "partly-cloudy", humidity: 80, wind: 16, high: 31, low: 24 },
  kampala: { city: "Kampala", country: "Uganda", temp: 24, condition: "rainy", humidity: 72, wind: 7, high: 27, low: 17 },
  bujumbura: { city: "Bujumbura", country: "Burundi", temp: 25, condition: "partly-cloudy", humidity: 70, wind: 8, high: 28, low: 18 },
  mogadishu: { city: "Mogadishu", country: "Somalia", temp: 30, condition: "sunny", humidity: 70, wind: 15, high: 32, low: 25 },
  djibouti: { city: "Djibouti", country: "Djibouti", temp: 33, condition: "sunny", humidity: 55, wind: 20, high: 36, low: 27 },
  
  // Southern Africa
  capetown: { city: "Cape Town", country: "South Africa", temp: 19, condition: "partly-cloudy", humidity: 70, wind: 22, high: 21, low: 12 },
  johannesburg: { city: "Johannesburg", country: "South Africa", temp: 21, condition: "sunny", humidity: 45, wind: 12, high: 24, low: 12 },
  pretoria: { city: "Pretoria", country: "South Africa", temp: 22, condition: "sunny", humidity: 40, wind: 11, high: 25, low: 13 },
  windhoek: { city: "Windhoek", country: "Namibia", temp: 24, condition: "sunny", humidity: 25, wind: 14, high: 28, low: 14 },
  gaborone: { city: "Gaborone", country: "Botswana", temp: 26, condition: "sunny", humidity: 30, wind: 13, high: 30, low: 15 },
  lusaka: { city: "Lusaka", country: "Zambia", temp: 25, condition: "partly-cloudy", humidity: 50, wind: 10, high: 28, low: 16 },
  harare: { city: "Harare", country: "Zimbabwe", temp: 23, condition: "sunny", humidity: 45, wind: 11, high: 26, low: 13 },
  maputo: { city: "Maputo", country: "Mozambique", temp: 27, condition: "partly-cloudy", humidity: 75, wind: 15, high: 29, low: 21 },
  
  // Central Africa
  kinshasa: { city: "Kinshasa", country: "DR Congo", temp: 28, condition: "rainy", humidity: 78, wind: 8, high: 31, low: 22 },
  brazzaville: { city: "Brazzaville", country: "Republic of Congo", temp: 28, condition: "rainy", humidity: 77, wind: 9, high: 30, low: 22 },
  libreville: { city: "Libreville", country: "Gabon", temp: 27, condition: "rainy", humidity: 85, wind: 10, high: 29, low: 23 },
  yaounde: { city: "Yaoundé", country: "Cameroon", temp: 26, condition: "rainy", humidity: 80, wind: 7, high: 28, low: 20 },
  bangui: { city: "Bangui", country: "Central African Republic", temp: 29, condition: "partly-cloudy", humidity: 65, wind: 8, high: 32, low: 21 },
  ndjamena: { city: "N'Djamena", country: "Chad", temp: 36, condition: "sunny", humidity: 20, wind: 11, high: 39, low: 25 },
};

const WeatherIcon = ({ condition, className = "w-10 h-10" }: { condition: string; className?: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${className} text-safari-gold`} />;
    case "cloudy":
      return <Cloud className={`${className} text-slate-400`} />;
    case "partly-cloudy":
      return <CloudSun className={`${className} text-safari-gold`} />;
    case "rainy":
      return <CloudRain className={`${className} text-ocean-blue`} />;
    default:
      return <Sun className={`${className} text-safari-gold`} />;
  }
};

type WeatherWidgetProps = {
  city?: string;
  countryCode?: string;
  compact?: boolean;
};

export function WeatherWidget({ city = "Lagos", countryCode, compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("lagos");

  useEffect(() => {
    // Convert city name to key (e.g., "Cape Town" -> "capetown")
    const cityKey = city.toLowerCase().replace(/\s+/g, '');
    const data = cityWeatherData[cityKey] || cityWeatherData.lagos;
    setWeather(data);
  }, [city]);

  if (!weather) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        <WeatherIcon condition={weather.condition} className="w-8 h-8" />
        <div>
          <p className="font-medium text-sm">{weather.city}</p>
          <p className="text-2xl font-bold">{weather.temp}°C</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-ocean-blue to-savanna-green p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-medium mb-1">{weather.city}, {weather.country}</p>
            <p className="text-5xl font-bold mt-2">{weather.temp}°C</p>
            <p className="text-white/80 capitalize mt-1">{weather.condition.replace("-", " ")}</p>
          </div>
          <WeatherIcon condition={weather.condition} className="w-16 h-16 text-white/90" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs">High/Low</span>
            </div>
            <p className="font-semibold">{weather.high}° / {weather.low}°</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-xs">Humidity</span>
            </div>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-xs">Wind</span>
            </div>
            <p className="font-semibold">{weather.wind} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Multi-city weather grid
export function WeatherGrid() {
  const cities = ["lagos", "cairo", "nairobi", "capetown", "accra", "kigali"];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cities.map((cityKey) => {
        const weather = cityWeatherData[cityKey];
        return (
          <Card key={cityKey} className="p-4 text-center hover:shadow-lg transition-shadow">
            <WeatherIcon condition={weather.condition} className="w-10 h-10 mx-auto mb-2" />
            <p className="font-medium text-sm">{weather.city}</p>
            <p className="text-2xl font-bold">{weather.temp}°C</p>
            <p className="text-xs text-muted-foreground capitalize">{weather.condition.replace("-", " ")}</p>
          </Card>
        );
      })}
    </div>
  );
}
