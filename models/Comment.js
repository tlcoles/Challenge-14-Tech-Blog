const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}
  
// set up fields and rules for Comment model
Comment.init(
  // Define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commenter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
        unique: false,
      },
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
  