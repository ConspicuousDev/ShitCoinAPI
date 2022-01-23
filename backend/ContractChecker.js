let { web3 } = require("./constants");
const fetch = require('cross-fetch');
var solc = require('solc');
var { baseSettings } = require("./constants")

class ContractChecker{
    async compile(token){
        solc.loadRemoteVersion(token.contract.compiler, function(err, solcSnapshot) {
            
        });
    }
}

module.exports = ContractChecker