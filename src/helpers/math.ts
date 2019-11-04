export const deg2rad = (x: number): number => x * ((Math.PI * 2) / 360);
export const rad2deg = (x: number): number => x * (360 / (Math.PI * 2));
export const deglimit = (x: number): number => ((x % 360) + 360) % 360;
export const lerp = (x: number, y: number, a: number): number =>
  x + (y - x) * a;
