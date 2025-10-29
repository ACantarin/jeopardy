const database = require('../models')
const gameResponseDTO = require('../dto/gameResponseDTO')
const gameLostDTO = require('../dto/gameLostDTO')
const gameWonDTO = require('../dto/gameWonDTO')
const rightAnswerDTO = require('../dto/rightAnswerDTO')

const PlayerService = require('./PlayerService')
const playerService = new PlayerService()

const INITIAL_LEVEL = 1
const INICIAL_SKIPS = 3

const GAME_STATUS_STARTED = 'S'
const GAME_STATUS_WON = 'W'
const GAME_STATUS_LOST = 'L'
const GAME_STATUS_FINISHED = 'F'

class GameService {
    async play(dto) {
        try {
            if (!dto.email) {
                throw new Error('É necessário informar um e-mail para jogar')
            }

            const player = await playerService.getOrCreate(dto)

            var game = await this.getGameByPlayerId(player.id)

            if (!game) {
                game = await this.createGame(player.id)
            }

            const question = await database.questions.findOne({
                where: { id: game.question_id }
            })

            const choices = await database.choices.findAll({
                where: { question_id: question.id }
            })

            return gameResponseDTO(game, question, choices)
        } catch (error) {
            throw (error)
        }
    }

    async answer(dto) {
        try {
            const game = await database.games.findOne({
                where: {
                    id: dto.game_id,
                    player_id: dto.player_id,
                    status: GAME_STATUS_STARTED
                }
            })

            if (!game) {
                throw new Error('Jogo não encontrado ou inválido')
            }

            const rightChoice = await database.choices.findOne({
                where: {
                    question_id: game.question_id,
                    correct: true
                }
            })

            if (rightChoice.id !== dto.choice_id) {
                await this.updateStatusGame(game.id, GAME_STATUS_LOST)
                return gameLostDTO(game, rightChoice)
            }

            if (game.level === 10) {
                await this.updateStatusGame(game.id, GAME_STATUS_WON)
                return gameWonDTO(game)
            }

            await this.updateGameLevel(game.id)
            await this.updateGameQuestion(game.id)

            return rightAnswerDTO(game)
        } catch (error) {
            throw (error)
        }
    }

    async skip(dto) {
        try {
            const game = await database.games.findOne({
                where: {
                    id: dto.game_id,
                    status: GAME_STATUS_STARTED
                }
            })

            if (!game) {
                throw new Error('Jogo não encontrado ou inválido')
            }

            if (game.skips === 0) {
                throw new Error('Não há mais pulos disponíveis')
            }

            const skips = game.skips - 1
            await database.games.update({
                skips: skips
            }, {
                where: { id: game.id }
            })

            const question = await database.questions.findOne({
                where: {
                    level: game.level,
                    id: { [database.Sequelize.Op.ne]: game.question_id }
                },
                order: database.sequelize.random()
            });

            await this.updateQuestionGame(game.id, question.id)

            const updatedGame = await database.games.findOne({
                where: {
                    id: game.id
                }
            })

            const choices = await database.choices.findAll({
                where: { question_id: question.id }
            })

            return gameResponseDTO(updatedGame, question, choices)
        } catch (error) {
            throw (error)
        }
    }

    async getGameByPlayerId(playerId) {
        try {
            const game = await database.games.findOne({
                where: {
                    player_id: playerId,
                    status: GAME_STATUS_STARTED
                }
            })

            return game
        } catch (error) {
            throw (error)
        }
    }

    async createGame(playerId) {
        var game = await database.games.create({
            player_id: playerId,
            level: INITIAL_LEVEL,
            skips: INICIAL_SKIPS,
            status: GAME_STATUS_STARTED
        })

        const question = await database.questions.findOne({
            where: { level: game.level },
            order: database.sequelize.random()
        });

        await this.updateQuestionGame(game.id, question.id)

        return game
    }

    async updateQuestionGame(gameId, questionId) {
        try {
            const question = await database.questions.findOne({
                where: { id: questionId }
            })

            await database.games.update({
                question_id: question.id
            }, {
                where: { id: gameId }
            })
        } catch (error) {
            throw (error)
        }
    }

    async updateGameLevel(gameId) {
        try {
            const game = await database.games.findOne({
                where: {
                    id: gameId,
                    status: GAME_STATUS_STARTED
                }
            })

            if (!game) {
                throw new Error('Jogo não encontrado ou inválido!')
            }

            const level = game.level + 1

            await database.games.update({
                level: level
            }, {
                where: { id: gameId }
            })
        } catch (error) {
            throw (error)
        }
    }

    async updateGameQuestion(gameId) {
        try {
            const game = await database.games.findOne({
                where: {
                    id: gameId,
                    status: GAME_STATUS_STARTED
                }
            })

            if (!game) {
                throw new Error('Jogo não encontrado ou inválido!')
            }

            const question = await database.questions.findOne({
                where: { level: game.level },
                order: database.sequelize.random()
            });

            await database.games.update({
                question_id: question.id
            }, {
                where: { id: gameId }
            })
        } catch (error) {
            throw (error)
        }
    }

    async updateStatusGame(gameId, status) {
        try {
            const game = await database.games.findOne({
                where: {
                    id: gameId
                }
            })

            if (!game) {
                throw new Error('Jogo não encontrado ou inválido!')
            }

            if (game.status === status) {
                throw new Error('O status do jogo não pode ser atualizado')
            }

            await database.games.update({
                status: status
            }, {
                where: { id: game.id }
            })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = GameService