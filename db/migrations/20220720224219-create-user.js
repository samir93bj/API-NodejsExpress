'use strict';

const {UserSchemna , USER_TABLE} = require('./../models/user.model');

module.exports = {

  up:  async (queryInterface) => {
      await queryInterface.createTable(USER_TABLE, UserSchemna);
  },

  down: async  (queryInterface)=> {
    await queryInterface.dropTable(USER_TABLE);
  }

};
