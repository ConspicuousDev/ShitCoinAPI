const shitCoin = require("./shitCoin")
const contractParser = require("./contractParser")

let routes = [
    {
        route: "/",
        request(req, res) {
            res.json({
                message: "Welcome to ShitCoin API.",
                success: true,
                version: "0.0.1"
            })
        }
    },
    {
        route: "/v1/tokens",
        request(req, res) {
            let response = {
                success: true,
                tokens: Object.values(shitCoin.tokens)
            }
            res.json(response)
        }
    },
    {
        route: "/v1/token/:token",
        request(req, res) {
            let response = {success: shitCoin.tokens.hasOwnProperty(req.params.token)}
            if(response.success){
                response.token = shitCoin.tokens[req.params.token]
                response.contract = null
                if(shitCoin.contracts.hasOwnProperty(req.params.token)){
                    response.contract = shitCoin.contracts[req.params.token]
                    response.contract.parsed = contractParser.parseContract(response.contract.SourceCode,response.contract.ContractName)
                }
            }else{
                response.message = "Token not found."
            }
            
            res.json(response)
        }
    },
    {
        route: "*",
        request(req, res){
            res.json({
                message: "Endpoint not found.",
                success: false
            })
        }
    }
]

module.exports = { routes }