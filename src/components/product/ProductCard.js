'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      })
    })
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      })
    })
    
    return () => {
      card.removeEventListener('mouseenter', () => {})
      card.removeEventListener('mouseleave', () => {})
    }
  }, [])

  const handleAddToCart = (e) => {
    e.preventDefault()
    // Nous allons simplifier cette fonction pour l'instant
    alert(`Produit ajouté au panier: ${product.name}`)
  }

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow transition-shadow duration-300 overflow-hidden"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image || '/images/placeholder.png'}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}