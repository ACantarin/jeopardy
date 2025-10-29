const database = require('../models')

class PlayerService {
    async getOrCreate(dto) {
        try {
            const player = await database.players.findOne({
                where: { email: dto.email }
            })

            if (player) {
                return player
            }

            const newPlayer = await database.players.create({ email: dto.email })
            return newPlayer
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = PlayerService