const ExampleToken = artifacts.require("./ExampleToken.sol");
const ExampleTokenCrowdsale = artifacts.require("./ExampleTokenCrowdsale.sol");

const ether = (n) => new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));

module.exports = async function(deployer, network, accounts) {
  const _name = "Example Token";
  const _symbol = "EXM";
  const _decimals = 18;

  await deployer.deploy(ExampleToken, _name, _symbol, _decimals);
  const deployedToken = await ExampleToken.deployed();

  const _rate           = 500;
  const _wallet         = accounts[0];
  const _token          = deployedToken.address;
  const _cap            = ether(100);


  await deployer.deploy(
    ExampleTokenCrowdsale,
    _rate,
    _wallet,
    _token,
    _cap,
  );

  return true;
};
