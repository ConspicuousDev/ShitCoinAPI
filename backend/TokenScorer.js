class TokenScorer{
    constructor(tokenManager){
        this.tokenManager = tokenManager
        this.tokens = tokenManager.tokens
        console.log(" > TokenScorer initialized.")
    }
    

}

module.exports = TokenScorer