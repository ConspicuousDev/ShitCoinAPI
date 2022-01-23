const Web3 = require("web3");
const fetch = require('cross-fetch');
let { web3, addresses, abis, provider } = require("./constants");
const { sleep } = require("./utils");
const ContractParser = require("./ContractParser")
const Token = require("./Token")

class Scanner {
    constructor(tokenManager) {
        this.tokenManager = tokenManager
        this.createListener()
        this.connect()
        console.log(" > Scanner initialized.")
    }

    async createListener() {
        let pancakeRouter = new web3.eth.Contract(abis.PANCAKE_ROUTER, addresses.PANCAKE_ROUTER)
        let pancakeFactory = new web3.eth.Contract(abis.PANCAKE_FACTORY, addresses.PANCAKE_FACTORY)
        this.WBNB = new web3.eth.Contract(abis.WBNB_ABI, addresses.WBNB)
        this.listener = pancakeFactory.events.PairCreated()
        this.listener.on('data', async event => { this.logToken(event) });
    }
    async connect() {
        while (true) {
            if (!web3.currentProvider.connected) {
                web3 = new Web3(new Web3.providers.WebsocketProvider((provider)));
                //console.log("Reconnected to provider!")
                try {
                    this.listener.unsubscribe()
                } catch { }
                this.createListener()
            }
            await sleep(4000)
        }
    }
    async getBscScanData(address){
        let response = await fetch("https://api.bscscan.com/api?module=contract&action=getsourcecode&address=" + address + "&apikey=ZF1G2TWRC54PUCD5AAPT1FCYBXIHYE4BVU")
        response = await response.json()
        let rugResponse = await fetch("https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=" + address)
        rugResponse = await rugResponse.json()
        let data = {name: response.result[0].ContractName, tax: [rugResponse.BuyTax, rugResponse.SellTax], contract: null}
        if(response.result[0].SourceCode !== ''){
            data.contract = {
                sourceCode: new ContractParser(response.result[0].ContractName, response.result[0].SourceCode).parse(),
                abi: response.result[0].ABI
            }
        }
        return data
    }
    async logToken(event) {
        let tokenAddress = "0x0"
        if (event.returnValues.token0 === addresses.WBNB || event.returnValues.token1 === addresses.WBNB) {
            if (event.returnValues.token0 === addresses.WBNB) {
                tokenAddress = event.returnValues.token1
            } else {
                tokenAddress = event.returnValues.token0
            }
            const scanData = await this.getBscScanData(tokenAddress)
            let tokenContract = new web3.eth.Contract(abis.GENERAL_ABI, tokenAddress)
            scanData.ticker = await tokenContract.methods.symbol().call();
            if (scanData.name === "") {
                scanData.name = await tokenContract.methods.name().call();
            }
            try {
                scanData.owner = await tokenContract.methods.owner().call()
            } catch {
                scanData.owner = null;
            }
            scanData.totalSupply = await tokenContract.methods.totalSupply().call() / (10 ** await tokenContract.methods.decimals().call())
            scanData.liq = await this.WBNB.methods.balanceOf(event.returnValues.pair).call() / (10 ** 18)
            let time = Date.now()
            let token = new Token(scanData.ticker, scanData.name, tokenAddress, scanData.totalSupply, scanData.owner, scanData.liq, scanData.contract, scanData.tax, time)
            await this.tokenManager.addToken(token)
                .then(() => {console.log(`[TokenScanner] Token '${token.address}' has been scanned.`)})
                .catch((e) => {console.log(`[TokenScanner] WARNING: ${e.message}`)})            
        }
    }
}
module.exports = Scanner