'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const DataTypes = Sequelize.DataTypes;

    await queryInterface.createTable('practiseWords', {
      practiseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: { model: "practises", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      wordId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: { model: "words", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      order: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
