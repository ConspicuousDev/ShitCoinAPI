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

app.get("/", (req, res) => {
    res.json({})
})

app.get("/api/:endpoint", (req, res) => {
    let data = shitCoin.getData()
    let response = {success: data.hasOwnProperty(req.params.endpoint)}
    if(response.success){
        response[req.params.endpoint] = data[req.params.endpoint]
    }else{
        response.error = "Endpoint not found."
    }
    res.json(response)
})

app.get("/api/token/:token", (req, res) => {
    res.json({})
})

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
    //console.log(`Server listening at http://localhost:${PORT}`)
})

shitCoin.main()
