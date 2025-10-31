const sequelize = require('../config/database');
const Product = require('../models/Product');
const User = require('../models/User');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Tabelas criadas com sucesso.');

    const products = await Product.bulkCreate([
      {
        id: 1,
        name: "MacBook Pro 14\"",
        description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip, let's you build, render, and create like never before.",
        price: 1999.99,
        originalPrice: 2199.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600",
          "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=600"
        ],
        category: "Laptops",
        brand: "Apple",
        inStock: true,
        stockQuantity: 15,
        rating: 4.8,
        reviewCount: 124,
        features: [
          "Apple M2 Pro chip",
          "16-core GPU", 
          "16GB Unified Memory",
          "1TB SSD Storage",
          "Liquid Retina XDR display",
          "Up to 18 hours battery life"
        ],
        specifications: {
          "Display": "14.2-inch Liquid Retina XDR",
          "Processor": "Apple M2 Pro", 
          "Memory": "16GB",
          "Storage": "1TB SSD",
          "Graphics": "16-core GPU"
        }
      },
      {
        id: 2,
        name: "iPhone 15 Pro",
        description: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
        price: 999.99,
        originalPrice: 1099.99,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
        images: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600"
        ],
        category: "Phones", 
        brand: "Apple",
        inStock: true,
        stockQuantity: 30,
        rating: 4.9,
        reviewCount: 89,
        features: [
          "Titanium design",
          "A17 Pro chip",
          "Pro camera system", 
          "5G capable",
          "Face ID"
        ],
        specifications: {
          "Display": "6.1-inch Super Retina XDR",
          "Processor": "A17 Pro",
          "Storage": "128GB",
          "Camera": "48MP Main"
        }
      },
      {
        id: 3,
        name: "Sony WH-1000XM4",
        description: "Industry-leading noise canceling with Dual Noise Sensor technology.",
        price: 349.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600"
        ],
        category: "Audio",
        brand: "Sony",
        inStock: true,
        stockQuantity: 25,
        rating: 4.7,
        reviewCount: 203,
        features: [
          "Industry-leading noise cancellation",
          "30-hour battery life",
          "Touch control",
          "Quick charge",
          "Voice assistant"
        ],
        specifications: {
          "Battery Life": "30 hours",
          "Charging": "USB-C",
          "Weight": "254g",
          "Connectivity": "Bluetooth 5.0"
        }
      },
      {
        id: 4,
        name: "iPad Air",
        description: "Powerful. Colorful. Wonderful. With the M1 chip and all-day battery life.",
        price: 599.99,
        originalPrice: 649.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600",
        images: [
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600",
          "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600"
        ],
        category: "Tablets",
        brand: "Apple",
        inStock: true,
        stockQuantity: 20,
        rating: 4.6,
        reviewCount: 67,
        features: [
          "M1 chip",
          "10.9-inch Liquid Retina display",
          "5G capable",
          "Apple Pencil support",
          "All-day battery life"
        ],
        specifications: {
          "Display": "10.9-inch Liquid Retina",
          "Processor": "Apple M1",
          "Storage": "64GB",
          "Camera": "12MP Ultra Wide front"
        }
      },
      {
        id: 5,
        name: "Samsung Galaxy S23",
        description: "The ultimate smartphone experience with pro-grade camera and powerful performance.",
        price: 849.99,
        originalPrice: 899.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
        ],
        category: "Phones",
        brand: "Samsung",
        inStock: true,
        stockQuantity: 18,
        rating: 4.5,
        reviewCount: 156,
        features: [
          "Pro-grade camera",
          "Snapdragon 8 Gen 2",
          "Enhanced nightography",
          "5G ready",
          "Fast charging"
        ],
        specifications: {
          "Display": "6.1-inch Dynamic AMOLED",
          "Processor": "Snapdragon 8 Gen 2",
          "Storage": "128GB",
          "Camera": "50MP Main"
        }
      },
      {
        id: 6,
        name: "Dell XPS 13",
        description: "The perfect balance of power and portability with stunning InfinityEdge display.",
        price: 1299.99,
        originalPrice: 1399.99,
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600",
        images: [
          "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600"
        ],
        category: "Laptops",
        brand: "Dell",
        inStock: true,
        stockQuantity: 12,
        rating: 4.4,
        reviewCount: 98,
        features: [
          "13.4-inch InfinityEdge display",
          "11th Gen Intel Core processor",
          "16GB RAM",
          "512GB SSD",
          "Windows 11"
        ],
        specifications: {
          "Display": "13.4-inch FHD+",
          "Processor": "Intel Core i7",
          "Memory": "16GB RAM",
          "Storage": "512GB SSD"
        }
      },
      {
        id: 7,
        name: "Apple Watch Series 9",
        description: "The most powerful Apple Watch with new double-tap gesture and brighter display.",
        price: 399.99,
        originalPrice: 429.99,
        image: "https://images.unsplash.com/photo-1579586337278-3f436c8e939d?w=600",
        images: [
          "https://images.unsplash.com/photo-1579586337278-3f436c8e939d?w=600"
        ],
        category: "Wearables",
        brand: "Apple",
        inStock: true,
        stockQuantity: 35,
        rating: 4.8,
        reviewCount: 287,
        features: [
          "Double-tap gesture",
          "Brighter display",
          "S9 chip",
          "Heart rate monitoring",
          "GPS + Cellular"
        ],
        specifications: {
          "Display": "Always-On Retina",
          "Chip": "S9 SiP",
          "Battery": "18 hours",
          "Connectivity": "GPS + Cellular"
        }
      },
      {
        id: 8,
        name: "PlayStation 5",
        description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.",
        price: 499.99,
        originalPrice: 549.99,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600",
        images: [
          "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600"
        ],
        category: "Gaming",
        brand: "Sony",
        inStock: true,
        stockQuantity: 8,
        rating: 4.9,
        reviewCount: 512,
        features: [
          "Ultra-high speed SSD",
          "4K gaming",
          "Haptic feedback",
          "Adaptive triggers",
          "3D Audio"
        ],
        specifications: {
          "Processor": "AMD Ryzen Zen 2",
          "Graphics": "AMD Radeon RDNA 2",
          "Storage": "825GB SSD",
          "Resolution": "4K UHD"
        }
      }
    ]);

    // Criar usuário admin
    await User.create({
      firstName: "Admin",
      lastName: "User", 
      email: "admin@techstore.com",
      password: "admin123",
      role: "admin"
    });

    console.log('✅ Dados iniciais criados com sucesso!');
    console.log(`📦 ${products.length} produtos criados`);
    
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();