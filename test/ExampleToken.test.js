const ExampleToken = artifacts.require('ExampleToken');

require('chai')
  .should();

contract('ExampleToken', accounts => {
  const _name = 'Example Token';
  const _symbol = 'EXM';
  const _decimals = 18;

  beforeEach(async function () {
    this.token = await ExampleToken.new(_name, _symbol, _decimals);
  });

  describe('token attributes', function() {
    it('has the correct name', async function() {
      const name = await this.token.name();
      name.should.equal(_name);
    });

    it('has the correct symbol', async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal(_symbol);
    });

    it('has the correct decimals', async function() {
      const decimals = await this.token.decimals();
      assert.equal(decimals.toString(), _decimals)
    });
  });
});
