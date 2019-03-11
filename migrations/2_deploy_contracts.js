

const MyToken = artifacts.require("MyToken");
const MyTokenCrowdsale = artifacts.require("MyTokenCrowdsale");


const ether = (n) => new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));



module.exports = async function(deployer , network , accounts) {
  const _name = "Example Token";
  const _symbol = "EXM";
  const _decimal = 18;
  
  deployer.deploy(MyToken,_name,_symbol,_decimal)
  .then(() => MyToken.deployed())
  .then(token => deployer.deploy(MyTokenCrowdsale
                                  , 500
                                  , accounts[0]
                                  , token.address
                                  , ether(200)))
};


