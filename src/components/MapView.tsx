import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ZoomableImage } from "./ZoomableImage";
import { ScheduleDialog } from "./ScheduleDialog";
import { useLanguage } from "../contexts/LanguageContext";
import { useFormatDistance } from "../utils/formatDistance";

const getImageUrl = (path: string) => `/prototype1${path}`;
type RouteCategory = "bus" | "blue" | "gold";
type Direction = "inbound" | "outbound";
interface RouteStop {
  id: number;
  name: string;
}
interface RouteMap {
  id: string;
  name: string;
  category: RouteCategory;
  imageUrl: string;
  stops: RouteStop[];
}

export function MapView() {
  const { t } = useLanguage();
  const { formatDistance } = useFormatDistance();
  const [selectedCategory, setSelectedCategory] = useState<RouteCategory | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteMap | null>(null);
  const [direction, setDirection] = useState<Direction>("inbound");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  
  const categories = [{
    id: "bus",
    name: t('busRoutes'),
    routes: ROUTE_MAPS.filter(r => r.category === "bus")
  }, {
    id: "blue",
    name: t('blueLineRoute'),
    routes: [{
      id: "501",
      name: "501 - Light Rail - Lynx Blue Line",
      category: "blue",
      imageUrl: getImageUrl("/LightRailLynxBlueLine501.gif"),
      stops: [
        // ... (stops remain unchanged)
      ]
    }]
  }, {
    id: "gold",
    name: t('goldLineRoute'),
    routes: [{
      id: "510",
      name: "510 - CityLYNX Gold Line",
      category: "gold",
      imageUrl: getImageUrl("/CityLynxGoldLine510.gif"),
      stops: [
        // ... (stops remain unchanged)
      ]
    }]
  }];

  const filteredRoutes = selectedCategory ? ROUTE_MAPS.filter(route => route.category === selectedCategory) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-auto">
      <div className="p-4 pb-20">
        {/* CATS Logo */}
        <div className="flex justify-center mb-4">
          <img src={getImageUrl("/logos/CatslogoBW-1024x282.webp")} alt="CATS Logo" className="h-16 object-contain" />
        </div>
        
        {/* Route Categories */}
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#0B4EA2] text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedCategory(category.id as RouteCategory);
                if (category.id === "blue" || category.id === "gold") {
                  const route = category.routes[0];
                  setSelectedRoute({
                    ...route,
                    category: category.id as RouteCategory
                  });
                } else {
                  setSelectedRoute(null);
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selectedCategory === "blue" && (
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-4">
              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('route')}:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>501 - Light Rail - Lynx Blue Line</option>
                </select>
              </div>
              
              {/* Direction Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('direction')}:</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="inbound"
                      checked={direction === "inbound"}
                      onChange={e => setDirection("inbound")}
                      className="mr-2"
                    />
                    {t('inbound')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="outbound"
                      checked={direction === "outbound"}
                      onChange={e => setDirection("outbound")}
                      className="mr-2"
                    />
                    {t('outbound')}
                  </label>
                </div>
              </div>
              
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('day')}:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>{t('weekdays')}</option>
                  <option>{t('saturday')}</option>
                  <option>{t('sunday')}</option>
                </select>
              </div>
              
              {/* Show Schedule Button */}
              <button className="w-full bg-[#0B4EA2] text-white py-3 px-4 rounded-lg font-medium">
                {t('showSchedule')}
              </button>
              
              {/* Map */}
              <div className="mt-4 bg-white rounded-lg overflow-hidden">
                <ZoomableImage
                  src={getImageUrl("/LightRailLynxBlueLine501.gif")}
                  alt="Blue Line Map"
                />
              </div>
              
              {/* Station List */}
              <div className="space-y-2">
                {categories.find(c => c.id === "blue")?.routes[0].stops
                  .sort((a, b) => direction === "inbound" ? a.id - b.id : b.id - a.id)
                  .map(stop => (
                    <div key={stop.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#0B4EA2] text-white rounded-lg flex items-center justify-center font-bold">
                          {stop.id}
                        </div>
                        <span className="text-gray-900">{stop.name}</span>
                      </div>
                      <button
                        className="text-[#0B4EA2] font-bold text-2xl"
                        onClick={() => {
                          setSelectedStop(stop.name);
                          setIsScheduleOpen(true);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {selectedCategory === "gold" && (
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-4">
              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('route')}:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>510 - CityLYNX Gold Line</option>
                </select>
              </div>
              
              {/* Direction Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('direction')}:</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="inbound"
                      checked={direction === "inbound"}
                      onChange={e => setDirection("inbound")}
                      className="mr-2"
                    />
                    {t('inbound')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="outbound"
                      checked={direction === "outbound"}
                      onChange={e => setDirection("outbound")}
                      className="mr-2"
                    />
                    {t('outbound')}
                  </label>
                </div>
              </div>
              
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('day')}:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>{t('weekdays')}</option>
                  <option>{t('saturday')}</option>
                  <option>{t('sunday')}</option>
                </select>
              </div>
              
              {/* Show Schedule Button */}
              <button className="w-full bg-[#0B4EA2] text-white py-3 px-4 rounded-lg font-medium">
                {t('showSchedule')}
              </button>
              
              {/* Map */}
              <div className="mt-4 bg-white rounded-lg overflow-hidden">
                <ZoomableImage
                  src={getImageUrl("/CityLynxGoldLine510.gif")}
                  alt="Gold Line Map"
                />
              </div>
              
              {/* Station List */}
              <div className="space-y-2">
                {categories.find(c => c.id === "gold")?.routes[0].stops
                  .sort((a, b) => direction === "inbound" ? a.id - b.id : b.id - a.id)
                  .map(stop => (
                    <div key={stop.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#0B4EA2] text-white rounded-lg flex items-center justify-center font-bold">
                          {stop.id}
                        </div>
                        <span className="text-gray-900">{stop.name}</span>
                      </div>
                      <button
                        className="text-[#0B4EA2] font-bold text-2xl"
                        onClick={() => {
                          setSelectedStop(stop.name);
                          setIsScheduleOpen(true);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {selectedCategory === "bus" && (
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('route')}:
                </label>
                <select className="w-full p-2 border rounded-md" onChange={e => {
                  const route = ROUTE_MAPS.find(r => r.id === e.target.value);
                  setSelectedRoute(route || null);
                }}>
                  <option value="">{t('selectRoute')}</option>
                  {filteredRoutes.map(route => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('direction')}:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="inbound"
                      checked={direction === "inbound"}
                      onChange={e => setDirection("inbound")}
                      className="mr-2"
                    />
                    {t('inbound')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="direction"
                      value="outbound"
                      checked={direction === "outbound"}
                      onChange={e => setDirection("outbound")}
                      className="mr-2"
                    />
                    {t('outbound')}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('day')}:
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>{t('weekdays')}</option>
                  <option>{t('saturday')}</option>
                  <option>{t('sunday')}</option>
                </select>
              </div>
              <button className="w-full bg-[#0B4EA2] text-white py-2 px-4 rounded-md">
                {t('showSchedule')}
              </button>
            </div>
            {selectedRoute && (
              <>
                <div className="mt-4 bg-white rounded-lg overflow-hidden border">
                  <ZoomableImage
                    src={getImageUrl(selectedRoute.imageUrl)}
                    alt={`Map for ${selectedRoute.name}`}
                  />
                </div>
                <div className="space-y-2">
                  {selectedRoute.stops.map(stop => (
                    <div key={stop.id} className="flex items-center justify-between p-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-bold">
                          {stop.id}
                        </div>
                        <span>{stop.name}</span>
                      </div>
                      <button
                        className="text-[#0B4EA2] font-bold text-xl"
                        onClick={() => {
                          setSelectedStop(stop.name);
                          setIsScheduleOpen(true);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <ScheduleDialog
        isOpen={isScheduleOpen}
        onClose={() => {
          setIsScheduleOpen(false);
          setSelectedStop(null);
        }}
        stopName={selectedStop || ""}
      />
    </div>
  );
}

// Route data
const ROUTE_MAPS: RouteMap[] = [
  // ... (route data remains unchanged)
];
