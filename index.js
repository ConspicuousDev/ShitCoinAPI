const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const cors = require("cors")
const shitCoin = require("./shitCoin")
const app = express()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

let routes = [
    {
        route: "*",
        request(req, res){
            res.json({
                message: "Endpoint not found.",
                success: false
            })
        }
    },
    {
        route: "/",
        request(req, res) {
            res.json({
                message: "Welcome to ShitCoin API.",
                success: true,
                version: "0.0.1"
            })
        }
    },
    {
        route: "/v1/tokens",
        request(req, res) {
            let data = shitCoin.getData()
            let response = {
                success: true,
                tokens: Object.values(data.tokens)
            }
            res.json(response)
        }
    },
    {
        route: "/v1/token/:token",
        request(req, res) {
            let data = shitCoin.getData()
            let response = {success: data.tokens.hasOwnProperty(req.params.token)}
            if(response.success){
                response.token = data.tokens[req.params.token]
            }else{
                response.message = "Token not found."
            }
            
            res.json(response)
        }
    }
]

for(let i = 0; i < routes.length; i++){
    let route = routes[i]
    app.get(route.route, (req, res) => {route.request(req, res)})
}

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

shitCoin.main()