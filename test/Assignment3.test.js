import ether from "./helpers/ether";
import EVMRevert from "./helpers/EVMRevert";

require("chai")
  .use(require("chai-as-promised"))
  .should();

const ExampleToken = artifacts.require("ExampleToken");
const ExampleTokenCrowdsale = artifacts.require("ExampleTokenCrowdsale");

contract("ExampleTokenCrowdsale", function([_, wallet, investor1, investor2]) {
  before(async function() {
    // Transfer some ether to investor1
    await web3.eth.sendTransaction({
      from: _,
      to: investor1,
      value: ether(25)
    });
    // Configure token
    this.name = "CSC4980 Token";
    this.symbol = "GSU";
    this.decimals = 18;

    // Deploy Token
    this.token = await ExampleToken.new(this.name, this.symbol, this.decimals);

    // Configure crowdsale
    this.rate = 450;
    this.wallet = wallet;
    this.cap = ether(150);

    // Set investor caps
    this.investorMinCap = ether(5);
    this.inestorHardCap = ether(50);

    this.crowdsale = await ExampleTokenCrowdsale.new(
      this.rate,
      this.wallet,
      this.token.address,
      this.cap
    );

    // Transfer token ownership to crowdsale
    await this.token.transferOwnership(this.crowdsale.address);
    
  });

  describe("Answers to questions", function() {
    describe("when the contribution is less than the minimum cap", function() {
      it("rejects the transaction", async function() {
        const value = ether(2.5); // 5 ether is minimum contribution so this is not enough
        await this.crowdsale
          .buyTokens(investor2, { value: value, from: investor2 })
          .should.be.rejectedWith(EVMRevert);
      });
    });
    describe("when the contribution is within valid range", function() {
      it("accepts the transaction", async function() {
        const value = ether(15); // 5 ether is minimum contribution so this is valid
        await this.crowdsale.buyTokens(investor2, {
          value: value,
          from: investor2
        }).should.be.fulfilled;
      });
    });

    describe("after tokens have been purchased", function() {
    it("returns tokens left", async function() {
      const newTotalSupply = await this.token.getTokensLeft();
      console.log(
        "new total supply in tokens (after minting): " + newTotalSupply
      );
    });
  });

  describe("when a purchase has already been made by an account", function() {
    it("rejects the transaction", async function() {
        const value = ether(25); // valid contribution, but the account has already puchased once
        await this.crowdsale.buyTokens(investor2, {
          value: value,
          from: investor2
        }).should.be.rejectedWith(EVMRevert);
    });
  });
});
});
