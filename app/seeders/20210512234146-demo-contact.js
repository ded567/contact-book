'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Contacts', [{
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Josh',
      lastName: 'Parker',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Anna',
      lastName: 'Jonnes',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Sasha',
      lastName: 'Stone',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Samanta',
      lastName: 'Black',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Contacts', null, {});

  }
};
