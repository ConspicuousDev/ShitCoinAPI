let { web3 } = require("./constants");
const fetch = require('cross-fetch');
var solc = require('solc');
var { baseSettings } = require("./constants")

class ContractChecker{
    constructor(token){
        this.token = token
    }

    async compile(){
        solc.loadRemoteVersion(this.token.contract.compiler, (err, solcSnapshot) => { 
        });

        let compileSettings = {...baseSettings}
        compileSettings.sources["test.sol"].content = this.token.contract.sourceCode

        var output = JSON.parse(solc.compile(JSON.stringify(compileSettings)))
        console.log(output)

    }
}

module.exports = ContractChecker