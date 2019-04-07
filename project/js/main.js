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
                        <button class="button add-to-cart" data-id="${this.id_product
                                                            }" data-name="${this.product_name
                                                            }" data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class CartList {
    constructor(){
        this.goods = [];
        this.amount = 0;
        this.countGoods = 0;
        this.container = document.querySelector('.cart');
        this.button = document.querySelector('.btn-cart');
        this.containerGoods = document.querySelector('.cart__goods');
        this.containerCommon = document.querySelector('.cart__common');
        this.container.style.display = 'none';
        this.init();
    }
    init(){
        this._openCart();
        this._getBasket();
        this._addToBasket();
        this._deleteFromBasket();
    }
    _openCart(){
        this.button.addEventListener('click', () => {
            if (this.container.style.display === 'none') {
                this.container.style.display = 'block';
            } else {
                this.container.style.display = 'none';
            }
        })
    }
    _getBasket(){
        fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = data.contents;
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.renderAllProduct();
                this.renderCommon();
            })
            .catch(error => {
                console.log(error)
            });
    }
    _addToBasket(){
        document.querySelector('.products').addEventListener('click', e => {
            if (e.target.classList.contains('add-to-cart')){
                fetch(`${API}/addToBasket.json`)
                    .then(result => result.json())
                    .then(data => {
                        if (data.result === 1) {
                            let goodNew = true;
                            for (let i = 0; i < this.goods.length; i++) {
                                if (this.goods[i].id_product === +e.target.dataset.id) {
                                    this.goods[i].quantity++;
                                    goodNew = false;
                                    break;
                                }
                            }
                            if (goodNew) {
                                this.goods.push({
                                    id_product: +e.target.dataset.id,
                                    product_name: e.target.dataset.name,
                                    price: +e.target.dataset.price,
                                    quantity: 1
                                });
                                this.renderItem(this.goods[this.goods.length - 1]);
                            }
                            this._calcOfAmount();
                            this._calcOfCountCoods();
                            this.renderCommon();
                            this.renderAllProduct();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        });
    }
    _deleteFromBasket(){
        document.querySelector('.cart').addEventListener('click', e => {
            if (e.target.classList.contains('cart-item-del')){
                fetch(`${API}/addToBasket.json`)
                    .then(result => result.json())
                    .then(data => {
                        if (data.result === 1) {
                            for (let i = 0; i < this.goods.length; i++) {
                                if (this.goods[i].id_product === +e.target.dataset.id) {
                                    this.goods[i].quantity--;
                                    if (this.goods[i].quantity === 0) {
                                        this.goods.splice(i, 1);
                                    }
                                }
                            }
                            this._calcOfAmount();
                            this._calcOfCountCoods();
                            this.renderCommon();
                            this.renderAllProduct();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        });
    }
    _calcOfAmount(){
        this.amount = 0;
        this.goods.forEach(good => {
            this.amount += good.price * good.quantity;
        });
    }
    _calcOfCountCoods(){
        this.countGoods = 0;
        this.goods.forEach(good => {
            this.countGoods += good.quantity;
        });
    }
    renderAllProduct(){
        this.containerGoods.innerHTML = '';
        // выводим в корзину данные из this.products через forEach и this.renderItem();
        this.goods.forEach(product => {
            this.renderItem(product);
        });
    }
    renderCommon(){
        this.containerCommon.innerHTML = '';

        const html = `<p>countGoods: ${this.countGoods}</p><p>Amount: ${this.amount}</p>`;

        this.containerCommon.insertAdjacentHTML('beforeend', html);
    }
    renderItem(product){
        // выводим в корзину данные продукта через new CartItem(product).render();
        const item = new CartItem(product);
        this.containerGoods.insertAdjacentHTML('beforeend', item.render());
    }
}

class CartItem {
    constructor(product, img = 'https://placehold.it/80x120'){
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }
    render(){
        return `<div class="cart-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="cart-item__desc1">
                        <h3>${this.product_name}</h3>
                        <p><b>quantity: ${this.quantity}</b></p>
                        <p>${this.price} $</p>
                    </div>
                    <div class="cart-item__desc2">
                        <h3>${this.price * this.quantity} $</h3>
                        <button class="button cart-item-del" data-id="${this.id_product
                                                            }" data-name="${this.product_name
                                                            }" data-price="${this.price}">x</button>
                    </div>
                </div>`;
    }
}

let products = new ProductsList();
let cart = new CartList();
