const utils = require("./utils")
const Scanner = require("./Scanner");
const TokenManager = require("./TokenManager")
const Token = require("./Token")
const Holder = require("./Holder");
const { MongoClient } = require("mongodb");

class ShitCoin{
    constructor(){}

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
        throw new Error("Couldn't connect to database.")
    }

    async mongoConnect(){
        await client.connect()
            .then(() => {
                connected = true
            })
            .catch(() => {
                connected = false
            })
    }

    async start(){
        console.log(" ____  _     _ _   ____        _  __  __           TM");
        console.log("/ ___|| |__ (_) |_/ ___| _ __ (_)/ _|/ _| ___ _ __ ");
        console.log("\\___ \\| '_ \\| | __\\___ \\| '_ \\| | |_| |_ / _ \\ '__|");
        console.log(" ___) | | | | | |_ ___) | | | | |  _|  _|  __/ |   ");
        console.log("|____/|_| |_|_|\\__|____/|_| |_|_|_| |_|  \\___|_|   v0.0.1");
        console.log(" ")
        this.mongo = await this.setMongoClient()
        this.tokenManager = new TokenManager(this.mongo.db("shitcoin"))
        this.scanner = new Scanner(this.tokenManager)
        console.log(" ")

    }
}

module.exports = ShitCoin