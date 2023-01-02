type Point = {
  lat: string;
  lon: string;
};

export const getDistanceBetween = (p1: Point, p2: Point) => {
  const R = 6371; // KM
  const lat1 = parseFloat(p1.lat) * 0.01746032;
  const lon1 = parseFloat(p1.lon) * 0.01746032;
  const lat2 = parseFloat(p2.lat) * 0.01746032;
  const lon2 = parseFloat(p2.lon) * 0.01746032;

  const dLatByTwo = (lat2 - lat1) / 2;
  const dLonByTwo = (lon2 - lon1) / 2;

  const dLatSin = Math.sin(dLatByTwo);

  const a =
    dLatSin * dLatSin +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLonByTwo) * Math.sin(dLonByTwo);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in KM
  return d;
};
