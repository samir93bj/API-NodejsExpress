const { Model, DataTypes, Sequelize } = require('sequelize')
const { PRODUCT_TABLE } = require('../models/product.model')

const CART_TABLE = 'carts'

const cartSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Cart extends Model {
  static associate (models) {
    this.hasMany(models.Product, { as: 'product', foreignKey: 'productId' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CART_TABLE,
      modelName: 'Cart',
      timestamps: false
    }
  }
}

module.exports = { CART_TABLE, cartSchema, Cart }
