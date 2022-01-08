function routes(shitCoin){
    let manager = shitCoin.tokenManager
    return [
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
                    tokens: manager.getTokens()
                }
                res.json(response)
            }
        },
        {
            route: "/v1/token/:address",
            request(req, res) {
                let response = {}
                try{
                    response.success = true
                    response.token = manager.getToken(req.params.address)
                }catch(e){
                    response.success = false
                    response.message = e.message
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
}

module.exports = routes