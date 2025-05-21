'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'

export default function CartSummary() {
  const { cartItems, getCartTotal } = useCart()
  const summaryRef = useRef(null)

  useEffect(() => {
    gsap.from(summaryRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.4
    })
  }, [])

  // Calcul des différentes valeurs
  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5.99 // Livraison gratuite au-dessus de 50€
  const total = subtotal + shipping

  return (
    <div 
      ref={summaryRef}
      className="bg-white rounded-lg shadow-md p-6"
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
      
      <Button
        className="w-full mb-4"
        onClick={() => alert('Fonctionnalité de paiement à implémenter')}
      >
        Procéder au paiement
      </Button>
      
      <div className="text-sm text-gray-500 text-center">
        Paiement 100% sécurisé
      </div>
    </div>
  )
}