import React from "react";
import "../css/Event.css";

const Event = ({ event }) => {
  const getEventDateTime = () => {
    if (!event?.date || !event?.time) return null;

    const parsed = new Date(`${event.date} ${event.time}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const getCountdown = () => {
    const eventDateTime = getEventDateTime();

    if (!eventDateTime) return "Date unavailable";

    const diff = eventDateTime.getTime() - Date.now();

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      const absMinutes = Math.abs(totalMinutes);
      const absHours = Math.abs(totalHours);
      const absDays = Math.abs(totalDays);

      if (absDays > 0) {
        return `-${absDays} day(s)`;
      }

      if (absHours > 0) {
        return `-${absHours} hour(s)`;
      }

      return `-${absMinutes} minute(s)`;
    }

    if (totalDays > 0) {
      const remainingHours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      return `${totalDays} day(s), ${remainingHours} hour(s)`;
    }

    if (totalHours > 0) {
      const remainingMinutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60),
      );
      return `${totalHours} hour(s), ${remainingMinutes} minute(s)`;
    }

    return `${totalMinutes} minute(s)`;
  };

  const isPastEvent = () => {
    const eventDateTime = getEventDateTime();
    if (!eventDateTime) return false;
    return eventDateTime.getTime() < Date.now();
  };

  return (
    <article className="event-information">
      <img src={event.image} alt={event.title} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.title}</h3>

          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {event.date}
          </p>

          <p>
            <i className="fa-regular fa-clock fa-bounce"></i> {event.time}
          </p>

          <p className={isPastEvent() ? "negative-time-remaining" : ""}>
            {getCountdown()}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Event;
