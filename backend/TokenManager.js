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
            .catch(() => {throw new Error(`No matching Token found.`)})
        delete token._id
        return token
    }
    async getTokens(query){
        let tokens = await this.tokens.find(query).toArray()
        tokens.forEach(token => {delete token._id})
        return tokens
    }

    async addToken(token){
        await this.getToken({address: token.address})
            .then(() => {throw new Error(`Token ${token.address} has already been logged.`)})
            .catch(async () => {
                await this.tokens.insertOne(token)
                    .catch(e => {throw e})
            })
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