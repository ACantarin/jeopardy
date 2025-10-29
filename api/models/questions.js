'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class questions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			questions.hasMany(models.games, {
				foreignKey: 'question_id',
				as: 'games',
			});

			questions.hasMany(models.choices, {
				foreignKey: 'question_id',
				as: 'choices',
			});
		}
	}
	questions.init({
		description: DataTypes.STRING,
		level: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'questions',
	});
	return questions;
};