import React, { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BLUE_LINE_STATIONS = [{
  id: 1,
  name: "UNC Charlotte Station"
}, {
  id: 2,
  name: "JW Clay Blvd Station"
}, {
  id: 3,
  name: "McCullough Station"
}, {
  id: 4,
  name: "University City Blvd Station"
}, {
  id: 5,
  name: "Tom Hunter Station"
}, {
  id: 6,
  name: "Old Concord Road Station"
}, {
  id: 7,
  name: "Sugar Creek Station"
}, {
  id: 8,
  name: "36th St Station"
}, {
  id: 9,
  name: "25th St Station"
}, {
  id: 10,
  name: "Parkwood Station"
}, {
  id: 11,
  name: "9th Street Station"
}, {
  id: 12,
  name: "7th Street Station"
}, {
  id: 13,
  name: "CTC Station/Arena"
}, {
  id: 14,
  name: "3rd Street Station"
}, {
  id: 15,
  name: "Brooklyn Village Station"
}, {
  id: 16,
  name: "LYNX Carson Station"
}, {
  id: 17,
  name: "Bland Street Station"
}, {
  id: 18,
  name: "LYNX East/West Blvd Station"
}, {
  id: 19,
  name: "New Bern Station"
}, {
  id: 20,
  name: "LYNX Scaleybark Station"
}, {
  id: 21,
  name: "LYNX Woodlawn Station"
}, {
  id: 22,
  name: "LYNX Tyvola Station"
}, {
  id: 23,
  name: "LYNX Archdale Station"
}, {
  id: 24,
  name: "LYNX Arrowood Station"
}, {
  id: 25,
  name: "LYNX Sharon Rd West Station"
}, {
  id: 26,
  name: "LYNX I-485 Station"
}];

const GOLD_LINE_STATIONS = [{
  id: 1,
  name: "French St Station (CityLYNX)"
}, {
  id: 2,
  name: "Johnson & Wales"
}, {
  id: 3,
  name: "CTC Station/Arena"
}, {
  id: 4,
  name: "Elizabeth & Hawthorne"
}, {
  id: 5,
  name: "Sunnyside Station (CityLYNX)"
}];

const getStationsForRoute = (route: string) => {
  if (route.startsWith("501")) {
    return BLUE_LINE_STATIONS;
  } else if (route.startsWith("510")) {
    return GOLD_LINE_STATIONS;
  }
  return BLUE_LINE_STATIONS; // Default to Blue Line stations
};

export function UpcomingStationSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { route, selectingStation } = location.state || {};
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const stations = getStationsForRoute(route || "");

  const handleStationSelect = (stationName: string) => {
    navigate("/upcoming", {
      state: {
        ...location.state,
        [selectingStation === "from" ? "fromStation" : "toStation"]: stationName
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-[#0B4EA2] text-white p-4 flex items-center gap-4">
        <button onClick={() => navigate("/upcoming", { state: location.state })}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl">Select a station</h1>
      </div>
      <div className="border-b">
        <div className="flex">
          <button className="flex-1 py-4 text-[#0B4EA2] border-b-2 border-[#0B4EA2]">
            All Stations
          </button>
          <button className="flex-1 py-4 text-gray-600">History</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {stations.map(station => (
          <button
            key={station.id}
            className="w-full flex items-center gap-4 p-4 border-b bg-white hover:bg-gray-50"
            onClick={() => handleStationSelect(station.name)}
          >
            <div className="w-8 h-8 bg-[#0B4EA2] text-white rounded-lg flex items-center justify-center font-bold">
              {station.id}
            </div>
            <span className="text-gray-900">{station.name}</span>
          </button>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <button className="w-14 h-14 rounded-full bg-[#0B4EA2] text-white flex items-center justify-center shadow-lg">
          <Search size={24} />
        </button>
      </div>
    </div>
  );
}