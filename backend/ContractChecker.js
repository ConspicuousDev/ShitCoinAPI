let { web3test } = require("./constants");
const fetch = require('cross-fetch');
var { baseSettings } = require("./constants")

class ContractChecker{
    constructor(token, solc){
        this.token = token
        this.solc = solc
    }

    async compile(){
        let compileSettings = {...baseSettings}
        compileSettings.sources["test.sol"].content = this.token.contract.sourceCode
        let compileOutput = JSON.parse(this.solc.compile(JSON.stringify(compileSettings)))
        
        let abi = compileOutput.contracts["test.sol"][this.token.contract.name].abi
        let bytecode = compileOutput.contracts["test.sol"][this.token.contract.name].evm.bytecode.object1
        let contract = new web3test.eth.Contract(abi)
        let tx = contract.deploy({data: bytecode})
        tx.gas = 2000000
        let signedTx = await web3test.eth.accounts.signTransaction(tx, "0xd22a982ed5689621c0bf0a7be3463b31fc649048284222781727e83113356d78")
        let sentTx = web3test.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    }
}

module.exports = ContractChecker