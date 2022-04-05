'use strict';
import Sequelize, { Model } from 'sequelize';
export default (sequelize) => {
  class studentSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentSubject.init({
    studentId: {
      type:Sequelize.INTEGER,
      field: 'student_id',
    },
    subjectId: {
      type:Sequelize.INTEGER,
      field: 'subject_id',
    }
  }, {
    sequelize,
    modelName: 'studentSubject',
  });
  return studentSubject;
};