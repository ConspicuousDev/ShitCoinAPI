const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const cors = require("cors")
const routes = require("./routes")
const shitCoin = require("./shitCoin")
const app = express()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

let endpoints = routes.routes
for(let i = 0; i < endpoints.length; i++){
    let endpoint = endpoints[i]
    app.get(endpoint.route, (req, res) => {endpoint.request(req, res)})
}

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

shitCoin.main()