'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Player extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Player.hasMany(models.Game, {
				foreignKey: 'player_id',
				as: 'games',
			});
		}
	}
	Player.init({
		email: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Player',
	});
	return Player;
};