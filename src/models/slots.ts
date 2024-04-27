import { GameConfig, gameConfig, Reel, Symbol } from "../types/configuration";
import { getRandomSymbol } from "../utils/random";

// The slot class used to simulate the slot machine
export class Slots {
  // Declaring the config and reels properties
  private config: GameConfig;
  private readonly reels: Reel[];

  // Constructor to initialize the slot machine with a given configuration
  constructor(config: GameConfig = gameConfig) {
    this.config = config;
    this.reels = config.reels;
  }

  // Method to simulate a spin of the slot machine
  public spin(): { spinResult: Symbol[][]; payout: number } {
    let spinResult: Symbol[][] = [];

    // Spinning each reel and getting the symbols
    for (let i = 0; i < this.reels.length; i++) {
      let reelSpin: Symbol[] = [];
      for (let j = 0; j < this.config.rowsCount; j++) {
        reelSpin.push(getRandomSymbol(this.reels[i] as number[]));
      }
      spinResult.push(reelSpin);
    }

    // Calculating the payout for the spin result
    let payout = this.calculatePayout(spinResult);

    // Printing the result of the spin
    console.log("Spin result:");
    spinResult[0].forEach((_, i) => {
      console.log(spinResult.map((reel) => reel[i]).join(" | "));
    });
    console.log(`Payout: ${payout}`);
    console.log();

    return { spinResult, payout };
  }

  // Method to calculate the payout for a given spin result
  private calculatePayout(spinResult: Symbol[][]): number {
    let totalPayout = 0;

    // Looping through each line and checking if there is a winning combination
    for (const line of this.config.lines) {
      const symbolsInLine = line.pattern.map(
        (rowIndex, reelIndex) => spinResult[reelIndex][rowIndex]
      );

      // Counting the number of occurrences of each symbol in the line
      const symbolCounts = symbolsInLine.reduce(
        (counts: { [key: number]: number }, symbol) => {
          counts[symbol] = (counts[symbol] || 0) + 1;
          return counts;
        },
        {}
      );

      // Checking if there are 3 or more occurrences of a symbol in the line
      for (const symbol in symbolCounts) {
        if (symbolCounts[symbol] >= 3 && this.config.symbols[symbol]) {
          const payoutForSymbol =
            this.config.symbols[symbol][symbolCounts[symbol] - 1];
          if (payoutForSymbol) {
            totalPayout += payoutForSymbol * line.multiplier;
          }
        }
      }
    }
    return totalPayout;
  }
}
