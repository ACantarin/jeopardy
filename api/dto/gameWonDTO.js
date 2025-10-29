module.exports = function gameWonDTO(game) {
    return {
        id: game.id,
        player_id: game.player_id,
        message: "Parabéns! Você venceu!",
    }
}