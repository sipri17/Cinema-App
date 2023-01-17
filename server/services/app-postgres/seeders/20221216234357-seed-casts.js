'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let data = [
      {
        "movieId": 1,
        "name": "Robert Downey Jr",
        "profilePict": "https://ksassets.timeincuk.net/wp/uploads/sites/55/2019/05/GettyImages-1144499197.jpg",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        "movieId": 1,
        "name": "Scarlet Johansson",
        "profilePict": "https://wavyhaircut.com/wp-content/uploads/2019/09/scarlett-johansson-has-tried-just-about-every-hairstyle-in-throughout-scarlett-johansson-best-hair.jpg",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        "movieId": 3,
        "name": "Scarlet Johansson",
        "profilePict": "https://i.pinimg.com/originals/5d/9a/29/5d9a298645af5123a1769444ec9f42f1.jpg",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]


    await queryInterface.bulkInsert('Casts', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
