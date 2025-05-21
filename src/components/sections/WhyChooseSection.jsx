'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import MovingStars from './MovingStars' // Importation du nouveau composant

export default function WhyChooseSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const circlesRef = useRef(null)
  
  // Données des avantages
  const advantages = [
    {
      id: 1,
      title: "Qualité premium",
      description: "Nos claviers sont fabriqués avec les meilleurs matériaux pour une durabilité exceptionnelle",
      icon: "/images/quality-icon.png" // Placeholder
    },
    {
      id: 2,
      title: "Design ergonomique",
      description: "Conçus pour offrir un confort maximal et réduire la fatigue même après des heures d'utilisation",
      icon: "/images/design-icon.png" // Placeholder
    },
    {
      id: 3,
      title: "Support réactif",
      description: "Notre équipe est disponible 24/7 pour répondre à toutes vos questions et préoccupations",
      icon: "/images/support-icon.png" // Placeholder
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    
    // Animations au scroll
    const setupScrollAnimations = () => {
      // Animation du titre
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Animation des cercles
      if (circlesRef.current && circlesRef.current.children) {
        gsap.fromTo(
          circlesRef.current.children,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: circlesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }
    
    // Exécuter les animations
    setupScrollAnimations()
    
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#121C42] py-24 overflow-hidden"
    >
      {/* Composant d'étoiles animées */}
      <MovingStars count={6} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold text-white mb-4 inline-block"
          >
            Pourquoi choisir nos produits ?
          </h2>
        </div>
        
        {/* Cercles d'avantages */}
        <div 
          ref={circlesRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {advantages.map((advantage) => (
            <div 
              key={advantage.id} 
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full bg-[#0A0E23] flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-300 p-4 shadow-lg shadow-black/30">
                <div className="w-32 h-32 rounded-full bg-[#162050] flex items-center justify-center">
                  <Image 
                    src={advantage.icon} 
                    alt={advantage.title}
                    width={64}
                    height={64}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Fallback pour afficher un placeholder si l'image n'existe pas
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z'%3E%3C/path%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{advantage.title}</h3>
              <p className="text-blue-200 text-center max-w-xs">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-24 py-6 border-t border-blue-900/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            Agence de développement web & design © 2025 MouseQuetaire. Tous droits réservés
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}