const { MongoClient } = require("mongodb")
const Token = require("./Token")

class TokenManager{
    async constructor(url){
        this.mongo = new MongoClient(url)
        await this.mongo.connect()
        this.db = mongo.db("shitcoin")
        this.tokens = db.collection("tokens")
    }

    async getToken(address){
        let result = await this.tokens.findOne({address: address})
        if(result !== undefined){
            return result
        }
        throw new Error(`Token '${address}' not found.`)
    }
    async getTokens(){
        return await this.tokens.find({}).toArray()
    }

    async addToken(token){
        await this.tokens.insertOne(token)
    }
    async removeToken(address){
        //UPDATE TO USE MONGODB
        if(this.tokens.hasOwnProperty(address)){
            delete tokens[address]
            return
        }
        throw new Error(`Token '${address}' not found.`)
    }
}

module.exports = TokenManager