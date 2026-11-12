// Precomputes a dotted map of North America for the hero constellation.
// Run: node scripts/generate-map.mjs  →  writes src/data/north-america.json
// Output is normalized to roughly [-1, 1] on x (aspect preserved, y up).
import DottedMap from "dotted-map";
import fs from "node:fs";

const HEIGHT = Number(process.argv[2] ?? 64);

const cities = [
  // `side`: where the label sits relative to the pin (chosen to avoid overlaps).
  { id: "vancouver", label: "Vancouver", lat: 49.28, lng: -123.12, side: "left" },
  { id: "calgary", label: "Calgary", lat: 51.05, lng: -114.07, side: "top" },
  { id: "sanfrancisco", label: "San Francisco", lat: 37.77, lng: -122.42, side: "left" },
  { id: "losangeles", label: "Los Angeles", lat: 34.05, lng: -118.24, side: "left" },
  { id: "austin", label: "Austin", lat: 30.27, lng: -97.74, side: "bottom" },
  { id: "chicago", label: "Chicago", lat: 41.88, lng: -87.63, side: "left" },
  { id: "toronto", label: "Toronto", lat: 43.65, lng: -79.38, side: "upleft" },
  { id: "montreal", label: "Montréal", lat: 45.5, lng: -73.57, side: "right" },
  { id: "newyork", label: "New York", lat: 40.71, lng: -74.0, side: "right" },
  { id: "miami", label: "Miami", lat: 25.76, lng: -80.19, side: "right" },
];

const map = new DottedMap({
  height: HEIGHT,
  grid: "diagonal",
  countries: ["CAN", "USA", "MEX"],
  region: { lat: { min: 14, max: 72 }, lng: { min: -170, max: -50 } },
  // Globe-style view centred on North America: no Mercator stretching up north.
  projection: { name: "orthographic", center: { lat: 46, lng: -98 } },
});

const raw = map.getPoints().map((p) => ({ x: p.x, y: p.y }));
// Drop isolated dots (e.g. Hawaii, tiny islands) so they don't skew the framing.
const land = raw.filter((p) =>
  raw.filter((q) => q !== p && Math.hypot(q.x - p.x, q.y - p.y) < 2.2).length >= 2,
);
for (const c of cities) map.addPin({ lat: c.lat, lng: c.lng, data: c.id });
const pins = map.getPoints().filter((p) => p.data);

const xs = land.map((p) => p.x);
const ys = land.map((p) => p.y);
const minX = Math.min(...xs), maxX = Math.max(...xs);
const minY = Math.min(...ys), maxY = Math.max(...ys);
const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
const scale = 2 / (maxX - minX);
const norm = (p) => [
  +((p.x - cx) * scale).toFixed(4),
  +(-(p.y - cy) * scale).toFixed(4),
];

const out = {
  points: land.map(norm),
  cities: cities.map((c) => {
    const pin = pins.find((p) => p.data === c.id);
    return { label: c.label, side: c.side, pos: norm(pin) };
  }),
};

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/north-america.json", JSON.stringify(out));
console.log(`points: ${out.points.length}, aspect y/x: ${((maxY - minY) / (maxX - minX)).toFixed(2)}`);
