const { Dice } = require("./dice");

const { Gaming } = require("./gaming");
const readlineSync = require("readline-sync");

function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log(
      "Error: At least three dice configurations are required.\n" +
        "Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"
    );
    process.exit(1);
  }
  const diceArray = [];
  for (const arg of args) {
    const values = arg.split(",").map((v) => parseInt(v));
    if (values.some((v) => isNaN(v))) {
      console.log(
        `Error: Invalid dice configuration '${arg}'. All values must be integers.`
      );
      process.exit(1);
    }
    diceArray.push(new Dice(values));
  }

  const game = new Gaming(diceArray);
  game.start();
}
main();
