const { query } = require("express")
const res = require("express/lib/response")
const Token = require("./Token")

class TokenManager{
    constructor(db){
        this.tokens = db.collection("tokens")
        console.log(" > TokenManager initialized.")
    }

    async getToken(query){
        let token = await this.tokens.findOne(query)
            .catch((e) => {throw new Error(`No matching Token found.`)})
        return token
    }
    async getTokens(query){
        return await this.tokens.find(query).toArray()
    }

    async addToken(token){
        await this.getToken({address: token.address})
            .then(async () => {
                await this.tokens.insertOne(token)
                    .catch((e) => {throw e})
            })
        .catch((e) => {throw new Error(`Token ${token.address} has already been logged.`)})
    }
    
    async updateToken(address, values){
        await this.tokens.updateOne({address: address}, {$set: values})
            .catch(() => {throw new Error(`Token '${address}' not found.`)})
    }

    async removeToken(address){
        await tokens.deleteMany({address: address})
    }
}

module.exports = TokenManager