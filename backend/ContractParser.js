class ContractParser{
    constructor(name, sourceCode){
        this.name = name
        this.sourceCode = sourceCode
    }
    parse(){
        let lines = this.sourceCode.split("\r\n")
        let newLines = []
        let inComment = false
        for(let i = 0; i < lines.length; i++){
            let line = lines[i]
            if(inComment){
                let lineCopy = line.replace(/.*\*\//, "")
                if(line !== lineCopy){
                    inComment = false
                }
                line = line.replace(/.*\*\//, "")
            }
            if(!inComment){
                line = line.replace(/\/\/.*/, "")
                line = line.replace(/\/\*.*\*\//, "")
                let lineCopy = line.replace(/\/\*.*/, "")
                if(line !== lineCopy){
                    inComment = true
                }
                line = line.replace(/\/\*.*/, "")
                if(line.trim().length === 0){
                    continue
                }
                if(line.includes("contract " + this.name)){
                    line += "function checkOwnership() public view onlyOwner returns (bool) { return true; }"
                }
                newLines.push(line)
            }
        }
        return newLines.join("")
    }
}

module.exports = ContractParser