const goods = [
    { title: 'Shirt', price: 150, img: 'img/img1.jpg'},
    { title: 'Socks', price: 50, img: 'img/img1.jpg'},
    { title: 'Jacket', price: 350, img: 'img/img1.jpg'},
    { title: 'Shoes', price: 250, img: 'img/img1.jpg'},
];
const renderGoodsItem = (title, price, img) => {
    return `<div class="goods-item">
                <img src="${img}" alt="img">
                <h3>${title}</h3>
                <p>${price}$</p>
                <button class="cart-button" type="button">Добавить</button>
            </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    let goodsListMarkup = '';
    goodsList.forEach( item => goodsListMarkup += item);
    document.querySelector('.goods-list').innerHTML = goodsListMarkup;
}

renderGoodsList(goods);

//  Задания:
//  1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
//  2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
//  3. * Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?

// Решения:
// 1. Добавил стили и разметку используя макет из методички. Укажите если я воспроизвел что-то не так.
// 2. Тут я не понял что от меня требуется. В какую функцию добавить значения аргумента по умолчанию? На 23 строчке которая?
// 3. Запятая ставилась так как мы выводили массив в .goods-list. При выводе массива, элементы выводятся через запятую.
// Чтобы разметка приходила без запятых, я сделал переменную типа "строка", чтобы туда прилетали элементы массива и
// просто добавлялись к переменной. Не знаю на сколько данный метод правильный.