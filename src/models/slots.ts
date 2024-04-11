import {
  GameConfig,
  gameConfig,
  Reel,
  Symbol,
  PaylinePayout,
} from "../types/configuration";
import { getRandomSymbol } from "../utils/random";

export class Slots {
  private config: GameConfig;
  private reels: Reel[];

  constructor(config: GameConfig = gameConfig) {
    this.config = config;
    this.reels = config.reels;
  }

  public spin(): { spinResult: Symbol[][]; payout: number } {
    let spinResult: Symbol[][] = [];

    for (let i = 0; i < this.reels.length; i++) {
      let reelSpin: Symbol[] = [];
      for (let j = 0; j < this.config.rowsCount; j++) {
        reelSpin.push(getRandomSymbol(this.reels[i] as number[]));
      }
      spinResult.push(reelSpin);
    }

    let payout = this.calculatePayout(spinResult);

    console.log(
      `Spin result: ${spinResult.map((reel) => reel.join(" ")).join(" | ")}`
    );
    console.log(`Payout: ${payout}`);
    console.log();

    return { spinResult, payout };
  }

  private calculatePayout(spinResult: Symbol[][]): number {
    let totalPayout = 0;

    for (const line of this.config.lines) {
      const symbolsInLine = line.pattern.map(
        (rowIndex, reelIndex) => spinResult[reelIndex][rowIndex]
      );
      const firstSymbol = symbolsInLine[0];
      const matches = symbolsInLine.filter(
        (symbol) => symbol === firstSymbol
      ).length;

      if (matches >= 3) {
        const payoutForSymbol = this.config.symbols[firstSymbol][matches - 1];
        totalPayout += payoutForSymbol * line.multiplier;
      }
    }
    return totalPayout;
  }
}
