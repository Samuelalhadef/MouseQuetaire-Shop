'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MovingStars({ count = 6 }) {
  const starsContainerRef = useRef(null)
  
  useEffect(() => {
    if (!starsContainerRef.current) return
    
    // Fonction pour créer les étoiles avec queues de têtard
    const createStars = () => {
      if (!starsContainerRef.current) return
      
      const container = starsContainerRef.current
      container.innerHTML = ''
      
      // Nombre d'étoiles réduit pour un effet plus subtil et esthétique
      const starCount = count
      
      // Créer un conteneur pour les particules d'ambiance (effet spatial)
      const particlesContainer = document.createElement('div')
      particlesContainer.className = 'absolute inset-0 z-0'
      container.appendChild(particlesContainer)
      
      // Ajouter quelques particules d'ambiance
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full'
        particle.style.width = `${Math.random() * 3 + 1}px`
        particle.style.height = `${Math.random() * 3 + 1}px`
        particle.style.backgroundColor = `rgba(130, 146, 227, ${Math.random() * 0.4 + 0.1})`
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particlesContainer.appendChild(particle)
        
        // Animation subtile des particules
        gsap.to(particle, {
          opacity: 0.2,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5
        })
      }
      
      for (let i = 0; i < starCount; i++) {
        // Créer un wrapper pour l'ensemble
        const starWrapper = document.createElement('div')
        starWrapper.className = 'absolute'
        
        // Position initiale à droite de l'écran avec position verticale aléatoire
        starWrapper.style.right = `-80px` // Un peu moins loin pour éviter les problèmes de bord
        starWrapper.style.top = `${Math.random() * 100}%`
        
        // Taille aléatoire pour l'étoile - beaucoup plus grande
        const size = Math.random() * 60 + 45 // Entre 45px et 105px
        
        // Créer l'étoile d'abord
        const star = document.createElement('div')
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.position = 'relative'
        star.style.zIndex = '1'
        
        // Créer l'image d'étoile
        const img = document.createElement('img')
        img.src = '/images/etoile.png'
        img.alt = 'Étoile'
        img.className = 'w-full h-full object-contain'
        img.style.filter = `brightness(${1 + Math.random() * 0.5}) saturate(${0.9 + Math.random() * 0.3})`
        
        // Ajouter un effet de lueur autour de l'étoile (glow plus subtil)
        star.style.filter = `drop-shadow(0 0 ${Math.random() * 4 + 2}px rgba(130, 146, 227, 0.8))`
        
        // Ajouter l'image à l'étoile
        star.appendChild(img)
        
        // Créer la queue de têtard (encore plus petite et plus organique)
        const tailContainer = document.createElement('div')
        tailContainer.className = 'absolute'
        tailContainer.style.left = `${size * 0.65}px` // Position à gauche de l'étoile
        tailContainer.style.top = `${size / 2}px`
        tailContainer.style.transform = 'translateY(-50%)' // Centrer verticalement
        tailContainer.style.zIndex = '2' // Devant l'étoile
        
        // Queue encore plus petite (1.1x la taille de l'étoile)
        const tailWidth = size * 1.1
        tailContainer.style.width = `${tailWidth}px`
        
        // Hauteur de la queue
        const tailHeight = size * 0.6 // Un peu plus haute pour des mouvements amples
        tailContainer.style.height = `${tailHeight}px`
        
        // Créer le SVG pour la queue avec gradient et formes plus organiques
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')
        svg.setAttribute('viewBox', `0 0 ${tailWidth} ${tailHeight}`)
        svg.style.position = 'absolute'
        svg.style.top = '0'
        svg.style.left = '0'
        svg.style.overflow = 'visible' // Important pour éviter que la queue soit coupée
        
        // Définir un gradient pour la queue
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
        gradient.setAttribute('id', `tailGradient-${i}`)
        gradient.setAttribute('x1', '0%')
        gradient.setAttribute('y1', '50%')
        gradient.setAttribute('x2', '100%')
        gradient.setAttribute('y2', '50%')
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stop1.setAttribute('offset', '0%')
        stop1.setAttribute('stop-color', 'rgba(130, 146, 227, 0.8)')
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stop2.setAttribute('offset', '100%')
        stop2.setAttribute('stop-color', 'rgba(130, 146, 227, 0.2)')
        
        gradient.appendChild(stop1)
        gradient.appendChild(stop2)
        
        // Ajouter le gradient à la définition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        defs.appendChild(gradient)
        svg.appendChild(defs)
        
        // Créer la forme de la queue avec un point central et deux extrémités
        const startY = tailHeight / 2
        
        // Forme fluide avec plus de points de contrôle pour un mouvement naturel
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', `M0,${startY} 
                               C${tailWidth * 0.15},${startY - tailHeight * 0.2} 
                                ${tailWidth * 0.3},${startY + tailHeight * 0.2} 
                                ${tailWidth * 0.5},${startY} 
                               S${tailWidth * 0.8},${startY - tailHeight * 0.1} 
                                ${tailWidth},${startY}`)
        
        // Style de la queue avec le gradient
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', `url(#tailGradient-${i})`)
        path.setAttribute('stroke-width', `${size * 0.12}px`)
        path.setAttribute('stroke-linecap', 'round')
        
        svg.appendChild(path)
        tailContainer.appendChild(svg)
        
        // Ajouter l'étoile et la queue au wrapper
        starWrapper.appendChild(star)
        starWrapper.appendChild(tailContainer)
        
        // Ajouter le wrapper au conteneur
        container.appendChild(starWrapper)
        
        // ---------- ANIMATIONS PLUS NATURELLES ----------
        
        // Animation fluide de la queue (beaucoup plus douce et régulière)
        const tailAnimation = gsap.timeline({ 
          repeat: -1, 
          repeatDelay: 0.1,
          delay: Math.random() * 1.5,
          smoothChildTiming: true
        })
        
        // Mouvements plus doux et plus lents, avec des transitions très fluides
        // Durées plus longues pour un mouvement plus fluide
        const baseDuration = 1.2 + Math.random() * 0.3 // Entre 1.2 et 1.5 seconde (beaucoup plus lent)
        
        // Amplitude réduite pour des mouvements plus délicats
        const gentleAmplitude = 0.15 + Math.random() * 0.1 // Entre 0.15 et 0.25 (moins ample)
        
        // Utilisation d'une seule courbe d'accélération très douce
        const gentleEase = "sine.inOut" // Toujours très doux
        
        // Animation plus simple et plus régulière, avec seulement deux positions
        tailAnimation
          .to(path, {
            attr: { 
              d: `M0,${startY} 
                  C${tailWidth * 0.15},${startY + tailHeight * gentleAmplitude} 
                   ${tailWidth * 0.3},${startY - tailHeight * gentleAmplitude} 
                   ${tailWidth * 0.5},${startY + tailHeight * gentleAmplitude * 0.5} 
                  S${tailWidth * 0.8},${startY - tailHeight * gentleAmplitude * 0.5} 
                   ${tailWidth},${startY}`
            },
            duration: baseDuration,
            ease: gentleEase
          })
          .to(path, {
            attr: { 
              d: `M0,${startY} 
                  C${tailWidth * 0.15},${startY - tailHeight * gentleAmplitude} 
                   ${tailWidth * 0.3},${startY + tailHeight * gentleAmplitude} 
                   ${tailWidth * 0.5},${startY - tailHeight * gentleAmplitude * 0.5} 
                  S${tailWidth * 0.8},${startY + tailHeight * gentleAmplitude * 0.5} 
                   ${tailWidth},${startY}`
            },
            duration: baseDuration,
            ease: gentleEase
          })
        
        // Affiner très progressivement la queue, mouvement subtil
        gsap.to(path, {
          attr: { 'stroke-width': size * 0.09 }, // Réduction moins importante pour moins de changement visuel
          duration: 2 + Math.random(), // Beaucoup plus lent
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
        
        // Animation douce et lente de micro-mouvements pour l'étoile
        const starMicroMovement = gsap.timeline({ 
          repeat: -1,
          delay: Math.random() * 0.2,
          smoothChildTiming: true
        })
        
        // Mouvements très subtils de l'étoile (presque imperceptibles)
        const microMoveX = 2 + Math.random() * 1.5 // Entre 2 et 3.5 pixels (très petit)
        const microMoveY = 1 + Math.random() * 1 // Entre 1 et 2 pixels
        const microRot = 0.5 + Math.random() * 0.5 // Entre 0.5 et 1 degré (très subtil)
        
        // Mouvement extrêmement doux et coordonné avec la queue
        starMicroMovement
          .to(star, {
            x: -microMoveX,
            y: microMoveY,
            rotation: -microRot,
            duration: baseDuration * 1.1, // Légèrement plus long que le mouvement de queue
            ease: gentleEase
          })
          .to(star, {
            x: microMoveX,
            y: -microMoveY,
            rotation: microRot,
            duration: baseDuration * 1.1,
            ease: gentleEase
          })
        
        // Animation de déplacement principal avec très légère variation de vitesse
        // Trajectoire principale très régulière avec infime ondulation
        const pathTimeline = gsap.timeline({
          repeat: -1,
          delay: Math.random() * 10
        })
        
        // Déplacement principal lent et très régulier
        const mainDuration = 25 + Math.random() * 10 // Entre 25 et 35 secondes (plus lent)
        
        pathTimeline
          .fromTo(
            starWrapper,
            {
              x: 0,
              y: 0,
              opacity: 0
            },
            {
              x: -(window.innerWidth + size * 4 + 100),
              y: Math.sin(i) * 10, // Ondulation verticale très légère
              opacity: Math.random() * 0.2 + 0.8, // Plus opaque
              duration: mainDuration,
              ease: "none",
              onComplete: () => {
                // Repositionner avec de nouvelles valeurs aléatoires
                gsap.set(starWrapper, {
                  x: 0,
                  y: 0,
                  top: `${Math.random() * 100}%`,
                  opacity: 0
                })
              }
            }
          )
        
        // Effet fade-in au début et fade-out à la fin (plus lent et progressif)
        gsap.fromTo(
          starWrapper,
          { opacity: 0 },
          { 
            opacity: Math.random() * 0.2 + 0.8, 
            duration: 3, // Plus lent
            ease: "power1.inOut" 
          }
        )
        
        // Ajouter un événement lorsque l'étoile est presque sortie pour faire un fade-out
        gsap.to(starWrapper, {
          opacity: 0,
          duration: 3, // Plus lent
          ease: "power1.inOut",
          delay: mainDuration - 3 // Commencer à disparaître 3 secondes avant la fin
        })
        
        // Animation de pulsation de taille (scintillement très doux et plus lent)
        gsap.to(star, {
          scale: 0.95 + Math.random() * 0.08, // Variation minime
          duration: 3 + Math.random() * 2, // Beaucoup plus lent
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random()
        })
        
        // Animation subtile de l'opacité pour un effet plus naturel
        // Encore plus subtile
        gsap.to(star, {
          opacity: 0.9 + Math.random() * 0.1, // Variation minime (0.9-1.0)
          duration: 4 + Math.random() * 3, // Très lent
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random()
        })
        
        // Suppression des effets aléatoires pour un mouvement plus régulier
      }
    }
    
    // Exécuter la création d'étoiles
    createStars()
    
    // Gestion du redimensionnement
    const handleResize = () => {
      createStars() // Recréer les étoiles lors du redimensionnement
    }
    
    window.addEventListener('resize', handleResize)
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize)
      
      // Arrêter toutes les animations GSAP
      if (starsContainerRef.current) {
        gsap.killTweensOf(starsContainerRef.current.querySelectorAll('*'))
      }
    }
  }, [count])

  return (
    <div 
      ref={starsContainerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    ></div>
  )
}