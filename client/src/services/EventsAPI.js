const BASE_URL = "http://localhost:3000/api";

export const getAllEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

export const getEventById = async (id) => {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  return res.json();
};

export const getEventsByLocation = async (locationId) => {
  const res = await fetch(`${BASE_URL}/events/location/${locationId}`);
  return res.json();
};
