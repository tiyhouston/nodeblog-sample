'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    articleId: DataTypes.INTEGER,
    commentor: DataTypes.STRING,
    text: DataTypes.TEXT
  });

  // define an associate method that has access to all `models`
  Comment.associate = function(models){
    Comment.belongsTo(models.Article, {foreignKey: 'articleId'})
  }
  return Comment;
};
