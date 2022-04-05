'use strict';
import Sequelize, { Model } from 'sequelize';
export default (sequelize) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsToMany(models.Faculty, {
        as: 'faculty',
        through: models.facultySubject,
        foreignKey: {
          name: 'subject_id',
          allowNull: false,
        },
      });
      Subject.belongsToMany(models.Student, {
        as: 'students',
        through: models.studentSubject,
        foreignKey: {
          name: 'subject_id',
          allowNull: false,
        },
      });
    }
  }
  Subject.init({
    name: {
      type:Sequelize.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};