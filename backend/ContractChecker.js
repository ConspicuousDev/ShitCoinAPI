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
    }
}

module.exports = ContractChecker