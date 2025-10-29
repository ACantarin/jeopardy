'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class games extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			games.belongsTo(models.players, {
				foreignKey: {
					name: 'player_id',
					foreignKey: 'player_id'
				}
			});

			games.belongsTo(models.questions, {
				foreignKey: {
					name: 'question_id',
					foreignKey: 'question_id'
				}
			});
		}
	}
	games.init({
		player_id: DataTypes.INTEGER,
		question_id: DataTypes.INTEGER,
		level: DataTypes.INTEGER,
		skips: DataTypes.INTEGER,
		status: DataTypes.ENUM('S', 'W', 'L', 'F')
	}, {
		sequelize,
		modelName: 'games',
	});
	return games;
};