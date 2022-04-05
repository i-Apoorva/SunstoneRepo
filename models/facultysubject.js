'use strict';
import Sequelize, { Model } from 'sequelize';
export default (sequelize) => {
  class facultySubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  facultySubject.init({
    facultyId: {
      type: Sequelize.INTEGER,
      field: 'faculty_id',
    },
    subjectId: {
      type: Sequelize.INTEGER,
      field: 'subject_id',
    },
  }, {
    sequelize,
    modelName: 'facultySubject',
  });
  return facultySubject;
};