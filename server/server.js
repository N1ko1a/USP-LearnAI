var cors = require('cors')
const express = require('express')
const app = express()
const config = require('./config')
app.use(cors())
var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)
const bookRoutes = require('../routes/books')
const authorRoutes = require('../routes/author')
const authRoutes = require('../routes/auth')

app.use(express.json())
app.use("/books",bookRoutes)
app.use("/author",authorRoutes)
app.use("/auth",authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World from GET!')
})


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})