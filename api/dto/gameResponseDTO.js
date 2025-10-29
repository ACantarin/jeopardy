module.exports = function gameToDTO(game, question, choices) {
    return {
        id: game.id,
        player_id: game.player_id,
        level: game.level,
        skips: game.skips,
        question: {
            id: question.id,
            description: question.description,
            choices: choices.map(choice => ({
                id: choice.id,
                description: choice.description
            }))
        }
    }
}