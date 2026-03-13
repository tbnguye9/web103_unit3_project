const BASE_URL = "http://localhost:3000/api";

export const getAllLocations = async () => {
  const res = await fetch(`${BASE_URL}/locations`);
  return res.json();
};

export const getLocationById = async (id) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`);
  return res.json();
};
