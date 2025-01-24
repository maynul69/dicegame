class Dice {
    constructor(values) {
      this.values = values;
    }
    roll(value) {
      return this.values[value % this.values.length];
    }
  }
  module.exports = { Dice };
