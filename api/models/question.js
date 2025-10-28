'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Question extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Question.hasMany(models.Game, {
				foreignKey: 'question_id',
				as: 'games',
			});

			Question.hasMany(models.Choice, {
				foreignKey: 'question_id',
				as: 'choices',
			});
		}
	}
	Question.init({
		description: DataTypes.STRING,
		level: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Question',
	});
	return Question;
};