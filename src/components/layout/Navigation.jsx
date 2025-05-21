import Link from 'next/link'

export default function Navigation({ mobile = false }) {
  const navClasses = mobile 
    ? "flex flex-col space-y-2" 
    : "flex items-center space-x-6"

  return (
    <nav className={navClasses}>
      <Link href="/" className="text-gray-700 hover:text-primary-600">
        Accueil
      </Link>
      <Link href="/products" className="text-gray-700 hover:text-primary-600">
        Produits
      </Link>
      <Link href="/cart" className="text-gray-700 hover:text-primary-600">
        Panier
      </Link>
    </nav>
  )
}