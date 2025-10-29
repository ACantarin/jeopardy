const { Router } = require('express')
const GameController = require('../controllers/GameController')

const router = Router()

router
    .post('/game/play', GameController.play)
    .post('/game/answer', GameController.answer)
    .post('/game/skip', GameController.skip)

module.exports = router