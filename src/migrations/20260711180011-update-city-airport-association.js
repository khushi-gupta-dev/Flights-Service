'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports' , {    
      type: 'FOREIGN KEY',
      name:"city_fk_constraint",            // name of constraint we give
fields: ['cityId'],
references: {
table: 'Cities',
  field: 'id'
},
onDelete: 'CASCADE',
onUpdate: 'CASCADE'
}); 

  },      

      async down(queryInterface, Sequelize) {
    await sequelize.queryInterface.removeConstraint(
      "Airports",
      "city_fk_constraint"                  // name of constrain we give
      
     );
   
  }
};
