'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class players extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			players.hasMany(models.games, {
				foreignKey: 'player_id',
				as: 'player_id',
			});
		}
	}
	players.init({
		email: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'players',
	});
	return players;
};