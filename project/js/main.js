const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(){
        this.goods = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        this._getProducts();
    }
    _getProducts(){
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data];
                this.render();
            })
            .catch(error => {
                console.log(error)
            });
    }
    render(){
        const block = document.querySelector('.products');
        this.goods.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        })
    }
    sumPrice(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0)
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="add-to-cart" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`
    }
}

class CartList {
    constructor(){
        this.products = [];
        this.container = document.querySelector('.cart');
        this.renderAll();
    }
    addItem(){
        // получаем данные через событие по клику на button и передаем в this.products,
        // чтоб можно было вывести всю корзину
        // а так же выводим в корзину данные продукта через this.renderItem();
        this.renderItem(this.container, product);
    }
    renderAll(){
        // выводим в корзину данные из this.products через forEach и this.renderItem();
        this.products.forEach(product => {
            this.renderItem(this.container, product);
        });
    }
    renderItem(container, product){
        // выводим в корзину данные продукта через new CartItem(product).render();
        const item = new CartItem(product);
        container.insertAdjacentHTML('beforeend', item.render());
    }
}

class CartItem {
    constructor(product){
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return '<div class="cart-item"></div>';
    }
}

let products = new ProductsList();
let cart = new CartList();

// const products = [
//     {title: 'Notebook', price: 2000},
//     {title: 'Mouse', price: 20},
//     {title: 'Keyboard', price: 48},
//     {title: 'Gamepad', price: 63},
//     {title: 'Chair', price: 200}
// ];
//
// const renderProduct = (title, price, img = 'https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="some img">
//                 <div class="desc">
//                     <h3>${title}</h3>
//                     <p>${price} $</p>
//                     <button type="button" class="add-to-cart">Добавить</button>
//                 </div>
//             </div>`;
// };
//
// const renderPage = list => {
//     document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
// };
//
// renderPage(products);
