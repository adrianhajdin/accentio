/**
 * Copyright year, computed at build time and cached so the page stays static.
 * Shows at least 2027 (requested by the client); after that it follows the
 * calendar automatically.
 */
export async function Year() {
  "use cache";
  return <>{Math.max(new Date().getFullYear(), 2027)}</>;
}
