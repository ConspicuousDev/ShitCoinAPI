const { sleep, getBscScanData } = require("./utils");
const fetch = require('cross-fetch');
const Web3 = require("web3")
let { web3, addresses, abis, provider } = require("./constants");
const { timeout } = require("nodemon/lib/config");
const fs = require('fs')

let tokens = {}
let contracts = {}

let listener;
let pancakeRouter; 
let pancakeFactory;
let WBNB;

class Token{
   constructor(ticker, name, address, totalSupply, owner, liquidity, publicCode, tax, liquidityDate){
       this.ticker = ticker; //Done
       this.name = name; //Done
       this.address = address //Done
       this.owner = owner; //Done
       this.totalSupply = totalSupply;
       this.liquidity = liquidity;
       this.publicCode = publicCode; //Done
       this.tax = tax;
       this.liquidityDate = liquidityDate; //Done
       this.score = Math.random()
   }
}
class Holder{
    constructor(quantity, averagePrice, totalInvested, positionValue, transactions){
        this.quantity = quantity;
        this.averagePrice = averagePrice;
        this.totalInvested = totalInvested;
        this.positionValue = positionValue;
        this.transactions = transactions;
    }  
}

async function createListener(){
    pancakeRouter = new web3.eth.Contract(abis.PANCAKE_ROUTER, addresses.PANCAKE_ROUTER)
    pancakeFactory = new web3.eth.Contract(abis.PANCAKE_FACTORY, addresses.PANCAKE_FACTORY)
    WBNB = new web3.eth.Contract(abis.WBNB_ABI, addresses.WBNB)

    listener = pancakeFactory.events.PairCreated()
    
    listener.on('data', async event => {logToken(event)});
}
async function connect(){
    while(true){
        if(!web3.currentProvider.connected){
            //web3 = new Web3(new Web3.providers.HttpProvider((provider)));
            web3 = new Web3(new Web3.providers.WebsocketProvider((provider)));
            //console.log("Reconnected to provider!")
            try{
                listener.unsubscribe()
            }catch{}
            createListener()
        }
        await sleep(4000)
    }
}
async function logToken(event){
    let tokenAddress = "0x0"
    if(event.returnValues.token0===addresses.WBNB||event.returnValues.token1===addresses.WBNB){
        if(event.returnValues.token0===addresses.WBNB){
            tokenAddress=event.returnValues.token1
        }else{
            tokenAddress=event.returnValues.token0
        }
        const scanData = await getBscScanData(tokenAddress)
        let tokenContract = new web3.eth.Contract(abis.GENERAL_ABI, tokenAddress)
        
        scanData.ticker = await tokenContract.methods.symbol().call();
        if(scanData.name===''){
            scanData.name = await tokenContract.methods.name().call();
        }
        try{
            scanData.owner = await tokenContract.methods.owner().call()
        }catch{
            scanData.owner = null;
        }
        scanData.totalSupply = await tokenContract.methods.totalSupply().call() / (10 ** await tokenContract.methods.decimals().call())

        scanData.liq = await WBNB.methods.balanceOf(event.returnValues.pair).call() / (10 ** 18)

        let token = new Token(scanData.ticker, scanData.name, tokenAddress, scanData.totalSupply, scanData.owner, scanData.liq, scanData.publicCode, scanData.tax, Date.now())
        tokens[token.address] = token
        contracts[token.address] = scanData.sourceCode
        console.log("Token scanned: "+token.address+".")
    }
}


async function main(){
    console.log(" ____  _     _ _   ____        _  __  __           TM");
    console.log("/ ___|| |__ (_) |_/ ___| _ __ (_)/ _|/ _| ___ _ __ ");
    console.log("\\___ \\| '_ \\| | __\\___ \\| '_ \\| | |_| |_ / _ \\ '__|");
    console.log(" ___) | | | | | |_ ___) | | | | |  _|  _|  __/ |   ");
    console.log("|____/|_| |_|_|\\__|____/|_| |_|_|_| |_|  \\___|_|   v0.0.1");
    createListener()
    connect()
    console.log(" ")
}

module.exports = { main, tokens, contracts }