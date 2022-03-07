const { sleep } = require("./utils");


class TokenScorer {
    constructor(tokenManager) {
        this.tokenManager = tokenManager
        console.log(" > TokenScorer initialized.")
        this.scrape()
    }

    async scrape() {
        let scoring = []
        while (true) {
            let tokens = await this.tokenManager.getTokens({ score: null, address: { $nin: scoring } })
            if (tokens.length === 0) {
                await sleep(10000)
                continue
            }
            console.log(" ")
            console.log(`[TokenScorer] ${tokens.length} Token(s) added to the scoring queue.`)
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                scoring.push(token.address)
                let value = await this.score(token)
                let score = { value: value, time: Date.now() }
                await this.tokenManager.updateToken(token.address, { score: score })
                console.log(`[TokenScorer] Token '${token.address}' has been assigned a score of ${score.value}.`)
                scoring = scoring.filter((item, index, array) => { return item !== token.address })
            }
            console.log(" ")
        }
    }

    async score(token) {
        if (token.contract === null) return 0
        return 1
    }
}

module.exports = TokenScorer