pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol"; //renamed
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol"; //renamed
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol"; //renamed
import "openzeppelin-solidity/contracts/ownership/Ownable.sol"; //added



/**
 * @title ERC20Detailed token //renamed
 * @dev The decimals are only for visualization purposes.
 * All the operations are done using the smallest and indivisible token unit,
 * just as on Ethereum all the operations are done in wei.
 */
contract MyToken is ERC20, ERC20Mintable, ERC20Detailed, Ownable { //renamed in constructor, added Ownable

  //We inherited the DetailedERC20 
  constructor(string memory _name, string memory _symbol, uint8 _decimals) //added 'memory' here
  ERC20Detailed(_name, _symbol, _decimals) //changed this to current name
  public {
  }

}