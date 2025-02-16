import React from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeDestinations } from "../data/routeDestinations";

interface StationTime {
  station: string;
  time: string;
}

interface TimeSlot {
  startStation: string;
  startTime: string;
  stops: StationTime[];
}

interface ScheduleViewProps {}

export function ScheduleView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDirection, setSelectedDirection] = React.useState<string | null>(null);
  const [selectedWeekday, setSelectedWeekday] = React.useState<string | null>(null);
  const [showDirectionModal, setShowDirectionModal] = React.useState(false);
  const [showWeekdayModal, setShowWeekdayModal] = React.useState(false);
  const [expandedTimeSlot, setExpandedTimeSlot] = React.useState<number | null>(null);
  
  const { selectedRoute } = location.state || {};
  
  // Helper function to add minutes to a time string
  const addMinutes = (time: string, minutes: number): string => {
    const [hourStr, minuteStr] = time.split(":");
    const [hour, period] = hourStr.split(" ");
    let totalMinutes = parseInt(hour) * 60 + parseInt(minuteStr) + minutes;
    
    if (period === "PM" && hour !== "12") totalMinutes += 12 * 60;
    if (period === "AM" && hour === "12") totalMinutes -= 12 * 60;
    
    let newHour = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    
    let newPeriod = newHour >= 12 ? "PM" : "AM";
    if (newHour > 12) newHour -= 12;
    if (newHour === 0) newHour = 12;
    
    return `${newHour}:${newMinutes.toString().padStart(2, "0")} ${newPeriod}`;
  };

  // Complete schedule data with stops for each time slot
  const scheduleData: TimeSlot[] = React.useMemo(() => {
    if (!selectedRoute || !selectedDirection) return [];

    const routeNumber = selectedRoute.split(" - ")[0];
    const destinations = routeDestinations[routeNumber];
    
    if (!destinations) return [];

    const isInbound = selectedDirection.toLowerCase() === "inbound";
    const startStation = isInbound ? destinations.inbound : destinations.outbound;
    const endStation = isInbound ? destinations.outbound : destinations.inbound;

    const times = [
      "4:39 AM", "4:57 AM", "4:55 AM", "5:14 AM",
      "5:20 AM", "5:40 AM", "6:00 AM", "6:20 AM"
    ];

    return times.map(time => ({
      startStation,
      startTime: time,
      stops: [
        { station: startStation, time },
        { station: endStation, time: addMinutes(time, 30) }
      ]
    }));
  }, [selectedRoute, selectedDirection]);

  const handleDirectionSelect = (direction: string) => {
    setSelectedDirection(direction);
    setShowDirectionModal(false);
    // Only show weekday modal if no weekday is selected yet
    if (!selectedWeekday) {
      setShowWeekdayModal(true);
    }
  };

  const handleWeekdaySelect = (weekday: string) => {
    setSelectedWeekday(weekday);
    setShowWeekdayModal(false);
  };

  const handleTimeSlotClick = (index: number) => {
    setExpandedTimeSlot(expandedTimeSlot === index ? null : index);
  };
  
  // If no route information, show route selection interface
  if (!selectedRoute) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-gray-400 mb-6">
          <div className="w-24 h-24 mx-auto">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v10zm2 0V6h12v10H6z"/>
              <path d="M12 8.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
            </svg>
          </div>
        </div>
        <h2 className="text-gray-600 text-xl mb-4">Select a route to get started</h2>
        <button
          onClick={() => navigate("/route")}
          className="w-full p-4 border-2 border-[#0B4EA2] rounded-lg text-center text-[#0B4EA2] font-semibold hover:bg-blue-50"
        >
          Route
        </button>
      </div>
    );
  }

  // Show schedule when both direction and weekday are selected
  const showSchedule = selectedDirection && selectedWeekday;

  // Show direction modal when route is selected but direction isn't
  React.useEffect(() => {
    if (selectedRoute && !selectedDirection) {
      setShowDirectionModal(true);
    }
  }, [selectedRoute, selectedDirection]);

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Fixed header */}
      <div className="bg-[#0B4EA2] text-white p-4 flex items-center gap-4">
        <button onClick={() => navigate("/route")}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl">Schedule</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Schedule content */}
        {showSchedule && (
          <div>
            {scheduleData.map((timeSlot, index) => (
              <div key={index} className="mx-4 mt-4">
                <div
                  className="bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleTimeSlotClick(index)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <ChevronRight
                            className={`text-gray-600 transform transition-transform ${expandedTimeSlot === index ? 'rotate-90' : ''}`}
                            size={20}
                          />
                        </div>
                        <span className="text-lg">{timeSlot.startStation}</span>
                      </div>
                      <span className="text-gray-600">{timeSlot.startTime}</span>
                    </div>
                  </div>
                </div>
                {/* Expanded view */}
                {expandedTimeSlot === index && (
                  <div className="mt-2 bg-white rounded-lg shadow-md p-4">
                    {timeSlot.stops.map((stop, stopIndex) => (
                      <div key={stopIndex} className="flex justify-between py-2 border-b last:border-b-0">
                        <span className="text-gray-700">{stop.station}</span>
                        <span className="text-gray-600">{stop.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Route selection and filters */}
      <div className="px-4 pb-8 pt-4 flex flex-col gap-4 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate("/route")}
          className="w-full p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
        >
          {selectedRoute}
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowDirectionModal(true)}
            className="p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
          >
            {selectedDirection || "DIRECTION"}
          </button>
          <button
            onClick={() => selectedDirection && setShowWeekdayModal(true)}
            className={`p-4 bg-white border rounded-lg font-bold ${
              selectedDirection
                ? "border-[#0B4EA2] text-[#0B4EA2]"
                : "border-gray-300 text-gray-300"
            }`}
            disabled={!selectedDirection}
          >
            {selectedWeekday || "DAY"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDirectionModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl mb-4">Select direction</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleDirectionSelect("INBOUND")}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                >
                  INBOUND
                </button>
                <button
                  onClick={() => handleDirectionSelect("OUTBOUND")}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                >
                  OUTBOUND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWeekdayModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl mb-4">Select day</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleWeekdaySelect("WEEKDAYS")}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                >
                  WEEKDAYS
                </button>
                <button
                  onClick={() => handleWeekdaySelect("SATURDAY")}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                >
                  SATURDAY
                </button>
                <button
                  onClick={() => handleWeekdaySelect("SUNDAY")}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                >
                  SUNDAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}