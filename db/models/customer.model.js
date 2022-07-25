const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  lastName:{
    allowNull: false,
    field:'last_name',
    type: DataTypes.STRING,
    unique: false
  },
  phone:{
    allowNull:true,
    type:DataTypes.STRING,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field:'create_at',
    defaultValue: Sequelize.NOW
  },
  userId:{
    field:'user_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    unique:true,
    references:{
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

//EXTENDS MODEL - SEQUALIZE
class Customer extends Model{

  static associate(models) {
    this.belongsTo(models.User, {as: 'user', foreignKey:'userId'});
    this.hasMany(models.Order, {as: 'orders', foreignKey:'customerId'});
  }

  static config (sequelize){
    return {
      sequelize,
      tableName : CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = {CUSTOMER_TABLE , CustomerSchema, Customer}
