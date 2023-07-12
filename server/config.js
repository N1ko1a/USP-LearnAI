let config={
    port: 8000,
    // dbConnection: "mongodb://127.0.0.1:27017/GPTDB"
    // morali smo da stavimo umesto vog ip mongo da bih docker-compose radio
    dbConnection: "mongodb://mongo:27017/GPTDB"
}

module.exports = config