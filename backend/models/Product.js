const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  features: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;