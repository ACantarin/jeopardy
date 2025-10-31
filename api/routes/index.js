const bodyParser = require('body-parser')

const game = require('./gameRoutes')
const question = require('./questionRoutes')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        game,
        question
    )
}