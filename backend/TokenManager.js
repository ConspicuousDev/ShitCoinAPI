class TokenManager{
    constructor(){
        this.tokens = {}
    }

    getToken(address){
        if(this.tokens.hasOwnProperty(address)){
            return this.tokens[address]
        }
        throw new Error(`Token '${address}' not found.`)
    }
    getTokens(){
        return Object.values(this.tokens)
    }

    addToken(token){
        this.tokens[token.address] = token
        console.log("Token scanned: " + token.address + ".")
    }
    removeToken(address){
        if(this.tokens.hasOwnProperty(address)){
            delete tokens[address]
            return
        }
        throw new Error(`Token '${address}' not found.`)
    }
}

module.exports = TokenManager