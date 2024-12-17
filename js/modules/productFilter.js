import { renderProductCards } from "./productCards.js"


const filter = (products, productContainer) => {
    const inputSearch = document.querySelector('.js-input-search')

    const filterProducts = (filterInputSearch) => {
        let filteredProducts = products.filter((product) => {
            if(filterInputSearch && !product.nameOfGood.toLowerCase().includes(filterInputSearch.toLowerCase())){
                return false
            }
            return true
        })
        return filteredProducts
    }

    const handleSearchInput = () => {
        inputSearch.addEventListener("input", applyFilters)
    }

    const applyFilters = () => {
        const filteredProducts = filterProducts(inputSearch.value)
        renderProductCards(filteredProducts, productContainer)
    }

    handleSearchInput()
}

export{
    filter
}