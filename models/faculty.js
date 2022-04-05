'use strict';
import Sequelize, { Model } from 'sequelize';
export default (sequelize) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Faculty.belongsToMany(models.Subject, {
        as: 'subjects',
        through: models.facultySubject,
        foreignKey: {
          name: 'faculty_id',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
    }
  }
  Faculty.init({
    name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
    picture: {
      type: Sequelize.BLOB("long"),
    }

  }, {
    sequelize,
    modelName: 'Faculty',
  });

  return Faculty;
};