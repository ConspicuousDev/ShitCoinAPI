function removeComments(contract){
    let lines = contract.split("\r\n")
    let newLines = []
    for(let i = 0; i < lines.length; i++){
        let line = lines[i].trim()
        if(line.length === 0){
            continue
        }
        line = line.replace(/\/\/.*/, "")
        newLines.push(line)

    }
    return newLines.join("\n")
}

module.exports = { removeComments }