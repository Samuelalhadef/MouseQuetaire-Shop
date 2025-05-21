'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../../hooks/useCart'

export default function CartSummary() {
  const { cartItems, getCartTotal } = useCart()
  const summaryRef = useRef(null)

  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.style.opacity = 0;
      setTimeout(() => {
        if (summaryRef.current) {
          summaryRef.current.style.opacity = 1;
          summaryRef.current.style.transition = 'opacity 0.5s ease-in';
        }
      }, 100);
    }
  }, []);

  // Calcul des différentes valeurs
  const subtotal = getCartTotal ? getCartTotal() : 0
  const shipping = subtotal > 50 ? 0 : 5.99 // Livraison gratuite au-dessus de 50€
  const total = subtotal + shipping

  return (
    <div 
      ref={summaryRef}
      className="bg-white rounded-lg shadow-md p-6 text-gray-900"
    >
      <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between">
          <span>Livraison</span>
          <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} €`}</span>
        </div>
        
        {shipping > 0 && (
          <div className="text-sm text-gray-500">
            Livraison gratuite à partir de 50€ d'achat
          </div>
        )}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
      
      <button
        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={() => alert('Fonctionnalité de paiement à implémenter')}
      >
        Procéder au paiement
      </button>
      
      <div className="text-sm text-gray-500 text-center">
        Paiement 100% sécurisé
      </div>
    </div>
  )
}