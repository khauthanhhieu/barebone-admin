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

    await queryInterface.bulkInsert('users', [{
      id: 1,
      username: "google-102464023570106025420",
      email: "khauthanhhieu02@gmail.com",
      name: "Hieu Khau",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocLyVYSySDKNJlBauzAzg-I3zFFVk0gE1N-aj9pOKrhk=s96-c",
      isAdmin: true,
      createdAt: "2024-03-23 04:49:49",
      updatedAt: "2024-03-23 04:49:49"
    }], {});
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
