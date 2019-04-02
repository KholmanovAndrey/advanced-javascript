const products = [
    {title: 'Notebook', price: 2000},
    {title: 'Mouse', price: 20},
    {title: 'Keyboard', price: 48},
    {title: 'Gamepad', price: 63},
    {title: 'Chair', price: 200}
];


const renderProduct = (title, price, img = 'https://placehold.it/200x150') => {
    return `<div class="product-item">
                <img src="${img}" alt="some img">
                <div class="desc">
                    <h3>${title}</h3>
                    <p>${price} $</p>
                    <button type="button" class="add-to-cart">Добавить</button>
                </div>
            </div>`;
};

const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
};

renderPage(products);
