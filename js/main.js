import { renderProductCards } from "./modules/productCards.js";
import products from "./products.js";
import { filter } from "./modules/productFilter.js";

window.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.js-product-list')

    renderProductCards(products, productsContainer)
    filter(products, productsContainer)
    
})