const fetch = require('cross-fetch');
const fs = require('fs')

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getBscScanData(address){
    let response = await fetch("https://api.bscscan.com/api?module=contract&action=getsourcecode&address=" + address + "&apikey=ZF1G2TWRC54PUCD5AAPT1FCYBXIHYE4BVU")
    response = await response.json()
    
    
    let rugResponse = await fetch("https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=" + address)
    rugResponse = await rugResponse.json()

    let data = {publicCode : true, name : response.result[0].ContractName, tax : rugResponse}

    if(response.result[0].SourceCode==''){
        data.publicCode=false;
    }else{
        fs.writeFile('source-codes/' + response.result[0].ContractName, response.result[0].SourceCode, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    return data
}

module.exports = { sleep, getBscScanData }