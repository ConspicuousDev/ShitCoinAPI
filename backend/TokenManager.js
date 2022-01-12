const res = require("express/lib/response")
const Token = require("./Token")

class TokenManager{
    constructor(db){
        this.tokens = db.collection("tokens")
        console.log(" > TokenManager initialized.")
    }

    async getToken(address){
        let result = await this.tokens.findOne({address: address})
        if(result != undefined && result != null){
            return result
        }
        throw new Error(`Token '${address}' not found.`)
    }
    async getTokens(){
        return await this.tokens.find({}).toArray()
    }

    async addToken(token){
        await this.tokens.insertOne(token).catch(() => {throw new Error(`Token '${token.address}' has already been logged.`})
    }
    async removeToken(address){
        await tokens.deleteMany({address: address})
    }
}

module.exports = TokenManager