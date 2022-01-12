function routes(shitCoin){
    let manager = shitCoin.tokenManager
    return [
        {
            route: "/",
            async request(req, res) {
                return {
                    message: "Welcome to ShitCoin API.",
                    success: true,
                    version: "0.0.1"
                }
            }
        },
        {
            route: "/v1/tokens",
            async request(req, res) {
                return {
                    success: true,
                    tokens: await manager.getTokens()
                }
            }
        },
        {
            route: "/v1/token/:address",
            async request(req, res) {
                return {
                    token: await manager.getToken(req.params.address)
                }
            }
        },
        {
            route: "*",
            async request(req, res){
                return {
                    message: "Endpoint not found.",
                    success: false
                }
            }
        }
    ]
}

module.exports = routes