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

    await queryInterface.bulkInsert('words', [{
      id: 1,
      practiseId: 1,
      
      order: 1,
      word: "manager",
      type: "noun [countable]",

      wordfamily: "(noun) management manager manageability manageress (adjective) manageable ≠ unmanageable managerial (verb) manage",

      createdAt: "2024-03-23 04:49:49",
      updatedAt: "2024-03-23 04:49:49"
    }], {});

    await queryInterface.bulkInsert('wordDetails', [
    {
      wordId: 1,
      order: 1,

      definition: "someone whose job is to manage part or all of a company or other organization",
      example: "She’s now assistant marketing manager for the southeast area.;one of our regional managers;the general manager of Chevrolet;a middle manager in a computer company (=someone who manages a small part of a company)",
      synonyms: null,
      antonyms: null
    },
    {
      wordId: 1,
      order: 2,

      definition: "someone who is in charge of training and organizing a sports team",
      example: "the new England manager;the manager of Lazio",
      synonyms: null,
      antonyms: null
    },
    {
      wordId: 1,
      order: 3,

      definition: "someone who is in charge of the business affairs of a singer, an actor etc",
      example: null,
      synonyms: null,
      antonyms: null
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
