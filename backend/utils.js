function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getURL(req){
    let host = req.get("host")
    if(host.includes("localhost")){
        return "localhost"
    }
    return "omniscient.phild.education"
}

module.exports = { sleep, getURL }