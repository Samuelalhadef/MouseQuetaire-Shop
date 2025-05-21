import '../styles/globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { CartProvider } from '../hooks/useCart'

export const metadata = {
  title: 'MouseQuetaire Shop',
  description: 'Les meilleurs designers d\'informatique',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0A0E23]">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-32">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}