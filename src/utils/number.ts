export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function clamp(min: number, val: number, max: number) {
  return Math.max(min, Math.min(val, max));
}

export const numbers = {
  getRandomInt,
  clamp
}