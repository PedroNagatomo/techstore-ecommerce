#!/bin/bash
echo "🚀 Preparando backend para deploy..."

# Criar package.json de produção
cat > package.json << 'EOF'
{
  "name": "techstore-backend",
  "version": "1.0.0",
  "description": "Backend para TechStore E-commerce",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5",
    "pg": "^8.11.3",
    "sequelize": "^6.33.0",
    "sqlite3": "^5.1.6"
  }
}
EOF

# Criar .env de produção
cat > .env << 'EOF'
NODE_ENV=production
PORT=5000
JWT_SECRET=techstore_production_secret_2024
DB_STORAGE=/var/www/techstore/backend/database.sqlite
EOF

echo "✅ Backend preparado para deploy!"