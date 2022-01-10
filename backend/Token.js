let { web3 } = require("./constants");

class Token{
    constructor(ticker, name, address, totalSupply, owner, liquidity, contract, tax, liquidityDate){
        this.ticker = ticker;
        this.name = name;
        this.address = address
        this.owner = owner; 
        this.totalSupply = totalSupply;
        this.liquidity = liquidity;
        this.contract = contract;
        this.tax = tax;
        this.liquidityDate = liquidityDate; // PASSING CURRENT DATE
        this.score = Math.random()
    }
 }

 module.exports = Token