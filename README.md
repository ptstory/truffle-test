# ERC20 Standard Token and Crowdsale

This truffle testing suite tests some of the basic functionalities of the ERC20 standard Token and Crowdsale for the Ethereum blockchain smart contracts using OpenZeppelin's implementation.

### Prerequisites

- You will need `NodeJS` v8.9.4 or later. `NodeJS` and installation instructions can be found for all major operating systems at: `https://nodejs.org/en/download/`.

- You will need `truffle` installed globally. If you haven't done so: 

```shell
$ npm install -g truffle
```
Ensure that it was installed correctly by running:

```shell
$ truffle version
```

You should see 

```shell
Truffle v5.0.7 (core: 5.0.7)
Solidity v0.5.0 (solc-js)
```

### Installing

- Clone this repo to your local machine using `https://github.com/ptstory/truffle-test.git`
- The `node_modules` folder is included in the repo, so there should be no need to run `npm install`, but if you have any issues with dependencies, the `package.json` is included as well.

## Using the program

After cloning the repo, navigate to the directory containing `truffle.js` and run:

```shell
$ truffle version
```

You should see 

```shell
Truffle v5.0.7 (core: 5.0.7)
Solidity - 0.4.24 (solc-js)
```

Notice that the `Solidity` compiler version has changed from what you saw before. This is because `v0.4.24` is specified in `truffle.js`, where as running `truffle` globally uses the default compiler.

```shell
$ truffle compile
```
Next, open the `truffle` console with a local development blockchain with:

```shell
$ truffle develop
```

With the `truffle` console open, run the test file with:

```shell
$ truffle test
```

After creating and deploying the contracts, I wrote the `truffle` test files found in the `tests` folder to
test all the basic functionality you would expect from an ERC20 token and crowdsale. The `truffle test` command run in the console above executes all of the test files included in the `tests` folder. Complete 
test coverage can be seen below:

NOTE: If you try to run the tests multiple times in the same `truffle` console, you may get the following error:

![Image of error](images/error.png?raw=true)

Simply exit the console with `CTRL+C` and then re-open the console and run `truffle test` again.




![Image of complete test coverage](images/complete_test_coverage.png?raw=true)

## Solutions to exercises

- Change the minimum contribution to 5 Ether. (20 points)\
    ![Image of changing contribution to 5 ether](images/change_minimum_contribution.png?raw=true)
- Add method, getTokensLeft, to report how many tokens are left. (30 points)\

    *The OpenZeppelin implementation of ERC20 includes function `totalSupply()` that returns
    the total number of tokens in existence as `uint256`. Diving this value by the `_decimals` value
    gives you the number of tokens left.*
    ![Image of getTokensLeft()](images/get_tokens_left.png?raw=true)
- Add the needed functionality to not allow more than 1 purchase per account. (40 points)\
    
    *I added the following line to the overriden `_preValidatePurchase` in the `ExampleTokenCrowdsale` contract. When a beneficiary tries to buy tokens, if their existing contribution is not less than the
    minimum contribution cap, it means they have already successfully made a purchase.*\
    ![Image of preventing multi purchase](images/prevent_multi_purchase.png?raw=true)

Testing contract with the following parameters:

```shell
Token name: "CSC4980 Token"
Token symbol: "GSU"
Token decimals: 18
rate: 450 tokens x Ether
cap: 150 Ether
```

- Try to buy tokens with 2.5 ether (10 points)\
    ![Image of trying to buy tokens with 2.5 ether](images/try_to_buy_with_2.5.png?raw=true)
- Buy tokens with 15 ether (10 points)\
    ![Image of buying tokens with 15 ether](images/buy_with_15.png?raw=true)
- Return how many tokens are left (10 points)\
    *The number `6750` is logged by the console.*
    ![Image of returning tokens left](images/return_tokens_left.png?raw=true)
- 4): Buy tokens (again) with 25 Ether (10 points)\
    ![Image of trying to buy tokens twice](images/try_buy_tokens_twice.png?raw=true)

![Image of answers](images/answers.png?raw=true)



## Authors

* **Perry Story** - (https://github.com/ptstory)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Dr. Juan Banda for the assignment
* Learning materials used: https://www.youtube.com/watch?v=_ikc4Ct7wvk and countless Ethereum Stack Exchange questions