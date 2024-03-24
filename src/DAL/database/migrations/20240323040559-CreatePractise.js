'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('practises', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      },
      paragraph: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('practises');
  }
};
