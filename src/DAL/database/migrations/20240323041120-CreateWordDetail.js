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
    const DataTypes = Sequelize.DataTypes;

    await queryInterface.createTable('wordDetails', {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

      wordId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "words", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

      definition: { type: DataTypes.TEXT, allowNull: true },
      example: { type: DataTypes.TEXT, allowNull: true },
      synonyms: { type: DataTypes.TEXT, allowNull: true },
      antonyms: { type: DataTypes.TEXT, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('wordDetails');
  }
};
