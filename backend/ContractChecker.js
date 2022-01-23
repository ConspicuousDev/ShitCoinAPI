let { web3 } = require("./constants");
const fetch = require('cross-fetch');
var solc = require('solc');
var { baseSettings } = require("./constants")

class ContractChecker{
    constructor(token){
        this.token = token
    }

    compile(){
        solc.loadRemoteVersion(token.source.CompilerVersion, function(err, solcSnapshot) {
            if (err) {
                throw err;
            } else {
                solc.compile()
                let tokenSettings = {...baseSettings}
                
                tokenSettings.sources['test.sol'].content=this.token.contract.sourceCode
                console.log(tokenSettings)
            }
          });

    }


}