/**
 * Formate un prix avec le symbole de devise
 * @param {number} price - Le prix à formater
 * @param {string} currency - Le symbole de la devise (défaut: €)
 * @returns {string} Le prix formaté
 */
export function formatPrice(price, currency = '€') {
  return `${price.toFixed(2)} ${currency}`;
}

/**
 * Limite le nombre de caractères d'une chaîne et ajoute "..." si nécessaire
 * @param {string} text - Le texte à tronquer
 * @param {number} limit - La limite de caractères (défaut: 100)
 * @returns {string} Le texte tronqué
 */
export function truncateText(text, limit = 100) {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}

/**
 * Génère un ID unique
 * @returns {string} Un ID unique
 */
export function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Filtre les produits par catégorie
 * @param {Array} products - Liste des produits
 * @param {string} category - Catégorie à filtrer
 * @returns {Array} Produits filtrés
 */
export function filterProductsByCategory(products, category) {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
}

/**
 * Trie les produits selon différents critères
 * @param {Array} products - Liste des produits
 * @param {string} sortBy - Critère de tri ('price-asc', 'price-desc', 'name', 'newest')
 * @returns {Array} Produits triés
 */
export function sortProducts(products, sortBy = 'newest') {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      // Dans un vrai projet, vous utiliseriez une date de création
      return productsCopy.sort((a, b) => b.id - a.id);
  }
}

/**
 * Vérifie si une chaîne est une URL valide
 * @param {string} string - La chaîne à vérifier
 * @returns {boolean} true si c'est une URL valide
 */
export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}