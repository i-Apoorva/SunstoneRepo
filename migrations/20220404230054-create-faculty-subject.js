'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facultySubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facultyId: {
        type: Sequelize.INTEGER,
        field: 'faculty_id',
      },
      subjectId: {
        type: Sequelize.INTEGER,
        field: 'subject_id',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('facultySubjects');
  }
};