import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllLocations } from "../services/LocationsAPI";
import unitygrid from "../assets/unitygrid.jpg";
import "../css/Locations.css";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getAllLocations();
        setLocations(Array.isArray(locationsData) ? locationsData : []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const polygons = document.querySelectorAll("polygon");

    const handleMouseOver = (event) => {
      const buttonElement = document.getElementById(`${event.target.id}button`);
      if (buttonElement) buttonElement.style.opacity = 1;
    };

    const handleMouseLeave = (event) => {
      const buttonElement = document.getElementById(`${event.target.id}button`);
      if (buttonElement) buttonElement.style.opacity = 0;
    };

    polygons.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      polygons.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [locations]);

  const venueNames = {
    venue1: locations[0]?.name || "Echo Lounge",
    venue2: locations[1]?.name || "House of Blues",
    venue3: locations[2]?.name || "Pavilion",
    venue4: locations[3]?.name || "American Airlines Center",
  };

  const locationOptions = [
    { label: "See events at . . .", path: "" },
    { label: venueNames.venue1, path: "/echolounge" },
    { label: venueNames.venue2, path: "/houseofblues" },
    { label: venueNames.venue3, path: "/pavilion" },
    { label: venueNames.venue4, path: "/americanairlines" },
  ];

  const handleSelectChange = (e) => {
    const path = e.target.value;
    setSelectedPath(path);

    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="locations-page">
      <div className="locations-top-controls">
        <select
          className="locations-dropdown"
          value={selectedPath}
          onChange={handleSelectChange}
        >
          {locationOptions.map((location) => (
            <option key={location.path || "default"} value={location.path}>
              {location.label}
            </option>
          ))}
        </select>

        <Link to="/events">
          <button type="button" className="show-all-events-btn">
            SHOW ALL EVENTS
          </button>
        </Link>
      </div>

      <div className="available-locations">
        <div id="venue1button" className="venue1-button-overlay">
          <Link to="/echolounge">
            <button type="button">{venueNames.venue1}</button>
          </Link>
        </div>

        <div id="venue2button" className="venue2-button-overlay">
          <Link to="/houseofblues">
            <button type="button">{venueNames.venue2}</button>
          </Link>
        </div>

        <div id="venue3button" className="venue3-button-overlay">
          <Link to="/pavilion">
            <button type="button">{venueNames.venue3}</button>
          </Link>
        </div>

        <div id="venue4button" className="venue4-button-overlay">
          <Link to="/americanairlines">
            <button type="button">{venueNames.venue4}</button>
          </Link>
        </div>

        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1000.32 500"
          xmlSpace="preserve"
        >
          <image
            id="background"
            xlinkHref={unitygrid}
            transform="matrix(0.48 0 0 0.48 0 0)"
          />

          <a href="/echolounge">
            <polygon
              id="venue1"
              points="2.97,234.52 17.94,198.9 34.45,188.58 52.52,191.68 56.65,196.32 69.03,162.26 84,137.48 
              103.61,121.48 126.32,109.61 154.71,125.61 175.87,149.87 189.81,176.71 199.61,206.13 205.81,229.35 210.45,243.81 206.84,272.19 
              214.58,285.1 214.58,302.13 203.74,334.13 194.45,351.68 205.29,366.65 132.52,366.65 159.35,391.42 155.74,399.68 119.61,399.68 
              86.06,399.68 62.84,399.68 25.16,399.68 0,397.61 "
            />
          </a>

          <a href="/houseofblues">
            <polygon
              id="venue2"
              points="358.58,353.74 376.65,322.77 389.55,314.52 384.39,280.45 407.61,272.19 422.06,220.58 
              438.58,126.65 449.42,38.39 457.68,16.71 468,35.81 474.19,103.42 491.74,203.03 508.26,261.87 517.03,281.48 517.03,214.9 
              529.42,194.26 540.77,197.35 540.77,169.48 552.13,167.94 556.77,149.87 566.06,156.06 566.06,193.74 577.42,211.81 577.42,238.65 
              601.16,254.65 594.45,302.13 575.87,335.68 587.23,353.74 601.16,363.55 358.58,363.55 "
            />
          </a>

          <a href="/pavilion">
            <polygon
              id="venue3"
              points="998.06,83.81 952.65,31.16 914.45,16.71 877.29,43.55 833.94,102.39 811.74,161.23 
              796.77,241.23 802.97,303.16 833.94,353.23 871.61,385.23 954.71,385.23 1000.32,387.81 "
            />
          </a>

          <a href="/americanairlines">
            <polygon
              id="venue4"
              points="625,291 615,305 608,318 625,338 637,354 622.5,358 673,363.5 751,363.5 793,363.5 
              769,352 772,347 793,340 806,321 796.8,291 784,269 757,261 730,272 707,281 672,283 "
            />
          </a>
        </svg>
      </div>
    </div>
  );
};

export default Locations;
