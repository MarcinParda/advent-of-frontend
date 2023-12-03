export interface Lokalizacja {
  x: number;
  y: number;
  z: number;
  czas: number;
}

export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  if (!lokalizacje.length) {
    return null;
  }

  let lokalizacjaZNajwiekszaWartosciaMapy: Lokalizacja | null = null;
  let najwiekszaWartoscMapy: number | null = null;

  for (let i = 0; i < lokalizacje.length; i++) {
    const { x, y, z, czas } = lokalizacje[i];
    const wartoscMapy = mapa(x, y, z, czas);

    if (Number.isNaN(wartoscMapy)) {
      continue;
    }

    if (najwiekszaWartoscMapy === null || wartoscMapy > najwiekszaWartoscMapy) {
      lokalizacjaZNajwiekszaWartosciaMapy = lokalizacje[i];
      najwiekszaWartoscMapy = wartoscMapy;
    }
  }

  return lokalizacjaZNajwiekszaWartosciaMapy;
}
