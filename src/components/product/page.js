'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import ProductCard from '../components/product/ProductCard'
import { products } from '../lib/data'

export default function Home() {
  const headerRef = useRef(null)
  const productsRef = useRef(null)

  useEffect(() => {
    // Animation GSAP pour le titre
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    // Animation séquentielle pour les produits
    gsap.from(productsRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    })
  }, [])

  return (
    <div>
      <section className="mb-12">
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre boutique</h1>
          <p className="text-xl text-gray-600 mb-6">Découvrez nos produits de qualité</p>
          <Link href="/products" className="btn btn-primary">
            Voir tous les produits
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Produits populaires</h2>
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}