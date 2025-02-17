import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { MainLayout } from "./components/MainLayout";
import { HistoryView } from "./components/HistoryView";
import { RouteSelector } from "./components/RouteSelector";
import { UpcomingRouteSelector } from "./components/UpcomingRouteSelector";
import { UpcomingStationSelector } from "./components/UpcomingStationSelector";
import { ScheduleView } from "./components/ScheduleView";
import { UpcomingView } from "./components/UpcomingView";
import { MapView } from "./components/MapView";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UnitPreferenceProvider } from "./contexts/UnitPreferenceContext";

export function App() {
    const [savedRoutes, setSavedRoutes] = useState<string[]>([]);
    return (
        <LanguageProvider>
            <UnitPreferenceProvider>
                <DarkModeProvider>
                    <Router>
                <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route element={<MainLayout savedRoutes={savedRoutes} setSavedRoutes={setSavedRoutes} />}>
                        <Route path="/history" element={<HistoryView savedRoutes={savedRoutes} setSavedRoutes={setSavedRoutes} />} />
                        <Route path="/route" element={<RouteSelector />} />
                        <Route
                            path="/upcoming"
                            element={
                                <UpcomingView
                                    savedRoutes={savedRoutes}
                                    setSavedRoutes={setSavedRoutes}
                                />
                            }
                        />
                        <Route path="/upcoming/route" element={<UpcomingRouteSelector />} />
                        <Route path="/upcoming/station" element={<UpcomingStationSelector />} />
                        <Route path="/schedule" element={<ScheduleView />} />
                        <Route path="/map" element={<MapView />} />
                    </Route>
                </Routes>
                    </Router>
                </DarkModeProvider>
            </UnitPreferenceProvider>
        </LanguageProvider>
    );
}
