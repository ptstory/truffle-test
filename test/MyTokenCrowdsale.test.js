const MyToken = artifacts.require('MyToken');
const MyTokenCrowdsale = artifacts.require('./MyTokenCrowdsale');
const assert = require('assert');


const ether = (n) => new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));


contract('MyTokenCrowdsale' , ([_, wallet])  => {
	beforeEach(async () => {	
		this.tokenInstance = await MyToken.new('CSC 4980 Token', 'GSU' , 18);
		this.rate = 500; 
		this.wallet = wallet;
		this.token = this.tokenInstance;
		this.cap = ether(100);
		
		this.crowdsale = await MyTokenCrowdsale
		.new(this.rate, 
			this.wallet, 
			this.token.address,
			this.cap,
            );

		await this.token.transferOwnership(this.crowdsale.address); 
	
	})


	it('Token Test' , async() => {	
		 const tok =  await this.crowdsale.token();
		assert.equal(tok , this.token.address);
	});

	it('token total supply test', async() => {
		const totalSupply = await this.token.totalSupply();
        console.log("total supply: " + totalSupply);
        assert.notEqual(totalSupply, 0)
	})

}) 