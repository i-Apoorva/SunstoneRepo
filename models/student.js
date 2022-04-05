'use strict';
import Sequelize, { Model } from 'sequelize';
export default (sequelize) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Subject, {
        as: 'subjects',
        through: models.studentSubject,
        foreignKey: {
          name: 'student_id',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
      
    }
  }
  Student.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    picture: {
      type: Sequelize.BLOB("long"),
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};