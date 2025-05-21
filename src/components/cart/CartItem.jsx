'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '../../hooks/useCart'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const itemRef = useRef(null)

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.opacity = 0;
      setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.style.opacity = 1;
          itemRef.current.style.transition = 'opacity 0.3s ease-in';
        }
      }, 50);
    }
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    updateQuantity(item.id, isNaN(value) || value < 1 ? 1 : value)
  }

  const handleRemove = () => {
    if (itemRef.current) {
      itemRef.current.style.opacity = 0;
      itemRef.current.style.transform = 'translateX(-20px)';
      itemRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      
      setTimeout(() => {
        removeFromCart(item.id)
      }, 300);
    } else {
      removeFromCart(item.id);
    }
  }

  return (
    <div ref={itemRef} className="p-6 grid grid-cols-12 gap-4 items-center">
      <div className="col-span-6 flex items-center space-x-4">
        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={item.image || '/images/placeholder.png'}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium">{item.name}</h3>
          <button
            onClick={handleRemove}
            className="text-sm text-red-500 hover:text-red-700 mt-1"
          >
            Supprimer
          </button>
        </div>
      </div>
      
      <div className="col-span-2 text-center">
        {item.price ? `${item.price.toFixed(2)} €` : '0.00 €'}
      </div>
      
      <div className="col-span-2 text-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-gray-900"
        />
      </div>
      
      <div className="col-span-2 text-center font-medium">
        {item.price ? `${(item.price * item.quantity).toFixed(2)} €` : '0.00 €'}
      </div>
    </div>
  )
}