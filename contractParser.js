function removeComments(contract){
    let lines = contract.split("\r\n")
    let newLines = []
    for(let i = 0; i < lines.length; i++){
        let line = lines[i].trim()
        line = line.replace(/\/\/.*/, "")

        if(line.length === 0){
            continue
        }
        newLines.push(line)

    }
    return newLines.join("\n")
}

module.exports = { removeComments }