const { MongoClient } = require("mongodb")
const Token = require("./Token")

class TokenManager{
    constructor(url){
        this.connect(url)
    }

    async connect(url){
        console.log("Connecting to database...")
        try{
            this.mongo = new MongoClient(url.replace("URL_PLACEHOLDER", "omniscient.phild.education"))
            await this.mongo.connect()
        }catch(e){
            this.mongo = new MongoClient(url.replace("URL_PLACEHOLDER", "localhost"))
            await this.mongo.connect()
        }
        console.log("Connection successful!")
        this.db = this.mongo.db("shitcoin")
        this.tokens = this.db.collection("tokens")
    }

    isConnected(){
        return this.db
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