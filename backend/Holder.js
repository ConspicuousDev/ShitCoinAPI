class Holder{
    constructor(quantity, averagePrice, totalInvested, positionValue, transactions){
        this.quantity = quantity;
        this.averagePrice = averagePrice;
        this.totalInvested = totalInvested;
        this.positionValue = positionValue;
        this.transactions = transactions;
    }  
}

module.exports = Holder