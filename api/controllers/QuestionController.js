const QuestionService = require('../services/QuestionService')

const questionService = new QuestionService()

class QuestionController {
    static async create(req, res) {
        const { description, level, choices } = req.body || {}

        try {
            const question = await questionService.create({ description, level, choices })
            return res.status(200).json(question)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = QuestionController