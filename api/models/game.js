'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    	Game.belongsTo(models.Player, {
			foreignKey: {
				name: 'player_id',
				allowNull: false
			}
		});

		Game.belongsTo(models.Question, {
			foreignKey: {
				name: 'question_id',
				allowNull: false
			}
		});
    }
  }
  Game.init({
    player_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    skips: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};