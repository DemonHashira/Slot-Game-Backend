import { Slots } from "./models/slots";
import { gameConfig } from "./types/configuration";

export function simulateSpins(spins: number) {
  const slotMachine = new Slots(gameConfig);
  let totalBet = 0;
  let totalPayout = 0;

  console.time("Simulation execution time");

  for (let i = 0; i < spins; i++) {
    const betAmount = 1;
    totalBet += betAmount;

    const { payout } = slotMachine.spin();
    if (payout !== undefined) {
      totalPayout += payout;
    }
  }

  console.timeEnd("Simulation execution time");

  const rtp = (totalPayout / totalBet) * 100;
  console.log(`Total spins: ${spins}`);
  console.log(`Total bet: ${totalBet}`);
  console.log(`Total payout: ${totalPayout}`);
  console.log(`RTP: ${rtp.toFixed(2)}%`);
}
