const products = [
    {title: 'Notebook', price: 2000},
    {title: 'Mouse', price: 20},
    {title: 'Keyboard', price: 48},
    {title: 'Gamepad', price: 63},
    {title: 'Chair'}
];


const renderProduct = (title, price = 500) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button type="button" class="add-to-cart">Добавить</button>
            </div>`
};

const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
};

renderPage(products);
