let products = [
    {
        id: 1,
        nameOfGood: "AK-15",
        typeOfGood: "Assault Rifle",
        price: 1337,
        count: 288,
        photo: "/images/ak15-6.jpg",
        info: "big boobie",
        refPath:"/ak15.html" 
    },
    {
        id: 2,
        nameOfGood: "Legendary finka NKVD",
        typeOfGood: "Knife",
        price: 228,
        count: 1337,
        photo: "/images/finka-5.jpg",
        info: "small boobie",
        refPath:"/finkankvd.html"   
    }
]

const addProduct = (newProduct) => {
    products.push(newProduct);
};

const getProducts = () => products;

export default products
export{
    addProduct,  getProducts
}