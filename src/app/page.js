'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import KeyboardBackground from '../components/ui/KeyboardBackground'
import ProductsSection from '../components/sections/ProductsSection'
import WhyChooseSection from '../components/sections/WhyChooseSection'

export default function Home() {
  const cardRef = useRef(null)

  return (
    <div className="relative overflow-hidden">
      {/* Background with keyboard keys */}
      <KeyboardBackground />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-10">
        <div className="relative">
          {/* White shadow card - exactement comme dans l'image */}
          <div 
            className="absolute rounded-xl bg-white w-full h-full top-5 left-5"
          ></div>
          
          {/* Main blue card - couleur exacte du bleu */}
          <div 
            ref={cardRef}
            className="relative z-10 bg-[#1B2345] rounded-xl p-12 sm:p-16 text-white text-center max-w-2xl"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Bienvenue sur <br />
                Mousequetaire Shop
              </h1>
              <p className="text-xl text-[#B8C3E6]">
                Les meilleurs designers d'informatique !
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Why Choose Us Section */}
      <WhyChooseSection />
    </div>
  )
}