// This file is used to define the configuration type for the slot game

// Define the Symbol type as a number
export type Symbol = number;

// Define the Reel type as an array of Symbol
export type Reel = Symbol[];

// Define the PaylinePayout type as an object with payline and multiplier properties
export interface PaylinePayout {
  payline: number[];
  multiplier: number;
}

// Define the GameConfig type as an object with reelsCount, rowsCount, symbols, lines, and reels properties
export interface GameConfig {
  reelsCount: number;
  rowsCount: number;
  symbols: { [key in Symbol]: number[] };
  lines: number[][];
  reels: Reel[];
}
