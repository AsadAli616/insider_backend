const express = require('express')
const app = express()

app.use(express.json());

app.use("/api/v1/e_comerce",require("./router/router"))





app.get('/', function (req, res) {
  res.send('Hello asad')
})


app.listen(3000)