function removeComments(contract){
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
            line.replace(/\\"/, "'")
            newLines.push(line)
        }
    }
    return newLines.join("")
}

module.exports = { removeComments }