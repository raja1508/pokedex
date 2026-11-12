import { sizes } from "./theme";

/** How far the hero image dips into the white sheet. */
export const HERO_OVERLAP = sizes.heroImage * 0.3;

export const capitalize = (s: string) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const idFromUrl = (url: string) =>
  Number(url.split("/").filter(Boolean).pop());

export const artworkUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const formatHeight = (m: number) => {
  const totalInches = m * 39.3701;
  const ft = Math.floor(totalInches / 12);
  const inch = (totalInches - ft * 12).toFixed(1);
  return `${ft}'${inch}" (${m.toFixed(2)} m)`;
};

export const formatWeight = (kg: number) =>
  `${(kg * 2.20462).toFixed(1)} lbs (${kg.toFixed(1)} kg)`;

export const multiplierLabel = (m: number) =>
  m === 0 ? "0" : m === 0.5 ? "½" : m === 0.25 ? "¼" : `${m}×`;