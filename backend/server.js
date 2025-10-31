const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar rotas
const productRoutes = require('./routes/products');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/products', productRoutes);

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend conectado com sucesso!',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 TechStore API está funcionando!',
    endpoints: {
      products: '/api/products',
      test: '/api/test'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎯 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`🛍️  Endpoint de produtos: http://localhost:${PORT}/api/products`);
});