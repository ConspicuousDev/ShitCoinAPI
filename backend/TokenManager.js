const { query } = require("express")
const res = require("express/lib/response")
const Token = require("./Token")

class TokenManager{
    constructor(db){
        this.tokens = db.collection("tokens")
        console.log(" > TokenManager initialized.")
    }

    async getToken(query){
        let result = await this.tokens.findOne(query)
        if(result != undefined && result != null){
            return result
        }
        throw new Error(`No matching Token found.`)
    }
    async getTokens(query){
        return await this.tokens.find(query).toArray()
    }

    async addToken(token){
        try{
            await this.getToken({address: token.address})
        }catch(e){
            await this.tokens.insertOne(token).catch((e) => {throw e})
            return
        }
        throw new Error(`Token ${token.address} has already been logged.`)
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