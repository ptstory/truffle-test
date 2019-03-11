pragma solidity ^0.5.0;


import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract MyTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale{

	//minimum investor Contribution - 20000000000000000000
	//minimum investor Contribution - 50000000000000000000
	uint256 public investorMinCap = 20000000000000000000;
	uint256 public investorHardCap = 50000000000000000000;

	mapping(address => uint256) public contributions;

	constructor(uint256 _rate,
	  address payable _wallet, //added 'payable' here
	  ERC20 _token,
	  uint256 _cap)
	Crowdsale(_rate, _wallet, _token)
	CappedCrowdsale(_cap)
	public{
	}


  function _preValidatePurchase(
    address _beneficiary,
    uint256 _weiAmount
  )
    internal //remove "view" from _preValidatePurchase in crowdsale/Crowdsale.sol, crowdsale/validation/cappedcrowdsale.sol
  {
    super._preValidatePurchase(_beneficiary, _weiAmount);
    uint256 _existingContribution = contributions[_beneficiary];
    uint256 _newContribution = _existingContribution.add(_weiAmount);
    require(_newContribution >= investorMinCap && _newContribution <= investorHardCap);
	contributions[_beneficiary] = _newContribution;     
  }
  
}