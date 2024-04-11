import { Slots } from "./models/slots";
import { gameConfig } from "./types/configuration";
import { simulateSpins } from "./simulate";

// const slotMachine = new Slots(gameConfig);

// console.log("Performing a single spin:");
// slotMachine.spin();

console.log("Performing 1,000,000 spins:");
simulateSpins(100);
