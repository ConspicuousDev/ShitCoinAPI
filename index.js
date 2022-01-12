const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const cors = require("cors")
const app = express()

const ShitCoin = require("./backend/ShitCoin")
const routes = require("./api/routes")
const { sleep } = require("./backend/utils")

let shitCoin = new ShitCoin()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 8888
app.listen(PORT, async () => {
    console.log(`Server listening at http://localhost:${PORT}.`)
    await shitCoin.start()
    let endpoints = routes(shitCoin)
    for(let i = 0; i < endpoints.length; i++){
        let endpoint = endpoints[i]
        app.get(endpoint.route, async (req, res) => {
            let json
            try{
                json = await endpoint.request(req, res)
                json.success = true
            }catch(e){
                json = {
                    success: false,
                    message: e.message
                }
            }
            res.json(json)
        })
    }
})

module.exports = shitCoin