/**
 * Where the North America map sits, in CSS pixels relative to the centre of
 * the sticky stage (y points up). Shared by the WebGL dots and the HTML city
 * pins so both line up exactly.
 */
export type StageLayout = {
  desktop: boolean;
  /** Map half-width in px (map data spans x ∈ [-1, 1], y ∈ ±MAP_ASPECT). */
  map: { x: number; y: number; s: number };
};

export const MAP_ASPECT = 1.13;

export function getStageLayout(w: number, h: number): StageLayout {
  if (w >= 1024) {
    return {
      desktop: true,
      map: { x: w * 0.2, y: -h * 0.02, s: Math.min(w * 0.25, (h * 0.78) / (2 * MAP_ASPECT)) },
    };
  }
  return {
    desktop: false,
    map: { x: 0, y: h * 0.165, s: Math.min(w * 0.4, h * 0.24) },
  };
}
