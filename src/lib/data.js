// Données fictives pour les produits
export const products = [
  {
    id: 1,
    name: "Smartphone Ultra X",
    price: 899.99,
    description: "Un smartphone haut de gamme avec un écran AMOLED 6.7 pouces, un processeur ultra-rapide et un appareil photo 108MP pour des photos époustouflantes de jour comme de nuit.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&q=75&fit=crop&w=600",
    features: [
      "Écran AMOLED 6.7 pouces",
      "Processeur octa-core 3.2 GHz",
      "Caméra principale 108MP",
      "Batterie 5000mAh",
      "Charge rapide 65W"
    ],
    stock: 15,
    category: "électronique"
  },
  {
    id: 2,
    name: "Écouteurs sans fil Pro",
    price: 149.99,
    description: "Ces écouteurs sans fil offrent une qualité sonore exceptionnelle avec une réduction de bruit active et une autonomie de 30 heures. Parfaits pour les déplacements et le sport.",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&q=75&fit=crop&w=600",
    features: [
      "Réduction de bruit active",
      "Autonomie 30 heures",
      "Résistants à l'eau IPX4",
      "Commandes tactiles",
      "Bluetooth 5.2"
    ],
    stock: 42,
    category: "électronique"
  },
  {
    id: 3,
    name: "Montre connectée FitTrack",
    price: 229.99,
    description: "Suivez votre activité physique, votre sommeil et votre santé avec cette montre connectée élégante. Écran toujours actif, GPS intégré et plus de 100 modes d'entraînement.",
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&q=75&fit=crop&w=600",
    features: [
      "Écran AMOLED toujours actif",
      "GPS intégré",
      "Suivi du sommeil et du stress",
      "Étanche 50m",
      "Autonomie 7 jours"
    ],
    stock: 28,
    category: "électronique"
  },
  {
    id: 4,
    name: "Ordinateur portable ProBook",
    price: 1299.99,
    description: "Un ordinateur portable puissant et élégant pour les professionnels. Avec son processeur dernière génération et son écran haute définition, il vous accompagnera dans tous vos projets.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&q=75&fit=crop&w=600",
    features: [
      "Processeur Intel i7 de 11e génération",
      "16 Go de RAM DDR4",
      "SSD 512 Go",
      "Écran 15.6\" Full HD",
      "Windows 11 Pro"
    ],
    stock: 10,
    category: "informatique"
  },
  {
    id: 5,
    name: "Appareil photo mirrorless 4K",
    price: 1499.99,
    description: "Capturez des images et vidéos d'une qualité exceptionnelle avec cet appareil photo mirrorless. Idéal pour les photographes amateurs et professionnels.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&q=75&fit=crop&w=600",
    features: [
      "Capteur CMOS 24MP",
      "Vidéo 4K 60fps",
      "Stabilisation 5 axes",
      "Écran tactile orientable",
      "Wi-Fi et Bluetooth intégrés"
    ],
    stock: 8,
    category: "photo"
  },
  {
    id: 6,
    name: "Console de jeux NextGen",
    price: 499.99,
    description: "La dernière console de jeux avec des graphismes époustouflants, un chargement ultra-rapide et une bibliothèque de jeux incroyable. Entrez dans une nouvelle ère du gaming.",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&q=75&fit=crop&w=600",
    features: [
      "GPU 10.3 TFLOPS",
      "SSD ultra-rapide 1TB",
      "Ray Tracing en temps réel",
      "Compatibilité 4K 120fps",
      "Audio 3D"
    ],
    stock: 5,
    category: "gaming"
  },
  {
    id: 7,
    name: "Tablette Creative Pro",
    price: 799.99,
    description: "Une tablette performante avec un écran haute résolution et un stylet précis pour les créatifs. Parfaite pour le dessin, l'édition photo et la productivité.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&q=75&fit=crop&w=600",
    features: [
      "Écran 12.9\" Liquid Retina",
      "Puce M1",
      "Stylet sensible à la pression",
      "128 Go de stockage",
      "Caméras avant et arrière"
    ],
    stock: 15,
    category: "informatique"
  },
  {
    id: 8,
    name: "Drone Explorer 4K",
    price: 999.99,
    description: "Explorez le monde d'en haut avec ce drone équipé d'une caméra 4K stabilisée. Facile à piloter et avec une autonomie impressionnante de 35 minutes.",
    image: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&q=75&fit=crop&w=600",
    features: [
      "Caméra 4K stabilisée",
      "Autonomie 35 minutes",
      "Portée 10 km",
      "Évitement d'obstacles",
      "Suivie automatique"
    ],
    stock: 7,
    category: "photo"
  }
];

// Données de catégories
export const categories = [
  { id: 1, name: "électronique", icon: "smartphone" },
  { id: 2, name: "informatique", icon: "laptop" },
  { id: 3, name: "photo", icon: "camera" },
  { id: 4, name: "gaming", icon: "gamepad" }
];