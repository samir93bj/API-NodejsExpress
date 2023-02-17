'use strict'

const { ORDER_TABLE } = require('../models/order.model')
const { CUSTOMER_TABLE } = require('../models/customer.model')
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE)
  }
}
