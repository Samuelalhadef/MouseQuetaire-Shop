'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// 1. Créer le contexte
const CartContext = createContext(undefined)

// 2. Créer le Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  
  // Charger le panier depuis localStorage lorsque le composant est monté
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Erreur de lecture du panier:', error)
          setCartItems([])
        }
      }
    }
  }, [])
  
  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])
  
  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    const quantity = product.quantity || 1
    
    setCartItems(prevItems => {
      // Vérifier si le produit existe déjà dans le panier
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex !== -1) {
        // Produit existe déjà, mettre à jour la quantité
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        return updatedItems
      } else {
        // Nouveau produit, l'ajouter au panier
        return [...prevItems, { ...product, quantity }]
      }
    })
  }
  
  // Fonction pour retirer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    )
  }
  
  // Fonction pour mettre à jour la quantité d'un produit
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }
  
  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
  }
  
  // Fonction pour calculer le total du panier
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }
  
  // Valeur du contexte à exposer
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  }
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// 3. Hook pour utiliser le contexte du panier
export function useCart() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider")
  }
  
  return context
}