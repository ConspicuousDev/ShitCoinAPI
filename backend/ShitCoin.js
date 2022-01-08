const Scanner = require("./Scanner");
const TokenManager = require("./TokenManager")
const Token = require("./Token")
const Holder = require("./Holder")

class ShitCoin{
    constructor(){
        this.tokenManager = new TokenManager()
    }

    start(){
        console.log(" ____  _     _ _   ____        _  __  __           TM");
        console.log("/ ___|| |__ (_) |_/ ___| _ __ (_)/ _|/ _| ___ _ __ ");
        console.log("\\___ \\| '_ \\| | __\\___ \\| '_ \\| | |_| |_ / _ \\ '__|");
        console.log(" ___) | | | | | |_ ___) | | | | |  _|  _|  __/ |   ");
        console.log("|____/|_| |_|_|\\__|____/|_| |_|_|_| |_|  \\___|_|   v0.0.1");
        console.log(" ")
        new Scanner(this.tokenManager)
    }
}

module.exports = ShitCoin