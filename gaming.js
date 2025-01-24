const crypto = require("crypto");
const { FairRandomGenerator } = require("./fairRandomGenerator");
const { ProbabilityTable } = require("./probabilityTable");
const readlineSync = require("readline-sync");
class Gaming {
    constructor(diceArray) {
      this.diceArray = diceArray;
    }
  
    start() {
      console.log("Let's determine who makes the first move.");
      const generator = new FairRandomGenerator(2);
      const { randomValue, hmac } = generator.generate();
      console.log(
        `I selected a random value in the range 0..1 (HMAC=${hmac}).`
      );
      while (true) {
        console.log("Try to guess my selection.");
        console.log("0 - 0\n1 - 1\nX - exit\n? - help");
        const userChoice = readlineSync.question("Your selection: ");
        if (userChoice === "X") process.exit();
        if (userChoice === "?") {
          ProbabilityTable.display(this.diceArray);
          continue;
        }
        const userValue = parseInt(userChoice);
        if (isNaN(userValue) || userValue < 0 || userValue > 1) {
          console.log("Invalid selection. Try again.");
          continue;
        }
        console.log(
          `My selection: ${randomValue} (KEY=${generator.revealKey()}).`
        );
        const userGoesFirst = userValue !== randomValue;
        if (userGoesFirst) {
          console.log("You make the first move.");
        } else {
          console.log("I make the first move.");
        }
        this.playGame(userGoesFirst);
        break;
      }
    }
    playGame(userGoesFirst) {
      const computerDiceIndex = crypto.randomInt(this.diceArray.length);
      const computerDice = this.diceArray[computerDiceIndex];
      console.log(`I choose the [${computerDice.values.join(",")}] dice.`);
      while (true) {
        console.log("Choose your dice:");
        for (let i = 0; i < this.diceArray.length; i++) {
          console.log(`${i} - [${this.diceArray[i].values.join(",")}]`);
        }
        console.log("X - exit\n? - help");
        const userChoice = readlineSync.question("Your selection: ");
        if (userChoice === "X") process.exit();
        if (userChoice === "?") {
          ProbabilityTable.display(this.diceArray);
          continue;
        }
        const userDiceIndex = parseInt(userChoice);
        if (
          isNaN(userDiceIndex) ||
          userDiceIndex < 0 ||
          userDiceIndex >= this.diceArray.length
        ) {
          console.log("Invalid selection. Try again.");
          continue;
        }
        const userDice = this.diceArray[userDiceIndex];
        console.log(`You choose the [${userDice.values.join(",")}] dice.`);
  
        this.executeTurn(computerDice, userDice);
        break;
      }
    }
    executeTurn(computerDice, userDice) {
      const range = 6;
      const generator = new FairRandomGenerator(range);
  
      console.log("It's time for my throw.");
      const { randomValue: computerNumber, hmac } = generator.generate();
      console.log(
        `I selected a random value in the range 0..5 (HMAC=${hmac}).`
      );
      console.log("Add your number modulo 6.");
      console.log("0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help");
      let userNumber;
      while (true) {
        const userInput = readlineSync.question("Your selection: ");
        if (userInput === "X") process.exit();
        if (userInput === "?") {
          ProbabilityTable.display(this.diceArray);
          continue;
        }
        userNumber = parseInt(userInput);
        if (isNaN(userNumber) || userNumber < 0 || userNumber >= range) {
          console.log("Invalid selection. Try again.");
        } else {
          break;
        }
      }
      console.log(
        `My number is ${computerNumber} (KEY=${generator.revealKey()}).`
      );
      const result = (computerNumber + userNumber) % range;
      console.log(`The result is ${computerNumber} + ${userNumber} = ${result} (mod 6).`);
  
      const computerThrow = computerDice.roll(result);
      console.log(`My throw is ${computerThrow}.`);
  
      const userThrow = userDice.roll(result);
      console.log(`Your throw is ${userThrow}.`);
  
      if (userThrow > computerThrow) {
        console.log(`You win (${userThrow} > ${computerThrow})!`);
      } else if (userThrow < computerThrow) {
        console.log(`I win (${computerThrow} > ${userThrow})!`);
      } else {
        console.log(`It's a tie (${userThrow} = ${computerThrow})!`);
      }
    }
  }
  module.exports = { Gaming };
