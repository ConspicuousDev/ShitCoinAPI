let { web3 } = require("./constants");

class Token{
    constructor(ticker, name, address, totalSupply, owner, liquidity, contract, tax, scannedAt){
        this.ticker = ticker;
        this.name = name;
        this.address = address
        this.owner = owner; 
        this.totalSupply = totalSupply;
        this.liquidity = liquidity;
        this.contract = contract;
        this.tax = tax;
        this.scannedAt = scannedAt;
        this.score = null
    }
 }

 module.exports = Token