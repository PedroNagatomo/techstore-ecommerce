const { Sequelize } = require('sequelize');
require('dotenv').config();

// Para desenvolvimento - SQLite (mais fácil)
// Para produção - PostgreSQL (RDS)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Testar conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
  }
};

testConnection();

module.exports = sequelize;