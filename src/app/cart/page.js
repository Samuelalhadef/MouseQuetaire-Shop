'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useCart } from '@/hooks/useCart'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { cartItems, clearCart } = useCart()
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  
  useEffect(() => {
    // Animation du titre
    gsap.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Animation du contenu
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })
    }
  }, [])

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 ref={titleRef} className="text-3xl font-bold mb-6">Votre panier</h1>
        <div ref={contentRef} className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg text-gray-600 mb-6">Votre panier est vide.</p>
          <Link href="/products">
            <Button>Continuer vos achats</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 ref={titleRef} className="text-3xl font-bold mb-6">Votre panier</h1>
      
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <div className="grid grid-cols-12 gap-4 font-medium text-gray-500">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-2 text-center">Quantité</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="p-6 flex justify-between">
              <Button 
                onClick={clearCart} 
                variant="secondary"
              >
                Vider le panier
              </Button>
              
              <Link href="/products">
                <Button variant="secondary">
                  Continuer vos achats
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}