'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../hooks/useCart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartItems } = useCart ? useCart() : { cartItems: [] }

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0E23]/90 backdrop-blur-md py-2' : 'bg-[#0A0E23] py-4'
      }`}
    >
      {/* Bannière supérieure */}
      <div className="bg-[#131C45] text-yellow-400 text-center text-sm py-1 px-4">
        Ici, teste pour des offres su infos du style: 🎁 Livraison offerte à partir de 100€ 📦
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Agrandi et plus beau */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/images/mousquetaire-logo.png" 
                alt="MouseQuetaire Shop" 
                width={250} // Logo agrandi
                height={60}
                priority
                className="object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='60' viewBox='0 0 250 60'%3E%3Crect width='250' height='60' fill='%23193366' fill-opacity='0'/%3E%3Ctext x='50' y='35' font-family='Arial' font-size='24' font-weight='bold' text-anchor='start' fill='white'%3EMouseQuetaire Shop%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </Link>

          {/* Navigation - Desktop - Style amélioré */}
          <div className="hidden md:flex items-center space-x-5">
            <Link href="/" className="relative px-6 py-2 group">
              <span className="absolute inset-0 bg-white rounded-full transform scale-100 transition-transform duration-300 group-hover:scale-110"></span>
              <span className="relative text-[#1B2345] font-medium z-10 group-hover:text-[#0A0E23]">
                Accueil
              </span>
            </Link>
            
            <Link href="/products" className="relative px-6 py-2 group">
              <span className="absolute inset-0 bg-white rounded-full transform scale-100 transition-transform duration-300 group-hover:scale-110"></span>
              <span className="relative text-[#1B2345] font-medium z-10 group-hover:text-[#0A0E23]">
                Magasin
              </span>
            </Link>
            
            <Link href="https://mousquetaire.com" className="text-white hover:text-blue-200 font-medium py-2 px-4 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full">
              Site de Mousquetaire
            </Link>
          </div>

          {/* Cart Button - Style amélioré */}
          <Link 
            href="/cart" 
            className="relative p-3 bg-white rounded-full overflow-hidden transition-transform hover:scale-110 duration-300 group"
          >
            <div className="absolute inset-0 bg-blue-50 transform scale-0 transition-transform group-hover:scale-100 rounded-full"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1B2345] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-20 font-medium">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button - Style amélioré */}
          <button 
            className="md:hidden p-2 rounded-full text-white hover:bg-[#131C45] transition-colors focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Style amélioré */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 bg-[#131C45] rounded-lg p-4 animate-fadeIn">
            <Link href="/" className="block bg-white text-[#1B2345] hover:bg-blue-100 font-medium py-2 px-4 rounded-full transition-colors w-full text-center">
              Accueil
            </Link>
            <Link href="/products" className="block bg-white text-[#1B2345] hover:bg-blue-100 font-medium py-2 px-4 rounded-full transition-colors w-full text-center">
              Magasin
            </Link>
            <Link href="https://mousquetaire.com" className="block text-white hover:text-blue-200 py-2 px-4 w-full text-center border border-white/20 rounded-full">
              Site de Mousquetaire
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}