routes = [
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
            let data = shitCoin.getData()
            let response = {
                success: true,
                tokens: Object.values(data.tokens)
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
                response.contract = shitCoin.contracts[req.params.token]
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