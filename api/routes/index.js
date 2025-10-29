const bodyParser = require('body-parser')

const game = require('./gameRoutes')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        game
    )
}