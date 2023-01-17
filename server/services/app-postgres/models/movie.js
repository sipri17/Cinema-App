'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Movie.belongsTo(models.User, {
      //   foreignKey: 'authorId'
      // })
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId'
      })
      Movie.hasMany(models.Cast,{
        foreignKey: 'movieId'
      })
    }
  }
  Movie.init({
    title: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: {msg: 'Title required'},
        notEmpty: {msg: 'Title required'}
        
      }         
    },
    slug: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: {msg: 'Slug required'},
        notEmpty: {msg: 'Slug required'}
        
      }         
    },
    synopsis: {
      type :DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull: {msg: 'Synopsis required'},
        notEmpty: {msg: 'Synopsis required'}
      }         
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type : DataTypes.INTEGER,
      validate : {        
        checkRating(value){
          if((value) && value<1){
            throw new Error('Minimum rating is 1')
          }
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    mongoId:  DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',  
  })
  ;

  Movie.beforeCreate((instance,options)=>{
    console.log('test');
    instance.slug = instance.title.toLowerCase().split(' ').join('-')
  })

  return Movie;

};