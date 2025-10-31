import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar carrinho do localStorage UMA VEZ quando o hook é inicializado
  useEffect(() => {
    console.log(' Inicializando carrinho...');
    const savedCart = localStorage.getItem('techstore_cart');
    console.log(' Carrinho salvo no localStorage:', savedCart);
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log(' Carrinho parseado:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error(' Erro ao parsear carrinho:', error);
        localStorage.removeItem('techstore_cart');
      }
    }
    setIsInitialized(true);
  }, []);

  // Salvar carrinho no localStorage apenas quando estiver inicializado e houver mudanças
  useEffect(() => {
    if (isInitialized) {
      console.log(' Salvando carrinho no localStorage:', cartItems);
      try {
        localStorage.setItem('techstore_cart', JSON.stringify(cartItems));
        console.log(' Carrinho salvo com sucesso!');
      } catch (error) {
        console.error(' Erro ao salvar carrinho:', error);
      }
    }
  }, [cartItems, isInitialized]);

  // Função para criar um item de carrinho simplificado
  const createCartItem = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      quantity: quantity
    };
    console.log(' Criando item do carrinho:', cartItem);
    return cartItem;
  };

  const addToCart = (product, quantity = 1) => {
    console.log(' Adicionando ao carrinho:', product, 'Quantidade:', quantity);
    
    if (!product || !product.id) {
      console.error(' Produto inválido:', product);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log(' Quantidade atualizada. Carrinho:', updatedItems);
      } else {
        const newItem = createCartItem(product, quantity);
        updatedItems = [...prevItems, newItem];
        console.log(' Novo item adicionado. Carrinho:', updatedItems);
      }
      
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    console.log(' Removendo do carrinho:', productId);
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log(' Item removido. Carrinho:', updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log(' Atualizando quantidade:', productId, 'Para:', newQuantity);
    
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      console.log(' Quantidade atualizada. Carrinho:', updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log(' Limpando carrinho');
    setCartItems([]);
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total;
  };

  const getCartItemsCount = () => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    return count;
  };

  return {
    cartItems,
    isInitialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };
};