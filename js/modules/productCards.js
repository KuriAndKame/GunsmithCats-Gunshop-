const renderProductCard = ({id, nameOfGood, typeOfGood, price, count, photo, info, refPath}) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'flex-fill', 'align-items-center', 'p-5', 'border-top')

    li.innerHTML = `
                  <a href="${refPath}" class="no-underline"> 
                    <img src="${photo}">
                    ${nameOfGood}
                    <span class="tag tag-default tag-pill pull-xs-right hidden-xs-down">
                      <i class="fa-solid fa-dollar-sign" aria-hidden="true"></i>${price}
                    </span>
                  </a>
    `

    return li
}

const appendProductCard = (product, container) => {
    container.append(product)
}


const renderProductCards = (products, container) => {
    container.innerHTML = ''
    products.forEach((product) => {
        const card = renderProductCard(product)
        console.log('card: ', card)
        appendProductCard(card, container)
    })
}

export{
    renderProductCards
}