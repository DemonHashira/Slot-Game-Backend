import * as readline from "readline";
import { simulateSpins } from "./simulate";

// Main entry point for the application
// Here we call the simulateSpins function with 1000 spins to test the slot machine
// as we ask the user if he wants to play
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the slot machine simulator!");
// Asking the player if they want to start
rl.question("Are you ready to play? (yes/no) ", (answer) => {
  if (answer.toLowerCase() === "yes") {
    console.log("Let's get started!");
    console.log("Performing 1000 spins: ");
    console.log();
    simulateSpins(1000);
  } else {
    console.log("Maybe next time!");
  }
  rl.close();
});
