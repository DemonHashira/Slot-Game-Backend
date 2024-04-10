import { Reel, Symbol } from "../types/configuration";

export function getRandomSymbol(reel: Reel): Symbol {
  return reel[Math.floor(Math.random() * reel.length)];
}
