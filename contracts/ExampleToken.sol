pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";

contract ExampleToken is MintableToken, DetailedERC20 {
    constructor(string _name, string _symbol, uint8 _decimals)
        DetailedERC20(_name, _symbol, _decimals)
        public
    {
    }

   /**
  * @dev Returns the tokens left
  * @return Tokens left
  */
  function getTokensLeft()
    public view returns (uint256)
  {
    return totalSupply()/1e18;
  }
}
