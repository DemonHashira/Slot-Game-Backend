import { Slots } from "./models/slots";
import { gameConfig } from "./types/configuration";

// Function to simulate the slot machine spins
// It takes the number of spins as an argument
// It creates a new instance of the Slots class and spins the slot machine
export function simulateSpins(spins: number) {
  const slotMachine = new Slots(gameConfig);
  let totalBet = 0;
  let totalPayout = 0;
  let winsCount = 0;

  console.time("Simulation execution time");

  for (let i = 0; i < spins; i++) {
    // We assume a bet of 10 according to the predifined payouts we have
    const betAmount = 10;
    totalBet += betAmount;

    const { payout } = slotMachine.spin();
    if (payout !== undefined) {
      totalPayout += payout;
      if (payout > 0) winsCount++;
    }
  }

  // Print the simulation results
  console.timeEnd("Simulation execution time");
  const rtp = (totalPayout / totalBet) * 100;
  console.log(`Total spins: ${spins}`);
  console.log(`Total bet: ${totalBet}`);
  console.log(`Total wins: ${winsCount}`);
  console.log(`Total payout: ${totalPayout}`);
  console.log(`RTP: ${rtp.toFixed(2)}%`);
}
