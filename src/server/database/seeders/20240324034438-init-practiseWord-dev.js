'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('practiseWords', [
      {
        practiseId: 1,
        wordId: 1,
        order: 1
      },
      {
        practiseId: 1,
        wordId: 2,
        order: 3
      },
      {
        practiseId: 1,
        wordId: 3,
        order: 2
      },
      {
        practiseId: 2,
        wordId: 3,
        order: 2
      },
      {
        practiseId: 2,
        wordId: 2,
        order: 3
      },
      {
        practiseId: 2,
        wordId: 5,
        order: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
