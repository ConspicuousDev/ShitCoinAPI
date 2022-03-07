const routes = (shitCoin) => {
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
                let query = Object.keys(req.query).includes("query") ? JSON.parse(req.query.query) : {}
                return {
                    success: true,
                    query: query,
                    tokens: await manager.getTokens(query)
                }
            }
        },
        {
            route: "/v1/token",
            async request(req, res){
                let query = Object.keys(req.query).includes("query") ? JSON.parse(req.query.query) : {}
                if(Object.keys(query).length === 0) throw new Error(`Query has not been defined.`)
                return {
                    success: true,
                    query: query,
                    token: await manager.getToken(query)
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