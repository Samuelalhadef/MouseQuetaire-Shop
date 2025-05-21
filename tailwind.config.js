/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-blue': '#0A0E23',  // Bleu très foncé presque noir pour le fond
        'card-blue': '#1B2345',        // Bleu plus clair pour le rectangle principal
        'deep-blue': '#131C45',        // Bleu intermédiaire pour les éléments d'interface
        'subtitle-blue': '#B8C3E6',    // Bleu clair pour le sous-titre
      },
      boxShadow: {
        'card': '5px 5px 0px 0px rgba(255,255,255,1)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      }
    },
  },
  plugins: [],
}