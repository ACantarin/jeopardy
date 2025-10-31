const Router = require('express')
const QuestionController = require('../controllers/QuestionController')

const router = Router()

router
    .post('/question', QuestionController.create)

module.exports = router