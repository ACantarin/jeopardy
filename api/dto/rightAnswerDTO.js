module.exports = function rightAnswerDTO(game) {
    return {
        id: game.id,
        player_id: game.player_id,
        message: "Certa resposta!",
    }
}