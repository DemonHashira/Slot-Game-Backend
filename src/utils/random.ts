// The function is used to get a random symbol from a reel.
// It a reel as an argument and returns a random symbol from the reel.
export function getRandomSymbol(reel: number[]): number {
  const randomIndex = Math.floor(Math.random() * reel.length);
  return reel[randomIndex];
}
