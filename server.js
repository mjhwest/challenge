const express = require ('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000 

app.use(express.static('public'));

app.get("/", (req,res) => res.send ('Testing for challenge'));

app.listen(PORT, () => 
console.log(`App is ready to go at http://localhost:${PORT}`)
)