'use strict';
let data = require('../data/movie.json')
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
      data = data.map(el=>{
        el.slug = el.title.toLowerCase().split(' ').join('-')
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el
    })
     await queryInterface.bulkInsert('Movies', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Movies')
  }
};
