'use strict';

const {UserSchemna , USER_TABLE} = require('./../models/user.model');

module.exports = {

  up:  async (queryInterface) => {
      await queryInterface.createTable(USER_TABLE, UserSchemna);

      const hash = await bcrypt.hash('123456', 10);
      await queryInterface.bulkInsert(USER_TABLE, [
        {
          username: 'admin',
          email: 'admin@domain.com',
          password: hash,
          role: 'admin',
          created_at: new Date()
        }
      ]);
  },

  down: async  (queryInterface)=> {
    await queryInterface.dropTable(USER_TABLE);
  }

};
