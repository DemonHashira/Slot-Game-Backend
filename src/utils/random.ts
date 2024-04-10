export function getRandomSymbol(reel: number[]): number {
  const randomIndex = Math.floor(Math.random() * reel.length);
  return reel[randomIndex];
}
