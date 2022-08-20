const {UserSchemna , USER_TABLE} = require('./../models/user.model');
const  Bcrypt  = require('bcrypt');

module.exports = {

  up:  async (queryInterface) => {
      await queryInterface.createTable(USER_TABLE, UserSchemna);

      const hash = await Bcrypt.hash('adminadmin', 10);
      await queryInterface.bulkInsert(USER_TABLE, [
        {
          email: 'admin@domain.com',
          password: hash,
          created_at: new Date(),
          role: 'admin',
        }
      ]);
  },

  down: async  (queryInterface)=> {
    await queryInterface.dropTable(USER_TABLE);
  }

};
