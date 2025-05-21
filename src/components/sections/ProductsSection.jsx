'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function ProductsSection() {
  // Références pour les animations
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const productsRef = useRef(null)
  const buttonRef = useRef(null)
  
  // Produits avec plus d'informations
  const products = [
    { 
      id: 1, 
      name: "Clavier Mécanique X-Type", 
      description: "Switches Cherry MX Red, rétroéclairage RGB programmable",
      price: "129.99€", 
      tag: "Bestseller",
      image: "/images/placeholder.png" 
    },
    { 
      id: 2, 
      name: "Clavier Ergonomique E-Pro", 
      description: "Design ergonomique, repose-poignets intégré, touches silencieuses",
      price: "159.99€", 
      tag: "Nouveau",
      image: "/images/placeholder.png" 
    },
    { 
      id: 3, 
      name: "Clavier Gaming Rush", 
      description: "Optimisé pour le gaming, temps de réponse 1ms, RGB avancé",
      price: "149.99€", 
      tag: "Populaire",
      image: "/images/placeholder.png" 
    },
    { 
      id: 4, 
      name: "Clavier Compact Slim", 
      description: "Format 60%, portable, connexion Bluetooth et USB-C",
      price: "99.99€", 
      tag: "Promo",
      image: "/images/placeholder.png" 
    }
  ]

  useEffect(() => {
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
    
    // Animation pour le titre
    gsap.fromTo(
      titleRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
    
    // Animation pour les descriptions
    gsap.fromTo(
      descriptionRef.current.children,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    )
    
    // Animation pour les produits
    gsap.fromTo(
      productsRef.current.children,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.9,
        rotationX: 10 
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationX: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
    
    // Animation pour le bouton
    gsap.fromTo(
      buttonRef.current,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )
    
    // Nettoyage des animations au démontage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-b from-sky-100 to-sky-200 py-24 relative z-10 overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-sky-200/80 to-transparent"></div>
      <div className="absolute -top-8 left-0 w-full h-8 bg-[#0A0E23] transform skew-y-2"></div>
      
      <div className="container mx-auto px-4">
        {/* Titre avec effet spécial */}
        <div className="relative mb-10">
          <h2 
            ref={titleRef} 
            className="text-5xl md:text-6xl font-bold text-center text-[#1B2345] mb-4 relative inline-block mx-auto"
          >
            <span className="relative z-10">Nos produits</span>
            <span className="absolute -bottom-3 left-0 w-full h-4 bg-sky-300/50 transform -skew-x-6 z-0"></span>
          </h2>
        </div>
        
        {/* Description améliorée */}
        <div 
          ref={descriptionRef} 
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-700 mb-4 font-medium">
            Nous proposons une gamme de produits informatiques designés par nos soins.
          </p>
          <p className="text-gray-600 mb-4">
            Chaque clavier est conçu avec une attention méticuleuse aux détails, offrant une expérience de frappe inégalée.
          </p>
          <p className="text-gray-600">
            Découvrez notre collection exclusive et trouvez le clavier parfait pour vos besoins.
          </p>
        </div>
        
        {/* Grille de produits améliorée */}
        <div 
          ref={productsRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {products.map(product => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-xl overflow-hidden border-4 border-[#0A0E23] shadow-xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Tag de produit */}
              {product.tag && (
                <div className="absolute top-4 right-4 bg-[#1B2345] text-white text-sm py-1 px-3 rounded-full font-medium z-10">
                  {product.tag}
                </div>
              )}
              
              {/* Image avec effet de zoom */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="relative overflow-hidden rounded-lg mb-2 border border-gray-200 bg-white p-4">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
                
                {/* Information produit avec effet de glissement */}
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-[#1B2345] mb-2 group-hover:text-[#304d9e] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 min-h-[3rem]">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[#1B2345]">
                      {product.price}
                    </span>
                    <button className="bg-[#0A0E23] text-white text-sm py-1 px-3 rounded-full hover:bg-[#304d9e] transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton amélioré */}
        <div className="text-center">
          <div ref={buttonRef}>
            <Link 
              href="/products" 
              className="inline-block bg-[#0A0E23] text-white font-bold py-4 px-10 rounded-full hover:bg-[#304d9e] hover:shadow-lg hover:scale-105 transform transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Allez sur la boutique</span>
              <span className="absolute bottom-0 left-0 w-full h-full bg-[#304d9e] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}