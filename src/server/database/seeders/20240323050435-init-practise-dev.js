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

    await queryInterface.bulkInsert('practises', [{
      id: 1,
      title: "Individual Development Plans Examples for Managers – Crucial Goals to Include",
      paragraph: "Recent studies have shown that organizations with effective individual development plans (IDPs) for their managers experience a significant boost in productivity and employee engagement. According to a survey, 94% of employees in companies with well-structured IDPs reported higher job satisfaction and a more substantial commitment to their organization."
        + "Having structured and targeted examples of IDP goals for managers can be a game changer. It can help you with the positive outcomes for your teams and the organization."
        + "Let’s understand what IDP goals for managers are. We will also discuss individual development plan examples for managers that will help you implement and monitor tactics of managerial IDPs, and on how to overcome the challenges for the same.",
      createdAt: "2024-03-23 04:49:49",
      updatedAt: "2024-03-23 04:49:49"
    }], {});

    await queryInterface.bulkInsert('practises', [{
      id: 2,
      title: "Basis of Design",
      paragraph: "The Basis of Design (BOD) documents the principles, assumptions, rationale, criteria, and considerations used for calculations and decisions required during design. The BOD is developed by the Designer and builds upon the PC and OPR.",
      createdAt: "2024-03-24 16:49:49",
      updatedAt: "2024-03-24 16:49:49"
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
