const GameService = require('../services/GameService')

const gameService = new GameService()

class GameController {
    static async play(req, res) {
        const { email } = req.body || {}

        try {
            const game = await gameService.play({ email: email })
            return res.status(200).json(game)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async answer(req, res) {
        const { game_id, player_id,choice_id } = req.body || {}    

        try {
            const game = await gameService.answer({ game_id: game_id, player_id, choice_id: choice_id })
            return res.status(200).json(game)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = GameController