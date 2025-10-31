module.exports = function createChoicesDTO(question_id, choices) {
    return {
        question_id: question_id,
        choices: choices.map(choice => ({
            description: choice.description,
            correct: choice.correct
        }))
    }
}