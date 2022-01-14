function routes(shitCoin){
    let manager = shitCoin.tokenManager
    return [
        {
            route: "/",
            async request(req, res) {
                return {
                    message: "Welcome to ShitCoin API.",
                    success: true,
                    version: shitCoin.version
                }
            }
        },
        {
            route: "/v1/tokens",
            async request(req, res) {
                return {
                    success: true,
                    tokens: await manager.getTokens(req.query)
                }
            }
        },
        {
            route: "/v1/token",
            async request(req, res){
                if(Object.values(req.query).length === 0) throw new Error(`Query has not been defined.`)
                return {
                    success: true,
                    token: await manager.getToken(req.query)
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