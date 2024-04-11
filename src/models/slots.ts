import { GameConfig, gameConfig, Reel, Symbol } from "../types/configuration";
import { getRandomSymbol } from "../utils/random";

// The slot class used to simulate the slot machine
export class Slots {
  private config: GameConfig;
  private reels: Reel[];

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

    // Helper function to find matching symbols in a line
    const findMatches = (symbols: Symbol[], fromLeft: boolean = true) => {
      let matchCount = 1;
      let symbolToMatch = symbols[fromLeft ? 0 : symbols.length - 1];
      for (let i = 1; i < symbols.length; i++) {
        const symbolIndex = fromLeft ? i : symbols.length - 1 - i;
        if (symbols[symbolIndex] === symbolToMatch) {
          matchCount++;
        } else {
          break;
        }
      }
      return { matchCount, symbol: symbolToMatch };
    };

    // Iterating over each line and calculating the payout
    for (const line of this.config.lines) {
      const symbolsInLine = line.pattern.map(
        (rowIndex, reelIndex) => spinResult[reelIndex][rowIndex]
      );

      // Checking for matches from left and right
      const leftMatch = findMatches(symbolsInLine, true);
      const rightMatch = findMatches(symbolsInLine, false);
      const bestMatch =
        leftMatch.matchCount > rightMatch.matchCount ? leftMatch : rightMatch;

      // If we have at least 3 matching symbols and the symbol exists in the config we calculate the payout
      if (bestMatch.matchCount >= 3 && this.config.symbols[bestMatch.symbol]) {
        const payoutForSymbol =
          this.config.symbols[bestMatch.symbol][bestMatch.matchCount - 1];
        if (payoutForSymbol) {
          totalPayout += payoutForSymbol * line.multiplier;
        }
      }
    }
    return totalPayout;
  }
}
