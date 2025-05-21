'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function KeyboardBackground() {
  const containerRef = useRef(null)
  
  useEffect(() => {
    // S'assurer que la référence est disponible
    if (!containerRef.current) return
    
    // Récupérer l'élément conteneur
    const container = containerRef.current
    container.innerHTML = '' // Nettoyer le contenu précédent
    
    // Dimensions de la fenêtre
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // Créer un conteneur pour l'animation
    const keysContainer = document.createElement('div')
    keysContainer.className = 'absolute inset-0'
    keysContainer.style.width = `${windowWidth * 2}px`
    keysContainer.style.height = `${windowHeight * 2}px`
    keysContainer.style.top = `-${windowHeight / 2}px`
    keysContainer.style.left = `-${windowWidth / 2}px`
    container.appendChild(keysContainer)
    
    // Configuration des touches - plus uniformes
    const REGULAR_KEY_SIZE = 150 // Taille uniforme pour les touches normales
    const SPACE_BAR_WIDTH = 300
    const SPACE_BAR_HEIGHT = 70
    
    // Espacement minimum entre les touches - augmenté pour éviter tout risque de chevauchement
    const MIN_SPACING = 70
    
    // Tableau pour stocker toutes les touches placées avec leurs dimensions
    const placedKeys = []
    
    // Fonction améliorée pour vérifier les chevauchements
    const isOverlapping = (newKey) => {
      // Marges de sécurité
      const safetyMargin = MIN_SPACING / 2
      
      // Coordonnées avec marges de sécurité
      const newLeft = newKey.x - safetyMargin
      const newRight = newKey.x + newKey.width + safetyMargin
      const newTop = newKey.y - safetyMargin
      const newBottom = newKey.y + newKey.height + safetyMargin
      
      // Vérifier le chevauchement avec chaque touche existante
      for (const key of placedKeys) {
        const keyLeft = key.x - safetyMargin
        const keyRight = key.x + key.width + safetyMargin
        const keyTop = key.y - safetyMargin
        const keyBottom = key.y + key.height + safetyMargin
        
        // Condition de chevauchement
        if (
          newRight > keyLeft && 
          newLeft < keyRight && 
          newBottom > keyTop && 
          newTop < keyBottom
        ) {
          return true // Chevauchement détecté
        }
      }
      
      return false // Pas de chevauchement
    }
    
    // Fonction pour créer et placer une touche
    const createKey = () => {
      // Déterminer si c'est une barre d'espace (15% de chance)
      const isSpaceBar = Math.random() < 0.15
      
      // Dimensions selon le type
      const width = isSpaceBar ? SPACE_BAR_WIDTH : REGULAR_KEY_SIZE
      const height = isSpaceBar ? SPACE_BAR_HEIGHT : REGULAR_KEY_SIZE
      
      // Position aléatoire dans le conteneur élargi
      const x = Math.random() * (windowWidth * 2 - width)
      const y = Math.random() * (windowHeight * 2 - height)
      
      // Créer l'objet touche
      const newKey = { x, y, width, height, isSpaceBar }
      
      // Vérifier le chevauchement
      if (isOverlapping(newKey)) {
        return false // Ne pas créer la touche si elle chevauche
      }
      
      // Créer l'élément DOM pour la touche
      const keyElement = document.createElement('div')
      keyElement.className = 'absolute'
      keyElement.style.left = `${x}px`
      keyElement.style.top = `${y}px`
      
      // Créer l'image
      const img = document.createElement('img')
      img.style.filter = 'brightness(2.0)' // Encore plus blanc pour une meilleure visibilité
      
      if (isSpaceBar) {
        img.src = '/images/space-barre.png'
        img.alt = 'Space bar key'
        img.style.width = `${SPACE_BAR_WIDTH}px`
      } else {
        img.src = '/images/touch.png'
        img.alt = 'Keyboard key'
        img.style.width = `${REGULAR_KEY_SIZE}px`
      }
      
      img.style.height = 'auto'
      
      // Ajouter l'image à la touche
      keyElement.appendChild(img)
      
      // Ajouter la touche au conteneur
      keysContainer.appendChild(keyElement)
      
      // Stocker la touche placée pour la détection des chevauchements
      placedKeys.push(newKey)
      
      return true // Touche créée avec succès
    }
    
    // Augmenter le nombre de touches cibles (plus de touches)
    const targetKeyCount = Math.ceil((windowWidth * windowHeight) / (REGULAR_KEY_SIZE * REGULAR_KEY_SIZE) * 1.3)
    let attemptCount = 0
    let placedCount = 0
    
    // Augmenter le nombre de tentatives pour placer plus de touches
    const maxAttempts = targetKeyCount * 10
    
    // Placer les touches
    while (placedCount < targetKeyCount && attemptCount < maxAttempts) {
      if (createKey()) {
        placedCount++
      }
      attemptCount++
    }
    
    console.log(`Touches placées: ${placedCount}/${targetKeyCount} (${Math.round(placedCount/targetKeyCount*100)}%)`)
    
    // Animation diagonale du coin supérieur droit au coin inférieur gauche
    gsap.to(keysContainer, {
      x: windowWidth / 2,
      y: windowHeight / 2,
      duration: 45, // Animation plus lente
      ease: "linear",
      repeat: -1,
      onRepeat: () => {
        // Réinitialiser la position pour une animation continue
        gsap.set(keysContainer, { 
          x: -windowWidth / 2, 
          y: -windowHeight / 2 
        })
      }
    })
    
    // Nettoyer lors du démontage
    return () => {
      gsap.killTweensOf(keysContainer)
      container.innerHTML = ''
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0 bg-[#0A0E23]"
    ></div>
  )
}