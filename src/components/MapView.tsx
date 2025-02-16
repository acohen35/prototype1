import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ZoomableImage } from "./ZoomableImage";
import { ScheduleDialog } from "./ScheduleDialog";
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
const ROUTE_MAPS: RouteMap[] = [
  {
    id: "bus-1",
    name: "1 - Mt. Holly Road",
    category: "bus",
    imageUrl: "/pasted-image-1737566823748.gif",
    stops: [{
      id: 1,
      name: "Charlotte Transportation Center"
    }, {
      id: 2,
      name: "Rozelles Ferry & Trade"
    }, {
      id: 3,
      name: "Rozelles Ferry & Hoskins"
    }, {
      id: 4,
      name: "Callabridge Commons"
    }, {
      id: 5,
      name: "Hovis & Salem Church"
    }]
  },
  {
    id: "bus-2",
    name: "2 - Ashley/Scaleybark Crosstown",
    category: "bus",
    imageUrl: "/AshleyPark-Scaleybark.gif",
    stops: [{
      id: 1,
      name: "SouthPark Mall"
    }, {
      id: 2,
      name: "Park Road Shopping Center"
    }, {
      id: 3,
      name: "Scaleybark Station"
    }]
  },
  {
    id: "bus-3",
    name: "3 - The Plaza",
    category: "bus",
    imageUrl: "/ThePlaza3.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-4",
    name: "4 - Belmont",
    category: "bus",
    imageUrl: "/ToUptownCharlotte4.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-5",
    name: "5 - Airport",
    category: "bus",
    imageUrl: "/Airport5.gif",
    stops: [{ id: 1, name: "Charlotte Douglas Airport" }]
  },
  {
    id: "bus-6",
    name: "6 - Kings Drive",
    category: "bus",
    imageUrl: "/KingsDrive6.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-7",
    name: "7 - Beatties Ford",
    category: "bus",
    imageUrl: "/BeattiesFord7.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-8",
    name: "8 - Tuckaseegee Road",
    category: "bus",
    imageUrl: "/TuckaseegeeRd8.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-9",
    name: "9 - Central Avenue",
    category: "bus",
    imageUrl: "/CentralAVE9.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-10",
    name: "10 - West Boulevard",
    category: "bus",
    imageUrl: "/WestBoulevard10.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-11",
    name: "11 - North Tryon",
    category: "bus",
    imageUrl: "/NorthTryon11.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-12",
    name: "12 - South Boulevard",
    category: "bus",
    imageUrl: "/SouthBlvd12.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-13",
    name: "13 - Nevin Road",
    category: "bus",
    imageUrl: "/NevinRd13.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-14",
    name: "14 - Providence Road",
    category: "bus",
    imageUrl: "/ProvidenceRoad14.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-15",
    name: "15 - Randolph Road",
    category: "bus",
    imageUrl: "/RandolphRd15.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-16",
    name: "16 - South Tryon",
    category: "bus",
    imageUrl: "/SouthTryon16.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-17",
    name: "17 - Commonwealth Avenue",
    category: "bus",
    imageUrl: "/CommonwealthAve17.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-18",
    name: "18 - Paw Creek/Rosa Parks Crosstown",
    category: "bus",
    imageUrl: "/PawCreek-RosaParks18.gif",
    stops: [{ id: 1, name: "Rosa Parks Place" }]
  },
  {
    id: "bus-19",
    name: "19 - Park Road",
    category: "bus",
    imageUrl: "/ParkRoad19.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-20",
    name: "20 - Sharon Road",
    category: "bus",
    imageUrl: "/QueensRd20.gif",
    stops: [{ id: 1, name: "SouthPark Transit Center" }]
  },
  {
    id: "bus-21",
    name: "21 - Statesville Ave",
    category: "bus",
    imageUrl: "/StatesvilleAve21.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-22",
    name: "22 - Graham Street",
    category: "bus",
    imageUrl: "/GrahamSt22.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-23",
    name: "23 - Shamrock Drive",
    category: "bus",
    imageUrl: "/ShamrockDr23.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-24",
    name: "24 - Nations Ford Road",
    category: "bus",
    imageUrl: "/NationsFordRd24.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-26",
    name: "26 - Oaklawn Avenue",
    category: "bus",
    imageUrl: "/OaklawnAve26.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-27",
    name: "27 - Monroe Road",
    category: "bus",
    imageUrl: "/MonroeRd27.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-28",
    name: "28 - Fairview Road",
    category: "bus",
    imageUrl: "/FairviewRd28.gif",
    stops: [{ id: 1, name: "SouthPark Transit Center" }]
  },
  {
    id: "bus-29",
    name: "29 - UNCC/JW Clay",
    category: "bus",
    imageUrl: "/UNCCharlotte-JWClay29.gif",
    stops: [{ id: 1, name: "JW Clay Station" }]
  },
  {
    id: "bus-30",
    name: "30 - Woodlawn/Scaleybark/Crosstown",
    category: "bus",
    imageUrl: "/WoodlawnCrosstown30.gif",
    stops: [{ id: 1, name: "Scaleybark Station" }]
  },
  {
    id: "bus-34",
    name: "34 - Freedom Drive",
    category: "bus",
    imageUrl: "/FreedomDrive34.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-35",
    name: "35 - Wilkinson-Amazon",
    category: "bus",
    imageUrl: "/WilkinsonBLVD35.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-39",
    name: "39 - Eastway",
    category: "bus",
    imageUrl: "/Eastway39.gif",
    stops: [{ id: 1, name: "Eastway Transit Center" }]
  },
  {
    id: "bus-40x",
    name: "40x - Lawyers Road Express",
    category: "bus",
    imageUrl: "/LawyersRD40.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-41x",
    name: "41x - Steele Creek Express",
    category: "bus",
    imageUrl: "/SteeleCreek41x.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-42",
    name: "42 - Carowinds",
    category: "bus",
    imageUrl: "/CarowindsBlvd42.gif",
    stops: [{ id: 1, name: "Carowinds" }]
  },
  {
    id: "bus-43",
    name: "43 - Ballantyne",
    category: "bus",
    imageUrl: "/Ballantyne43.gif",
    stops: [{ id: 1, name: "Ballantyne" }]
  },
  {
    id: "bus-46x",
    name: "46x - Harrisburg Road Express",
    category: "bus",
    imageUrl: "/HarrisburgRoad46x.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-47x",
    name: "47x - Huntersville Greenhouses Express",
    category: "bus",
    imageUrl: "/Greenhouse47x.gif",
    stops: [{ id: 1, name: "Huntersville" }]
  },
  {
    id: "bus-48x",
    name: "48x - Northcross Express",
    category: "bus",
    imageUrl: "/Northcross48x.gif",
    stops: [{ id: 1, name: "Northcross" }]
  },
  {
    id: "bus-50",
    name: "50 - URP/CIC",
    category: "bus",
    imageUrl: "/URPCIC50.gif",
    stops: [{ id: 1, name: "University Research Park" }]
  },
  {
    id: "bus-51",
    name: "51 - Pineville-Matthews Road",
    category: "bus",
    imageUrl: "/pinevilleMatthewsRd51.gif",
    stops: [{ id: 1, name: "Pineville" }]
  },
  {
    id: "bus-52x",
    name: "52x - Idlewild Road Express",
    category: "bus",
    imageUrl: "/IdlewildRd52x.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-53x",
    name: "53x - Northlake Express",
    category: "bus",
    imageUrl: "/Northlake53x.gif",
    stops: [{ id: 1, name: "Northlake Mall" }]
  },
  {
    id: "bus-54",
    name: "54 - University Research Park",
    category: "bus",
    imageUrl: "/UniversityResearchPark54.gif",
    stops: [{ id: 1, name: "University Research Park" }]
  },
  {
    id: "bus-55",
    name: "55 - Westinghouse",
    category: "bus",
    imageUrl: "/Westinghouse55.gif",
    stops: [{ id: 1, name: "Westinghouse" }]
  },
  {
    id: "bus-56",
    name: "56 - Arrowood",
    category: "bus",
    imageUrl: "/Arrowood56.gif",
    stops: [{ id: 1, name: "Arrowood Station" }]
  },
  {
    id: "bus-57",
    name: "57 - Archdale/South Park",
    category: "bus",
    imageUrl: "/ArchdaleSouthPark57.gif",
    stops: [{ id: 1, name: "SouthPark Transit Center" }]
  },
  {
    id: "bus-58",
    name: "58 - Pineville",
    category: "bus",
    imageUrl: "/Pineville58.gif",
    stops: [{ id: 1, name: "Pineville" }]
  },
  {
    id: "bus-59",
    name: "59 - North Meck Connector",
    category: "bus",
    imageUrl: "/NorthMeckConnector59.gif",
    stops: [{ id: 1, name: "Northlake Mall" }]
  },
  {
    id: "bus-60",
    name: "60 - Tyvola Road",
    category: "bus",
    imageUrl: "/Tyvola60.gif",
    stops: [{ id: 1, name: "Tyvola Station" }]
  },
  {
    id: "bus-61x",
    name: "61x - Arboretum Express",
    category: "bus",
    imageUrl: "/Arboretum61x.gif",
    stops: [{ id: 1, name: "Arboretum" }]
  },
  {
    id: "bus-62x",
    name: "62x - Rea Road Express",
    category: "bus",
    imageUrl: "/ReaRoad62x.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-63x",
    name: "63x - Huntersville Express",
    category: "bus",
    imageUrl: "/Huntersville63x.gif",
    stops: [{ id: 1, name: "Huntersville" }]
  },
  {
    id: "bus-64x",
    name: "64x - Independence Blvd Express",
    category: "bus",
    imageUrl: "/IndependenceBlvd64x.gif",
    stops: [{ id: 1, name: "Uptown Transit Center" }]
  },
  {
    id: "bus-74x",
    name: "74x - Union County Express",
    category: "bus",
    imageUrl: "/UnionCounty74x.gif",
    stops: [{ id: 1, name: "Union County" }]
  },
  {
    id: "bus-77x",
    name: "77x - North Mecklenburg Express",
    category: "bus",
    imageUrl: "/NorthMeck77x.gif",
    stops: [{ id: 1, name: "North Mecklenburg" }]
  },
  {
    id: "bus-82x",
    name: "82x - Rock Hill Express",
    category: "bus",
    imageUrl: "/RockHill82x.gif",
    stops: [{ id: 1, name: "Rock Hill" }]
  },
  {
    id: "bus-85x",
    name: "85x - Gastonia Express",
    category: "bus",
    imageUrl: "/Gastonia85x.gif",
    stops: [{ id: 1, name: "Gastonia" }]
  },
  {
    id: "bus-88x",
    name: "88x - Mountain Island Express",
    category: "bus",
    imageUrl: "/MountainIsland88x.gif",
    stops: [{ id: 1, name: "Mountain Island" }]
  },
  {
    id: "bus-97",
    name: "97 - Village Rider-Cornelius",
    category: "bus",
    imageUrl: "/VillageRider97.gif",
    stops: [{ id: 1, name: "Cornelius" }]
  },
  {
    id: "bus-98",
    name: "98 - Village Rider-McCoy Road",
    category: "bus",
    imageUrl: "/VillageRiderMccoyRd98.gif",
    stops: [{ id: 1, name: "McCoy Road" }]
  },
  {
    id: "bus-99",
    name: "99 - Village Rider-Huntersville",
    category: "bus",
    imageUrl: "/VillageRiderHuntersville99.gif",
    stops: [{ id: 1, name: "Huntersville" }]
  },
  {
    id: "bus-211",
    name: "211 - Hidden Valley",
    category: "bus",
    imageUrl: "/HiddenValley211.gif",
    stops: [{ id: 1, name: "Hidden Valley" }]
  },
  {
    id: "bus-221",
    name: "221 - E. Harris Blvd-Idlewild Rd",
    category: "bus",
    imageUrl: "/EharrisBlvd-Idlewild221.gif",
    stops: [{ id: 1, name: "Harris Boulevard" }]
  },
  {
    id: "bus-222",
    name: "222 - Pence Road",
    category: "bus",
    imageUrl: "/PenceRd222.gif",
    stops: [{ id: 1, name: "Pence Road" }]
  },
  {
    id: "bus-235",
    name: "235 - West Charlotte Connector",
    category: "bus",
    imageUrl: "/WestCharlotteConnector235.gif",
    stops: [{ id: 1, name: "West Charlotte" }]
  },
  {
    id: "bus-290",
    name: "290 - Davidson Shuttle",
    category: "bus",
    imageUrl: "/DavidsonShuttle290.gif",
    stops: [{ id: 1, name: "Davidson" }]
  }
];
export function MapView() {
  const [selectedCategory, setSelectedCategory] = useState<RouteCategory | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteMap | null>(null);
  const [direction, setDirection] = useState<Direction>("inbound");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const categories = [{
    id: "bus",
    name: "Bus Routes",
    routes: ROUTE_MAPS.filter(r => r.category === "bus")
  }, {
    id: "blue",
    name: "Blue Line Route",
    routes: [{
      id: "501",
      name: "501 - Light Rail - Lynx Blue Line",
      category: "blue",
      imageUrl: "/LightRailLynxBlueLine501.gif",
      stops: [
        { id: 1, name: "UNC Charlotte Main Station" },
        { id: 2, name: "JW Clay Blvd Station" },
        { id: 3, name: "McCullough Station" },
        { id: 4, name: "University City Blvd Station" },
        { id: 5, name: "Tom Hunter Station" },
        { id: 6, name: "Old Concord Road Station" },
        { id: 7, name: "Sugar Creek Station" },
        { id: 8, name: "36th St Station" },
        { id: 9, name: "25th St Station" },
        { id: 10, name: "Parkwood Station" },
        { id: 11, name: "9th Street Station" },
        { id: 12, name: "7th Street Station" },
        { id: 13, name: "CTC Station/Arena" },
        { id: 14, name: "3rd Street Station" },
        { id: 15, name: "Brooklyn Village Station" },
        { id: 16, name: "LYNX Carson Station" },
        { id: 17, name: "Bland Street Station" },
        { id: 18, name: "LYNX East/West Blvd Station" },
        { id: 19, name: "New Bern Station" },
        { id: 20, name: "LYNX Scaleybark Station" },
        { id: 21, name: "LYNX Woodlawn Station" },
        { id: 22, name: "LYNX Tyvola Station" },
        { id: 23, name: "LYNX Archdale Station" },
        { id: 24, name: "LYNX Arrowood Station" },
        { id: 25, name: "LYNX Sharon Rd West Station" },
        { id: 26, name: "LYNX I-485 Station" }
      ]
    }]
  }, {
    id: "gold",
    name: "Gold Line Route",
    routes: [{
      id: "510",
      name: "510 - CityLYNX Gold Line",
      category: "gold",
      imageUrl: "/CityLynxGoldLine510.gif",
      stops: [
        { id: 1, name: "French St Station (CityLYNX)" },
        { id: 2, name: "Johnson & Wales" },
        { id: 3, name: "CTC Station/Arena" },
        { id: 4, name: "Elizabeth & Hawthorne" },
        { id: 5, name: "Sunnyside Station (CityLYNX)" }
      ]
    }]
  }];
  const filteredRoutes = selectedCategory ? ROUTE_MAPS.filter(route => route.category === selectedCategory) : [];
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-auto">
      <div className="p-4 pb-20">
        {/* CATS Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logos/CatslogoBW-1024x282.webp" alt="CATS Logo" className="h-16 object-contain" />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Route:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>501 - Light Rail - Lynx Blue Line</option>
                </select>
              </div>
              
              {/* Direction Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direction:</label>
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
                    UNC Charlotte Main Station
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
                    I-485/S.Blvd. Station
                  </label>
                </div>
              </div>
              
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>WEEKDAYS / DE LUNES A VIERNES</option>
                  <option>SATURDAY / SÁBADO</option>
                  <option>SUNDAY / DOMINGO</option>
                </select>
              </div>
              
              {/* Show Schedule Button */}
              <button className="w-full bg-[#0B4EA2] text-white py-3 px-4 rounded-lg font-medium">
                Show Schedule
              </button>
              
              {/* Map */}
              <div className="mt-4 bg-white rounded-lg overflow-hidden">
                <ZoomableImage
                  src="/LightRailLynxBlueLine501.gif"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Route:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>510 - CityLYNX Gold Line</option>
                </select>
              </div>
              
              {/* Direction Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direction:</label>
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
                    UNC Charlotte Main Station
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
                    I-485/S.Blvd. Station
                  </label>
                </div>
              </div>
              
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day:</label>
                <select className="w-full p-3 border rounded-lg bg-white">
                  <option>WEEKDAYS / DE LUNES A VIERNES</option>
                  <option>SATURDAY / SÁBADO</option>
                  <option>SUNDAY / DOMINGO</option>
                </select>
              </div>
              
              {/* Show Schedule Button */}
              <button className="w-full bg-[#0B4EA2] text-white py-3 px-4 rounded-lg font-medium">
                Show Schedule
              </button>
              
              {/* Map */}
              <div className="mt-4 bg-white rounded-lg overflow-hidden">
                <ZoomableImage
                  src="/CityLynxGoldLine510.gif"
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
                       className="w-8 h-8 bg-[#0B4EA2] text-white rounded-lg flex items-center justify-center font-bold"
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
        
        {selectedCategory === "bus" && <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route:
                </label>
                <select className="w-full p-2 border rounded-md" onChange={e => {
              const route = ROUTE_MAPS.find(r => r.id === e.target.value);
              setSelectedRoute(route || null);
            }}>
                  <option value="">Select a route</option>
                  {filteredRoutes.map(route => <option key={route.id} value={route.id}>
                      {route.name}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direction:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="direction" value="inbound" checked={direction === "inbound"} onChange={e => setDirection("inbound")} className="mr-2" />
                    Inbound
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="direction" value="outbound" checked={direction === "outbound"} onChange={e => setDirection("outbound")} className="mr-2" />
                    Outbound
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day:
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>WEEKDAYS / DE LUNES A VIERNES</option>
                  <option>SATURDAY / SÁBADO</option>
                  <option>SUNDAY / DOMINGO</option>
                </select>
              </div>
              <button className="w-full bg-[#0B4EA2] text-white py-2 px-4 rounded-md">
                Show Schedule
              </button>
            </div>
            {selectedRoute && <>
                <div className="mt-4 bg-white rounded-lg overflow-hidden border">
                  <ZoomableImage src={selectedRoute.imageUrl} alt={`Map for ${selectedRoute.name}`} />
                </div>
                <div className="space-y-2">
                  {selectedRoute.stops.map(stop => <div key={stop.id} className="flex items-center justify-between p-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-bold">
                          {stop.id}
                        </div>
                        <span>{stop.name}</span>
                      </div>
                      <button className="text-[#0B4EA2] font-bold text-xl" onClick={() => {
                setSelectedStop(stop.name);
                setIsScheduleOpen(true);
              }}>
                        +
                      </button>
                    </div>)}
                </div>
              </>}
          </div>}
      </div>
      <ScheduleDialog isOpen={isScheduleOpen} onClose={() => {
      setIsScheduleOpen(false);
      setSelectedStop(null);
    }} stopName={selectedStop || ""} />
   </div>
 );
}