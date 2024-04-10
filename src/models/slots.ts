import {
  GameConfig,
  Reel,
  Symbol,
  PaylinePayout,
} from "../types/configuration";
import { getRandomSymbol } from "../utils/random";

export class Slots {
  private config: GameConfig;
  private reels: Reel[];

  constructor(config: GameConfig) {
    this.config = config;
    this.reels = config.reels;
  }

  public spin(): void {
    let spinResult: Symbol[][] = [];

    for (let i = 0; i < this.reels.length; i++) {
      let reelSpin: Symbol[] = [];
      for (let j = 0; j < this.config.rowsCount; j++) {
        reelSpin.push(getRandomSymbol(this.reels[i]));
      }
      spinResult.push(reelSpin);
    }

    let payout = this.calculatePayout(spinResult);

    console.log(
      `Spin result: ${spinResult.map((reel) => reel.join(" ")).join(" | ")}`
    );
    console.log(`Payout: ${payout}`);
  }
}
