const utils = require("./utils")
const TokenScanner = require("./TokenScanner");
const TokenManager = require("./TokenManager")
const TokenScorer = require("./TokenScorer")
const Token = require("./Token")
const Holder = require("./Holder");
const { MongoClient } = require("mongodb");

class ShitCoin{
    constructor(version){
        this.version = version
    }

    async setMongoClient(){
        let connected = false
        let client = new MongoClient("mongodb://superuser:Lorenzo1%21@localhost:27017/shitcoin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
        await client.connect()
            .then(() => {
                console.log(" > Local MongoClient URI set.")
                connected = true
            })
            .catch(() => {})
        if(connected) return client
        client = new MongoClient("mongodb://superuser:Lorenzo1%21@omniscient.phild.education:27017/shitcoin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
        await client.connect()
            .then(() => {
                console.log(" > External MongoClient URI set.")
                connected = true
            })
            .catch(() => {})
        if(connected) return client
        throw new Error(" > Couldn't connect to database.")
    }

    async mongoReonnect(){
        await client.connect()
            .then(() => {
                console.log(" > MongoClient reconnection succeeded.")
            })
            .catch(() => {
                console.log(" > MongoClient reconnection failed.")
            })
    }

    async start(){
        console.log(` ____  _     _ _   ____        _  __  __           TM`);
        console.log(`/ ___|| |__ (_) |_/ ___| _ __ (_)/ _|/ _| ___ _ __ `);
        console.log(`\\___ \\| '_ \\| | __\\___ \\| '_ \\| | |_| |_ / _ \\ '__|`);
        console.log(` ___) | | | | | |_ ___) | | | | |  _|  _|  __/ |   `);
        console.log(`|____/|_| |_|_|\\__|____/|_| |_|_|_| |_|  \\___|_|   v${this.version}.0`);
        console.log(` `)
        this.mongo = await this.setMongoClient()
        this.db = this.mongo.db("shitcoin")
        this.tokenManager = new TokenManager(this.db)
        this.tokenScorer = new TokenScorer(this.tokenManager)
        //this.scanner = new TokenScanner(this.tokenManager)
        console.log(` `)

    }
}

module.exports = ShitCoin