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

    await queryInterface.createTable('words', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      practiseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "practises", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      word: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
      type: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },

      wordFamily: { type: DataTypes.TEXT, allowNull: true },

      createdAt: { type: DataTypes.DATE, allowNull: true },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('words');
  }
};
