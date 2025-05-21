'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollTransition() {
  const transitionRef = useRef(null)
  const starsLayerRef = useRef(null)
  const planetsLayerRef = useRef(null)
  const keyboardLayerRef = useRef(null)
  const portalLayerRef = useRef(null)
  const blackBarRef = useRef(null)
  
  useEffect(() => {
    // Enregistrer les plugins GSAP nécessaires
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }
    
    if (!transitionRef.current) return
    
    // Création des éléments de transition style mignon vectoriel
    const createVectorElements = () => {
      if (!transitionRef.current || !starsLayerRef.current || 
          !planetsLayerRef.current || !keyboardLayerRef.current || 
          !portalLayerRef.current || !blackBarRef.current) return
      
      // Vider les conteneurs
      starsLayerRef.current.innerHTML = ''
      planetsLayerRef.current.innerHTML = ''
      keyboardLayerRef.current.innerHTML = ''
      portalLayerRef.current.innerHTML = ''
      
      // Ajouter un dégradé pastel semblable à l'image
      transitionRef.current.style.background = 'linear-gradient(135deg, #a8d8e8 0%, #e8c9df 50%, #b8d8e8 100%)'
      
      // Créer la bande noire en haut
      blackBarRef.current.style.background = '#0B0F1E'
      blackBarRef.current.style.height = '120px'
      blackBarRef.current.style.width = '100%'
      blackBarRef.current.style.position = 'absolute'
      blackBarRef.current.style.top = '0'
      blackBarRef.current.style.left = '0'
      blackBarRef.current.style.zIndex = '100'
      
      // Créer des étoiles géométriques
      const starColors = ['#ffffff', '#ffffff', '#ffffff'] // Étoiles blanches comme dans l'image
      
      for (let i = 0; i < 35; i++) {
        // Créer un SVG pour chaque étoile
        const starSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const size = Math.random() < 0.7 ? Math.random() * 10 + 5 : Math.random() * 20 + 10 // La plupart petites, quelques-unes plus grandes
        starSvg.setAttribute('width', `${size}`)
        starSvg.setAttribute('height', `${size}`)
        starSvg.setAttribute('viewBox', '0 0 24 24')
        starSvg.style.position = 'absolute'
        starSvg.style.left = `${Math.random() * 100}%`
        starSvg.style.top = `${Math.random() * 100}%`
        starSvg.style.opacity = Math.random() * 0.5 + 0.2 // Variation d'opacité
        
        // Choisir entre étoile simple ou étoile brillante
        const starType = Math.random() > 0.7
        let path
        
        if (starType) {
          // Étoile à 4 branches
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          path.setAttribute('d', 'M12,2 L14,10 L22,12 L14,14 L12,22 L10,14 L2,12 L10,10 Z')
        } else {
          // Point lumineux simple (comme dans votre image)
          path = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          path.setAttribute('cx', '12')
          path.setAttribute('cy', '12')
          path.setAttribute('r', '3')
        }
        
        // Couleur blanche
        path.setAttribute('fill', starColors[Math.floor(Math.random() * starColors.length)])
        
        // Ajouter le chemin au SVG
        starSvg.appendChild(path)
        
        // Ajouter au conteneur d'étoiles
        starsLayerRef.current.appendChild(starSvg)
      }
      
      // Créer des planètes mignonnes semblables à celles de l'image
      const planetTypes = [
        { 
          color: '#ffffff', // Blanc
          faceColor: '#e0e0e0',
          hasRing: false,
          size: 35
        },
        { 
          color: '#d1f5d3', // Vert très pâle
          faceColor: '#c1e5c3',
          hasRing: true,
          size: 45
        },
        { 
          color: '#ffffff', // Blanc
          faceColor: '#e0e0e0',
          hasRing: false,
          size: 25
        }
      ]
      
      // Créer 3 planètes
      for (let i = 0; i < 3; i++) {
        const planetType = planetTypes[i % planetTypes.length]
        
        // Conteneur de la planète
        const planetContainer = document.createElement('div')
        planetContainer.className = 'absolute'
        
        // Positionner comme dans l'image
        if (i === 0) {
          planetContainer.style.left = '20%'
          planetContainer.style.top = '65%'
        } else if (i === 1) {
          planetContainer.style.left = '65%'
          planetContainer.style.top = '75%'
        } else {
          planetContainer.style.right = '20%'
          planetContainer.style.top = '30%'
        }
        
        planetContainer.style.transform = 'translate(-50%, -50%)'
        planetContainer.style.opacity = '0'
        
        // SVG pour la planète
        const planetSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        planetSvg.setAttribute('width', `${planetType.size}`)
        planetSvg.setAttribute('height', `${planetType.size}`)
        planetSvg.setAttribute('viewBox', '0 0 120 120')
        
        // Corps de la planète
        const planetCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        planetCircle.setAttribute('cx', '60')
        planetCircle.setAttribute('cy', '60')
        planetCircle.setAttribute('r', '40')
        planetCircle.setAttribute('fill', planetType.color)
        
        // Visage mignon (yeux et sourire) - léger, presque invisible
        const leftEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        leftEye.setAttribute('cx', '45')
        leftEye.setAttribute('cy', '50')
        leftEye.setAttribute('r', '4')
        leftEye.setAttribute('fill', planetType.faceColor)
        leftEye.setAttribute('opacity', '0.5')
        
        const rightEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        rightEye.setAttribute('cx', '75')
        rightEye.setAttribute('cy', '50')
        rightEye.setAttribute('r', '4')
        rightEye.setAttribute('fill', planetType.faceColor)
        rightEye.setAttribute('opacity', '0.5')
        
        const smile = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        smile.setAttribute('d', 'M45,70 Q60,80 75,70')
        smile.setAttribute('stroke', planetType.faceColor)
        smile.setAttribute('stroke-width', '2')
        smile.setAttribute('fill', 'none')
        smile.setAttribute('opacity', '0.5')
        
        // Anneaux (pour certaines planètes)
        if (planetType.hasRing) {
          const ring = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
          ring.setAttribute('cx', '60')
          ring.setAttribute('cy', '60')
          ring.setAttribute('rx', '55')
          ring.setAttribute('ry', '15')
          ring.setAttribute('fill', 'none')
          ring.setAttribute('stroke', planetType.color)
          ring.setAttribute('stroke-width', '2')
          ring.setAttribute('opacity', '0.7')
          planetSvg.appendChild(ring)
        }
        
        // Ajouter tous les éléments au SVG
        planetSvg.appendChild(planetCircle)
        planetSvg.appendChild(leftEye)
        planetSvg.appendChild(rightEye)
        planetSvg.appendChild(smile)
        
        // Ajouter le SVG au conteneur
        planetContainer.appendChild(planetSvg)
        
        // Ajouter au conteneur de planètes
        planetsLayerRef.current.appendChild(planetContainer)
      }
      
      // Créer une fusée (optionnelle, positionnée discrètement)
      const rocketContainer = document.createElement('div')
      rocketContainer.className = 'absolute'
      rocketContainer.style.right = '10%'
      rocketContainer.style.top = '20%'
      rocketContainer.style.opacity = '0'
      rocketContainer.style.transform = 'scale(0.7)'
      
      const rocketSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      rocketSvg.setAttribute('width', '40')
      rocketSvg.setAttribute('height', '60')
      rocketSvg.setAttribute('viewBox', '0 0 40 60')
      
      // Corps de la fusée (simple, blanc)
      const rocketBody = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      rocketBody.setAttribute('d', 'M20,5 L30,25 L30,45 C30,50 20,50 20,50 C20,50 10,50 10,45 L10,25 Z')
      rocketBody.setAttribute('fill', '#ffffff')
      rocketBody.setAttribute('stroke', '#e0e0e0')
      rocketBody.setAttribute('stroke-width', '1')
      
      // Pointe de la fusée
      const rocketTip = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      rocketTip.setAttribute('d', 'M20,5 C25,15 15,15 20,5')
      rocketTip.setAttribute('fill', '#ffffff')
      
      rocketSvg.appendChild(rocketBody)
      rocketSvg.appendChild(rocketTip)
      
      // Ajouter le SVG au conteneur
      rocketContainer.appendChild(rocketSvg)
      
      // Ajouter au conteneur de fusée
      planetsLayerRef.current.appendChild(rocketContainer)
      
      // Créer des touches de clavier flottantes
      const keys = ['A', 'W', 'S', 'D', 'SPACE', 'CTRL', 'SHIFT']
      const keyColors = ['#ffffff', '#eeeeee', '#f5f5f5']
      
      for (let i = 0; i < 5; i++) {
        const keyContainer = document.createElement('div')
        keyContainer.className = 'absolute'
        keyContainer.style.left = `${10 + Math.random() * 80}%`
        keyContainer.style.top = `${30 + Math.random() * 50}%`
        keyContainer.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random() * 20 - 10) + 'deg)'
        keyContainer.style.opacity = '0'
        
        // Créer la touche
        const keySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        
        let keyWidth, keyHeight, viewBox, keyContent
        const keyType = Math.floor(Math.random() * keys.length)
        const keyText = keys[keyType]
        
        if (keyText === 'SPACE') {
          // Barre d'espace
          keyWidth = 100
          keyHeight = 30
          viewBox = '0 0 100 30'
        } else if (keyText === 'SHIFT' || keyText === 'CTRL') {
          // Touches plus larges
          keyWidth = 50
          keyHeight = 30
          viewBox = '0 0 50 30'
        } else {
          // Touches normales
          keyWidth = 30
          keyHeight = 30
          viewBox = '0 0 30 30'
        }
        
        keySvg.setAttribute('width', keyWidth)
        keySvg.setAttribute('height', keyHeight)
        keySvg.setAttribute('viewBox', viewBox)
        
        // Fond de la touche
        const keyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        keyRect.setAttribute('x', '1')
        keyRect.setAttribute('y', '1')
        keyRect.setAttribute('width', String(keyWidth - 2))
        keyRect.setAttribute('height', String(keyHeight - 2))
        keyRect.setAttribute('rx', '4')
        keyRect.setAttribute('ry', '4')
        keyRect.setAttribute('fill', keyColors[Math.floor(Math.random() * keyColors.length)])
        keyRect.setAttribute('stroke', '#dddddd')
        keyRect.setAttribute('stroke-width', '1')
        
        // Texte de la touche
        const keyLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        keyLabel.setAttribute('x', String(keyWidth / 2))
        keyLabel.setAttribute('y', String(keyHeight / 2 + 1))
        keyLabel.setAttribute('text-anchor', 'middle')
        keyLabel.setAttribute('dominant-baseline', 'middle')
        keyLabel.setAttribute('font-family', 'Arial, sans-serif')
        keyLabel.setAttribute('font-size', keyText.length > 1 ? '8' : '12')
        keyLabel.setAttribute('fill', '#555555')
        keyLabel.textContent = keyText
        
        keySvg.appendChild(keyRect)
        keySvg.appendChild(keyLabel)
        keyContainer.appendChild(keySvg)
        
        keyboardLayerRef.current.appendChild(keyContainer)
      }
      
      // Créer le portail vectoriel
      const portalContainer = document.createElement('div')
      portalContainer.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      
      const portalSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      portalSvg.setAttribute('width', '1')
      portalSvg.setAttribute('height', '1')
      portalSvg.setAttribute('viewBox', '0 0 200 200')
      
      // Définir le gradient
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient')
      gradient.setAttribute('id', 'portalGradient')
      gradient.setAttribute('cx', '50%')
      gradient.setAttribute('cy', '50%')
      gradient.setAttribute('r', '50%')
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop1.setAttribute('offset', '0%')
      stop1.setAttribute('stop-color', '#ffffff')
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop2.setAttribute('offset', '50%')
      stop2.setAttribute('stop-color', '#f0f0f0')
      
      const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop3.setAttribute('offset', '100%')
      stop3.setAttribute('stop-color', '#e8e8e8')
      stop3.setAttribute('stop-opacity', '0')
      
      gradient.appendChild(stop1)
      gradient.appendChild(stop2)
      gradient.appendChild(stop3)
      
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      defs.appendChild(gradient)
      
      // Cercle du portail
      const portalCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      portalCircle.setAttribute('cx', '100')
      portalCircle.setAttribute('cy', '100')
      portalCircle.setAttribute('r', '80')
      portalCircle.setAttribute('fill', 'url(#portalGradient)')
      portalCircle.setAttribute('opacity', '0.9')
      
      // Bord du portail (subtil)
      const portalRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      portalRing.setAttribute('cx', '100')
      portalRing.setAttribute('cy', '100')
      portalRing.setAttribute('r', '85')
      portalRing.setAttribute('fill', 'none')
      portalRing.setAttribute('stroke', '#ffffff')
      portalRing.setAttribute('stroke-width', '1')
      portalRing.setAttribute('stroke-dasharray', '10 5')
      portalRing.setAttribute('opacity', '0.6')
      
      // Ajouter les éléments au SVG
      portalSvg.appendChild(defs)
      portalSvg.appendChild(portalCircle)
      portalSvg.appendChild(portalRing)
      
      // Ajouter au conteneur
      portalContainer.appendChild(portalSvg)
      portalLayerRef.current.appendChild(portalContainer)
    }
    
    // Configuration des animations
    const setupAnimations = () => {
      // Animation des étoiles
      gsap.fromTo(
        starsLayerRef.current.children,
        { 
          opacity: 0, 
          scale: 0.3,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power1.out",
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            onLeaveBack: (self) => {
              // Ne rien faire quand on défile vers le haut
              self.disable();
            }
          }
        }
      )
      
      // Animation des planètes et de la fusée
      const planets = planetsLayerRef.current.children
      for (let i = 0; i < planets.length; i++) {
        gsap.fromTo(
          planets[i],
          { 
            opacity: 0, 
            scale: 0.2,
            y: 20
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1,
              onLeaveBack: (self) => {
                // Ne rien faire quand on défile vers le haut
                self.disable();
              }
            }
          }
        )
      }
      
      // Animation des touches de clavier
      const keys = keyboardLayerRef.current.children
      for (let i = 0; i < keys.length; i++) {
        gsap.fromTo(
          keys[i],
          { 
            opacity: 0, 
            y: 30,
            rotation: i % 2 === 0 ? -15 : 15
          },
          {
            opacity: 0.7,
            y: 0,
            rotation: i % 2 === 0 ? 5 : -5,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 65%',
              end: 'top 15%',
              scrub: 1,
              onLeaveBack: (self) => {
                // Ne rien faire quand on défile vers le haut
                self.disable();
              }
            }
          }
        )
      }
      
      // Animation principale du portail - expansion
      const portalSvg = portalLayerRef.current.querySelector('svg')
      if (portalSvg) {
        gsap.fromTo(
          portalSvg,
          { 
            width: '1px', 
            height: '1px',
            opacity: 0 
          },
          {
            width: '300vw',
            height: '300vw',
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 40%',
              end: 'bottom top',
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              onLeaveBack: (self) => {
                // Ne rien faire quand on défile vers le haut
                self.disable();
              }
            }
          }
        )
      }
      
      // Animation de parallaxe pour les étoiles
      gsap.to(starsLayerRef.current, {
        y: '-15%',
        scrollTrigger: {
          trigger: transitionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          onLeaveBack: (self) => {
            // Ne rien faire quand on défile vers le haut
            self.disable();
          }
        }
      })
      
      // Animation pour l'opacité globale de la transition
      gsap.fromTo(
        transitionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
            onLeaveBack: (self) => {
              // Ne rien faire quand on défile vers le haut
              self.disable();
            }
          }
        }
      )
      
      // Disparition progressive une fois la section passée
      gsap.to(
        transitionRef.current,
        {
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'bottom 30%',
            end: 'bottom top',
            scrub: 1,
            onLeaveBack: (self) => {
              // Ne rien faire quand on défile vers le haut
              self.disable();
            }
          }
        }
      )
    }
    
    // Initialisation
    createVectorElements()
    setupAnimations()
    
    // Nettoyage
    return () => {
      const triggers = ScrollTrigger.getAll()
      triggers.forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div 
      ref={transitionRef} 
      className="relative w-full h-[60vh] overflow-hidden opacity-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Bande noire en haut */}
      <div ref={blackBarRef} className="black-bar-top"></div>
      
      {/* Couche d'étoiles vectorielles */}
      <div 
        ref={starsLayerRef} 
        className="absolute inset-0 z-10"
      ></div>
      
      {/* Couche de planètes mignonnes */}
      <div 
        ref={planetsLayerRef} 
        className="absolute inset-0 z-20"
      ></div>
      
      {/* Couche de touches de clavier */}
      <div 
        ref={keyboardLayerRef} 
        className="absolute inset-0 z-30"
      ></div>
      
      {/* Portail vectoriel */}
      <div 
        ref={portalLayerRef} 
        className="absolute inset-0 z-40"
      ></div>
    </div>
  )
}