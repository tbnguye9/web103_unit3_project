import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import { getAllEvents } from "../services/EventsAPI";
import { getAllLocations } from "../services/LocationsAPI";
import "../css/Event.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortOrder, setSortOrder] = useState("soonest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          getAllEvents(),
          getAllLocations(),
        ]);

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setLocations(Array.isArray(locationsData) ? locationsData : []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const getEventDateTime = (event) => {
    if (!event?.date || !event?.time) return null;
    const parsed = new Date(`${event.date} ${event.time}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const filteredAndSortedEvents = useMemo(() => {
    let result = [...events];

    if (selectedLocation !== "all") {
      result = result.filter(
        (event) => Number(event.location_id) === Number(selectedLocation),
      );
    }

    result.sort((a, b) => {
      const dateA = getEventDateTime(a)?.getTime() || 0;
      const dateB = getEventDateTime(b)?.getTime() || 0;

      if (sortOrder === "latest") return dateB - dateA;
      return dateA - dateB;
    });

    return result;
  }, [events, selectedLocation, sortOrder]);

  return (
    <div className="events-page sample-events-page">
      <div className="sample-events-top">
        <h1 className="sample-events-title">ALL EVENTS</h1>

        <div className="sample-events-nav">
          <Link to="/">
            <button type="button" className="sample-nav-btn">
              HOME
            </button>
          </Link>

          <Link to="/events">
            <button type="button" className="sample-nav-btn">
              EVENTS
            </button>
          </Link>
        </div>
      </div>

      <div className="sample-events-controls">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="sample-events-select"
        >
          <option value="all">See events at . . .</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sample-events-select"
        >
          <option value="soonest">Soonest First</option>
          <option value="latest">Latest First</option>
        </select>
      </div>

      <div className="sample-events-grid">
        {filteredAndSortedEvents.length > 0 ? (
          filteredAndSortedEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))
        ) : (
          <p className="sample-no-events">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
