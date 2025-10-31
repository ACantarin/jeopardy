const database = require('../models')
class ChoiceService {

    async create(dto, transaction) {
        try {
            const choices = dto.choices.map(choice => ({
                question_id: dto.question_id,
                description: choice.description,
                correct: choice.correct
            }))

            if (choices.length != 4) {
                throw new Error(
                    choices.length > 4 ? 'Deve haver apenas 4 opções!' : 'Deve haver pelo menos 4 opções!'
                )
            }

            const correctCount = choices.filter(choice => choice.correct === true).length;

            if (correctCount !== 1) {
                throw new Error(
                    correctCount > 1 ? 'Deve haver apenas uma alternativa correta!' : 'Deve haver pelo menos uma alternativa correta!'
                );
            }

            const duplicatedChoices = choices.filter((choice, index) => choices.findIndex(c => c.description === choice.description) !== index)

            if (duplicatedChoices.length > 0) {
                throw new Error('Existem alternativas duplicadas!')
            }

            await database.choices.bulkCreate(choices, { validate: true, transaction })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = ChoiceService