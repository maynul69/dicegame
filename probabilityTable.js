class ProbabilityTable {
    static display(diceArray) {
      console.log("\nProbability of Winning Table:");
      console.log("=".repeat(30));
      for (let i = 0; i < diceArray.length; i++) {
        for (let j = 0; j < diceArray.length; j++) {
          if (i === j) continue;
          console.log(
            `Dice ${i} vs Dice ${j}: Probability calculation not implemented in this version`
          );
        }
      }
      console.log("=".repeat(30));
    }
  }
  module.exports = { ProbabilityTable };
