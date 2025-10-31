const ChoiceService = require('./ChoiceService')
const createChoicesDTO = require('../dto/createChoicesDTO')
const database = require('../models')

const choiceService = new ChoiceService()

class QuestionService {

    async create(dto) {
        const transaction = await database.sequelize.transaction();

        try {
            const duplicatedQuestion = await database.questions.findOne({
                where: { description: dto.description }
            })

            if (duplicatedQuestion) {
                throw new Error('Pergunta já cadastrada!')
            }

            const question = await database.questions.create(dto, { transaction })

            const choicesDTO = createChoicesDTO(question.id, dto.choices)
            await choiceService.create(choicesDTO, transaction)

            return question
        } catch (error) {
            await transaction.rollback();
            throw (error)
        }
    }

    async getQuestions() {
        try {
            const questions = await database.questions.findAll()
            return questions
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = QuestionService