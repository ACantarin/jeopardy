module.exports = function gameLostDTO(game, choice) {
    return {
        id: game.id,
        player_id: game.player_id,
        message: "Resposta errada",
        right_choice: {
            id: choice.id,
            description: choice.description
        }
    };
};