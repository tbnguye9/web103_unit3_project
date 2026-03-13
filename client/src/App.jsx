import React from "react";
import { useRoutes, Link, useLocation } from "react-router-dom";
import Locations from "./pages/Locations";
import LocationEvents from "./pages/LocationEvents";
import Events from "./pages/Events";
import "./App.css";

const App = () => {
  const location = useLocation();

  const element = useRoutes([
    { path: "/", element: <Locations /> },
    { path: "/echolounge", element: <LocationEvents index={1} /> },
    { path: "/houseofblues", element: <LocationEvents index={2} /> },
    { path: "/pavilion", element: <LocationEvents index={3} /> },
    { path: "/americanairlines", element: <LocationEvents index={4} /> },
    { path: "/events", element: <Events /> },
  ]);

  const isEventsPage = location.pathname === "/events";

  return (
    <div className="app">
      {!isEventsPage && (
        <header className="main-header">
          <h1>UnityGrid Plaza</h1>

          <div className="header-buttons">
            <Link to="/" role="button">
              Home
            </Link>
            <Link to="/events" role="button">
              Events
            </Link>
          </div>
        </header>
      )}

      <main>{element}</main>
    </div>
  );
};

export default App;
