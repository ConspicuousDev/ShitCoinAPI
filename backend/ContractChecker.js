let { web3 } = require("./constants");
const fetch = require('cross-fetch');

class ContractChecker{
    constructor(sourcecode, address){
        let sourceCodeData = "https://api.bscscan.com/api?module=contract&action=getsourcecode&address=" + address + "&apikey=ZF1G2TWRC54PUCD5AAPT1FCYBXIHYE4BVU"
        let parameters = fetch(sourceCodeData)
    }

    constructor(address, abi){

    }
}