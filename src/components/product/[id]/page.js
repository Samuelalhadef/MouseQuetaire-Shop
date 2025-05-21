'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { products } from '@/lib/data'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'

export default function ProductDetail({ params }) {
  const { id } = params
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Récupération du produit par ID
    const foundProduct = products.find(p => p.id === parseInt(id) || p.id === id)
    
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // Redirection si le produit n'existe pas
      router.push('/products')
    }
  }, [id, router])

  useEffect(() => {
    if (product && imageRef.current && contentRef.current) {
      // Animation de l'image
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Animation du contenu
      gsap.from(contentRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })
    }
  }, [product])

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) || value < 1 ? 1 : value)
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      })

      // Animation de confirmation
      gsap.to(contentRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Rediriger vers le panier (optionnel)
          // router.push('/cart')
        }
      })
    }
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg">Chargement du produit...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div ref={imageRef} className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.image || '/images/placeholder.png'}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        
        <div ref={contentRef} className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-2xl font-bold text-primary-600 mb-4">
            {product.price.toFixed(2)} €
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {product.features && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Caractéristiques</h2>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-medium">Quantité:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-20"
              />
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="w-full md:w-auto"
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}