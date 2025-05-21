'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import Button from './Button'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer
}) {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  // Attendre que le composant soit monté côté client
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Animation d'ouverture et fermeture
  useEffect(() => {
    if (!modalRef.current) return

    if (isOpen) {
      // Animations d'ouverture
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.fromTo(contentRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      )
    } else {
      // Animations de fermeture
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })

      gsap.to(contentRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [isOpen])

  // Gestionnaire de la touche Echap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Ne pas afficher si le composant n'est pas monté ou si la modal n'est pas ouverte
  if (!mounted || !isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenu de la modal */}
      <div 
        ref={contentRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="modal-title" className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Corps */}
        <div className="p-4">
          {children}
        </div>
        
        {/* Pied de page (optionnel) */}
        {footer && (
          <div className="p-4 border-t flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}