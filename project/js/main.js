class ProductsList {
    constructor(){
        this.products = [];
        this.summa = 0;
        this.init();
    }
    init(){
        this.fetchProducts();
        this.render();
        this.summaAllProducts();
        console.log(this.summa);
    }
    fetchProducts(){
        this.products = [
            {title: 'Notebook', price: 2000},
            {title: 'Mouse', price: 20},
            {title: 'Keyboard', price: 48},
            {title: 'Gamepad', price: 63},
            {title: 'Chair', price: 200},
        ];
    }
    render(){
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            block.insertAdjacentHTML('beforeend', prod.render());
        });
    }
    summaAllProducts(){
        this.products.forEach(product => {
            this.summa += product.price;
        });
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button type="button" class="add-to-cart">Купить</button>
                    </div>
                </div>`;
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
