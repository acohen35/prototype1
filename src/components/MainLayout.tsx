import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabBar } from "./TabBar";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";
import { SettingsDialog } from "./SettingsDialog";

interface MainLayoutProps {
    savedRoutes: string[];
    setSavedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MainLayout({ savedRoutes, setSavedRoutes }: MainLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isTipsExpanded, setIsTipsExpanded] = useState(false);

    const handleRouteClick = (route: string) => {
        // Parse the route string to extract information
        // Format: "[route]: [fromStation] to [toStation]"
        const [routeName, stations] = route.split(": ");
        const [fromStation, toStation] = stations.split(" to ");
        
        // Navigate to the schedule view with the parsed information
        navigate("/schedule", { state: { selectedRoute: routeName, fromStation, toStation } });
    };

    const isHomePage = location.pathname === "/history";
    
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="flex flex-col h-screen w-full max-w-[390px] bg-white dark:bg-gray-900 shadow-lg">
            <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <TabBar />
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <Settings size={24} />
                </button>
            </header>
            <SettingsDialog
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                {isHomePage ? (
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td>
                                    {/* Onboarding Tips and Usage Guidelines */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTipsExpanded(!isTipsExpanded)}>
                                            <h2 className="text-xl font-semibold dark:text-white">Onboarding Tips</h2>
                                            <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                                {isTipsExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                            </button>
                                        </div>
                                        
                                        {isTipsExpanded && (
                                            <div className="mt-4 space-y-3 dark:text-gray-300">
                                                <p className="font-medium">1. Navigation</p>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    <li>Use the top navigation bar to switch between different views: Upcoming, Schedule, Map, and History</li>
                                                    <li>Access settings anytime using the gear icon in the top-right corner</li>
                                                </ul>
                                                
                                                <p className="font-medium">2. Planning Your Route</p>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    <li>Start in the Schedule tab to plan your journey</li>
                                                    <li>Select your starting station and destination</li>
                                                    <li>View available routes and timings</li>
                                                    <li>Save frequently used routes for quick access</li>
                                                </ul>

                                                <p className="font-medium">3. Real-time Updates</p>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    <li>Check the Upcoming tab for immediate departures</li>
                                                    <li>Use the Map view to see route visualizations</li>
                                                    <li>View your saved and recent routes in the History tab</li>
                                                </ul>

                                                <p className="font-medium">4. Customization</p>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    <li>Toggle dark/light mode in settings</li>
                                                    <li>Manage your saved routes from this page</li>
                                                    <li>Click on any saved route to quickly view its schedule</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {/* Saved Routes */}
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold dark:text-white">Saved Routes</h2>
                                        <div className="mt-4 space-y-2">
                                            {savedRoutes.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400">No saved routes yet. Select routes from Upcoming or Schedule tabs to save them here.</p>
                                            ) : (
                                                savedRoutes.map((route, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                                                        <button
                                                            onClick={() => handleRouteClick(route)}
                                                            className="text-left flex-1 hover:text-[#0B4EA2] dark:text-gray-200 dark:hover:text-[#4B8FE2]"
                                                        >
                                                            <span>{route}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setSavedRoutes(routes => routes.filter((_, i) => i !== index))}
                                                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-4"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <Outlet />
                )}
            </main>
            </div>
        </div>
    );
}