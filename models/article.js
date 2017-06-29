'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {

    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter a title. OR ELSE'
        }
      }
    },
    text: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "To publish an article, you need to article!"
        },
      }
    },
    publishedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Article;
};
