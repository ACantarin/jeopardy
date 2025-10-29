'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class choices extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			choices.belongsTo(models.questions, {
				foreignKey: {
					name: 'question_id',
					allowNull: false
				}
			});
		}
	}
	choices.init({
		question_id: DataTypes.INTEGER,
		description: DataTypes.STRING,
		correct: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'choices',
	});
	return choices;
};