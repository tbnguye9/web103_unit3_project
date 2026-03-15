import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import { getEventsByLocation } from "../services/EventsAPI";
import { getLocationById } from "../services/LocationsAPI";
import "../css/LocationEvents.css";

const LocationEvents = ({ index }) => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocationEvents = async () => {
      try {
        const [eventsData, locationData] = await Promise.all([
          getEventsByLocation(index),
          getLocationById(index),
        ]);

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setLocation(locationData || null);
      } catch (error) {
        console.error("Error fetching location events:", error);
      }
    };

    if (index) fetchLocationEvents();
  }, [index]);

  const getEventDateTime = (event) => {
    if (!event?.date || !event?.time) return null;
    const parsed = new Date(`${event.date} ${event.time}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatEventDate = (event) => {
    const date = getEventDateTime(event);
    if (!date)
      return (
        `${event.date || ""} ${event.time || ""}`.trim() || "Date unavailable"
      );
    return date.toLocaleString();
  };

  const getCountdown = (event) => {
    const date = getEventDateTime(event);
    if (!date) return "Date unavailable";

    const diff = date.getTime() - Date.now();

    if (diff <= 0) return "Event Passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (days > 0) return `${days} day(s), ${hours} hour(s) left`;
    if (hours > 0) return `${hours} hour(s), ${minutes} minute(s) left`;
    return `${minutes} minute(s) left`;
  };

  const isPastEvent = (event) => {
    const date = getEventDateTime(event);
    if (!date) return false;
    return date.getTime() < Date.now();
  };

  if (!location) {
    return <p>Loading location...</p>;
  }

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} alt={location.name} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className={`location-event-wrapper ${isPastEvent(event) ? "past-event" : ""}`}
            >
              <Event event={event} />
              <div className="event-extra-info">
                {/* <p>
                  <strong>Date:</strong> {formatEventDate(event)}
                </p>
                <p>
                  <strong>Countdown:</strong> {getCountdown(event)}
                </p> */}
              </div>
            </div>
          ))
        ) : (
          <h2>No events scheduled at this location yet!</h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
