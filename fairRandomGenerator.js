const crypto = require("crypto");
class FairRandomGenerator {
    constructor(range) {
      this.range = range;
    }
    generate(){
      this.key = crypto.randomBytes(32).toString("hex"); // Generate 256-bit key
      this.randomValue = crypto.randomInt(this.range); // Generate random value
      const hmac = crypto.createHmac("sha3-256", this.key);
      hmac.update(this.randomValue.toString());
      return { randomValue: this.randomValue, hmac: hmac.digest("hex") };
    }
    revealKey() {
      return this.key;
    }
  }
  module.exports = { FairRandomGenerator };