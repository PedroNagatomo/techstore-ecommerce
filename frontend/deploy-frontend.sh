#!/bin/bash
echo "🚀 Deploying Frontend to EC2..."

# Build da aplicação
npm run build

# Mover build para Nginx
sudo cp -r dist/* /var/www/html/

echo "✅ Frontend deployed successfully!"