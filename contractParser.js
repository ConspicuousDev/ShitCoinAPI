function parseContract(contract){
    let lines = contract.split("\r\n")
    let newLines = []
    let inComment = false
    for(let i = 0; i < lines.length; i++){
        let line = lines[i].trim()
        if(inComment){
            lineCopy = line.replace(/.*\*\//, "")
            if(line !== lineCopy){
                inComment = false
            }
            line = line.replace(/.*\*\//, "")
        }
        if(!inComment){
            line = line.replace(/\/\/.*/, "")
            line = line.replace(/\/\*.*\*\//, "")
            lineCopy = line.replace(/\/\*.*/, "")
            if(line !== lineCopy){
                inComment = true
            }
            line = line.replace(/\/\*.*/, "")
            if(line.trim().length === 0){
                continue
            }
            //line.replace(/\\\"/, "'") //dps precisa tentar esse daq
            //line.replace(/\\"/, "'")
            line.replace('\\"', "'") //ja tentou assim yes mas tenta dnv ok remove os outros ou sla se preicisa
            newLines.push(line)
        }
    }
    return newLines.join("")
}

module.exports = { parseContract }