let { web3 } = require("./constants");
const fetch = require('cross-fetch');
var { baseSettings } = require("./constants")

class ContractChecker{
    constructor(token, solc){
        this.token = token
    }

    async compile(){
        let compileSettings = {...baseSettings}
        compileSettings.sources["test.sol"].content = this.token.contract.sourceCode
        return JSON.parse(this.solc.compile(JSON.stringify(compileSettings)))
    }
}

module.exports = ContractChecker