const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchemna = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field:'create_at',
    defaultValue: Sequelize.NOW
  }
};

//EXTENDS MODEL - SEQUALIZE
class User extends Model{

  static associate() {

  }

  static config (sequelize){
    return {
      sequelize,
      tableName : USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {USER_TABLE , UserSchemna, User}
