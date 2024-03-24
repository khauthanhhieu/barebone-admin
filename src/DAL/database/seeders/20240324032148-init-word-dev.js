'use strict';

const words = [
  {
    id: 1,
    word: "manager",
    type: "noun [countable]",
    wordFamily: "(noun) management manager manageability manageress (adjective) manageable ≠ unmanageable managerial (verb) manage",

    definition: "someone whose job is to manage part or all of a company or other organization",
    example: "She’s now assistant marketing manager for the southeast area.;one of our regional managers;the general manager of Chevrolet;a middle manager in a computer company  (=someone who manages a small part of a company)",
    synonyms: null,
    antonyms: null,

    definition2: "someone who is in charge of training and organizing a sports team",
    example2: "the new England manager;the manager of Lazio",
    synonyms2: null,
    antonyms2: null,

    definition3: "someone who is in charge of the business affairs of a singer, an actor etc",
    example3: null,
    synonyms3: null,
    antonyms3: null,

    createdAt: "2024-03-24 10:28:49",
    updatedAt: "2024-03-24 10:28:49"
  },
  {
    id: 2,
    word: "have",
    type: "auxiliary verb",
    wordFamily: null,

    definition: "used with past participles to form perfect tenses",
    example: "Our guests have arrived.;Has anyone phoned?;We’ve been spending too much money.;I hadn’t seen him for 15 years.;‘I hope you’ve read the instructions.’ ‘Yes, of course I have.’;You haven’t done much, have you?",
    synonyms: null,
    antonyms: null,

    definition2: null,
    example2: null,
    synonyms2: null,
    antonyms2: null,

    definition3: null,
    example3: null,
    synonyms3: null,
    antonyms3: null,

    createdAt: "2024-03-24 10:28:49",
    updatedAt: "2024-03-24 10:28:49"
  },
  {
    id: 3,
    word: "member",
    type: "noun [countable]",
    wordFamily: null,

    definition: "a person or country that belongs to a group or organization",
    example: "The majority of union members voted in favour of a strike.;You can also invite members of your family.;He is a member of the local tennis club.",
    synonyms: null,
    antonyms: null,

    definition2: "one of a particular group of animals or plants",
    example2: "The plant is a member of the lily family.;Wolves and domestic dogs are members of the same species.",
    synonyms2: null,
    antonyms2: null,

    definition3: "a Member of Parliament",
    example3: "the member for Truro",
    synonyms3: null,
    antonyms3: null,

    createdAt: "2024-03-24 10:28:49",
    updatedAt: "2024-03-24 10:28:49"
  },
  {
    id: 4,
    word: "have",
    type: "verb [transitive]",
    wordFamily: null,

    definition: " used to say what someone or something looks like, what qualities or features they possess etc",
    example: "She has dark hair and brown eyes.;Sullivan’s music does have a certain charm.;You need to have a lot of patience to be a teacher.;Wild rice has a very nutty flavour.;He didn’t even have the courtesy to answer my letter.;You should have seen the way Dad was dancing – I didn’t know he had it in him!",
    synonyms: null,
    antonyms: null,

    definition2: "to include or contain something or a particular number of things or people",
    example2: "Japan has a population of over 120 million.;How many pages has it got?;The tank still has water in it.",
    synonyms2: null,
    antonyms2: null,

    definition3: "used to say that someone owns something or that it is available for them to use",
    example3: "They used to have a Mercedes Benz.;Has your secretary got a fax machine?;Have you ever had your own business?;He’s a lovely dog – how long have you had him?;Can I have the car tonight, Dad?",
    synonyms3: null,
    antonyms3: null,

    createdAt: "2024-03-24 10:28:49",
    updatedAt: "2024-03-24 10:28:49"
  },
  {
    id: 5,
    word: "basis",
    type: "noun [countable]",
    wordFamily: "(noun) base the basics basis (adjective) baseless basic based (verb) base (adverb) basically",

    definition: "[countable] the facts, ideas, or things from which something can be developed",
    example: "Their claim had no basis in fact  (=it was not true).;Bread forms the basis of their daily diet.;The video will provide a basis for class discussion.",
    synonyms: null,
    antonyms: null,

    definition2: "[singular] the way that something happens, or the way that something is organized or done",
    example2: "I’m saving money on a regular basis.;Board meetings are held on a weekly basis.;Nurses are employed on a full-time basis.",
    synonyms2: null,
    antonyms2: null,

    definition3: null,
    example3: null,
    synonyms3: null,
    antonyms3: null,

    createdAt: "2024-03-24 17:28:49",
    updatedAt: "2024-03-24 17:28:49"
  }
];

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

    for (const word of words) {
      await queryInterface.bulkInsert('words', [{
        id: word.id,
        
        word: word.word,
        type: word.type,
  
        wordfamily: word.wordFamily,

        createdAt: word.createdAt,
        updatedAt: word.updatedAt
      }], {});
  
      if (word.definition || word.example || word.synonyms || word.antonyms) {
        await queryInterface.bulkInsert("wordDetails", [
          {
            wordId: word.id,
            order: 1,
      
            definition: word.definition,
            example: word.example,
            synonyms: word.synonyms,
            antonyms: word.antonyms
          }
        ]);
      }

      if (word.definition2 || word.example2 || word.synonyms2 || word.antonyms2) {
        await queryInterface.bulkInsert("wordDetails", [
          {
            wordId: word.id,
            order: 2,
      
            definition: word.definition2,
            example: word.example2,
            synonyms: word.synonyms2,
            antonyms: word.antonyms2
          }
        ]);
      }

      if (word.definition3 || word.example3 || word.synonyms3 || word.antonyms3) {
        await queryInterface.bulkInsert("wordDetails", [
          {
            wordId: word.id,
            order: 2,
      
            definition: word.definition3,
            example: word.example3,
            synonyms: word.synonyms3,
            antonyms: word.antonyms3
          }
        ]);
      }
    }
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
