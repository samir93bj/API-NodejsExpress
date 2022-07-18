const boom = require('@hapi/boom');
const Pool = require('../libs/postgres.pool');

class usersService {

  constructor(){

    this.pool = Pool;
    this.pool.on('error', (err) => console.error(err))

  }


  //GET USER
  async find(){
    const query = 'SELECT * FROM tasks';
    const users = await this.pool.query(query);

    return users.rows;
  }

  //GET USER
  async findOne(id){

    return id;
  }

  //CREATE USER
  async create(data){

    return data;

  }

  //UPDATE USER
  async update(id, data){

      return id, data;
  }

  //DELETE USER
  async delete(id){

    return  id ;
  }
}

module.exports = usersService;
