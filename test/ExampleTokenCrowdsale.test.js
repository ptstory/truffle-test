import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .should();

const ExampleToken = artifacts.require('ExampleToken');
const ExampleTokenCrowdsale = artifacts.require('ExampleTokenCrowdsale');

contract('ExampleTokenCrowdsale', function([_, wallet, investor1, investor2]) {

  before(async function() {
    // Transfer some ether to investor1
    await web3.eth.sendTransaction({ from: _, to: investor1, value: ether(25) })
  });

  beforeEach(async function () {
    // Configure token
    this.name = "ExampleToken";
    this.symbol = "EXM";
    this.decimals = 18;

    // Deploy Token
    this.token = await ExampleToken.new(
      this.name,
      this.symbol,
      this.decimals
    );

    // Configure crowdsale
    this.rate = 500;
    this.wallet = wallet;
    this.cap = ether(100);


    // Set investor caps
    this.investorMinCap = ether(2);
    this.inestorHardCap = ether(50);

    this.crowdsale = await ExampleTokenCrowdsale.new(
      this.rate,
      this.wallet,
      this.token.address,
      this.cap,
    );


    // Transfer token ownership to crowdsale
    await this.token.transferOwnership(this.crowdsale.address);

  });

  describe('crowdsale', function() {
    it('tracks the rate', async function() {
      const rate = await this.crowdsale.rate();
      assert.equal(rate, this.rate)
    });

    it('tracks the wallet', async function() {
      const wallet = await this.crowdsale.wallet();
      wallet.should.equal(this.wallet);
    });

    it('tracks the token', async function() {
      const token = await this.crowdsale.token();
      token.should.equal(this.token.address);
    });
  });

  describe('minted crowdsale', function() {
    it('mints tokens after purchase', async function() {
      const originalTotalSupply = await this.token.getTokensLeft();
      console.log("original total supply in tokens (before minting): " + originalTotalSupply);
      await this.crowdsale.sendTransaction({ value: ether(5), from: investor1 }); // 5 ether is minimum contribution
      const newTotalSupply = await this.token.getTokensLeft();
      console.log("new total supply in tokens (after minting): " + newTotalSupply);

      assert.isTrue(newTotalSupply > originalTotalSupply);
    });
  });

  describe('capped crowdsale', async function() {
    it('has the correct hard cap', async function() {
      const cap = await this.crowdsale.cap();
      const capToEther = web3.utils.fromWei(cap.toString(), "ether" );
      assert.equal(capToEther, web3.utils.fromWei(this.cap.toString(), "ether" ) );
    });
  });


  describe('accepting payments', function() {
    it('should accept payments', async function() {
      const value = ether(5); // 5 ether is minimum contribution
      const purchaser = investor2;
      await this.crowdsale.sendTransaction({ value: value, from: investor1 }).should.be.fulfilled;
      await this.crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
    });
  });

  describe('buyTokens()', function() {
    describe('when the contribution is less than the minimum cap', function() {
      it('rejects the transaction', async function() {
        const value = ether(1) // 5 ether is minimum contribution so this is not enough
        await this.crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.rejectedWith(EVMRevert);
      });
    });
  });

  describe('when the total contributions exceed the investor hard cap', function () {
    it('rejects the transaction', async function () {
      // First contribution is valid
      const value1 = ether(5);
      await this.crowdsale.buyTokens(investor1, { value: value1, from: investor1 });
      // Second contribution causes total contributions to exceed cap
      const value2 = ether(46); //cap is 50 ether, (5 + 46) > 50
      await this.crowdsale.buyTokens(investor1, { value: value2, from: investor1 }).should.be.rejectedWith(EVMRevert);
    });
  });

  describe('when the contribution is within the valid range', function () {
    const value = ether(5); // 5 ether is minimum contribution, therefore it is within valid range
    it('succeeds & updates the contribution amount', async function () {
      await this.crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.fulfilled;

      const contribution = await this.crowdsale.getUserContribution(investor2);

      const contributionToEther = web3.utils.fromWei(contribution.toString(), "ether" );
      const valueToEther = web3.utils.fromWei(value.toString(), "ether" );

      console.log("expected user contribution: " + valueToEther + " ether")
      console.log("actual user contribution " + contributionToEther + " ether" );
    
    
      assert.equal(contributionToEther. valueToEther);
    });
  });
});
