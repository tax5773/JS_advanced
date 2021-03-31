// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров.
// Продумайте, какие методы понадобятся для работы с этими сущностями.

// Насколько я понял нам нужно сделать набросок корзины. Примерно простроить логику программы.
//Я посикал материалы как собирается обычно карзина. Везде нужен серверный язык для реализации.
//Но нашел интересную задумку как реализовать корзину без сервера. Вернее сервер реализируется на локальном диске.
//Чтобы более детально разобраться в статьях, мне нужно изучение JQuery и JSON. Здорово если вы объясните эту тему в близжайшем
//времени. Если нет, я постараюсь разобраться с JQuery и JSON в течении недели. Пользовался значениями из библиотеки Underscore.
// Пока не разобрался как ее подключать, код "теоретический"

//Проверьте логику того к чему я пришел на данный момент исходя из статей которые прочитал. Буду рад замечаниям.
// P.S. Могут быть ошибки в синтаксисе... Упор ставил на понимание.

// 1. updateData - обновляем данные из localStorage, записываем содержимое в переменную cartData
// 2. getData - возвращаем данные
// 3. saveData - сохраняем корзину в localStorage
// 4. clearData - очищаем корзину
// 5. getById - ищем элемент корзины по id товара
// 6. add - добавляем товар в корзину
// 7. remove - удаляем товар из корзины
// 8. changeCount - меняем количество
// 9. getCount - возвращаем число уникальных товаров корзины
// 10. getCountAll - возвращаем число всех товаров корзины
// 11. getSumma - возвращаем общую сумму заказа

let cartData = [];  // данные корзины - массив объектов

class cartItem{
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class cart{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.cartData();
    }

    cartData(){
        // тут должны быть данные с сервера. Смутно представляю пока, но примерно из cartData переходят значения в this.goods

    }
    // вывод товаров из корзины
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new cartItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }

    // Получаем данные
    updateData(){
    // вроде должно писаться так, но нужно еще с JSON разобраться. Я понимаю как работает localStorage, но несовсем как JSON.parse
    cartData = JSON.parse(localStorage.getItem('cart')) || [];
    return cartData;
    }

    // Возвращаем данные
    getData(){
    return cartData;
    }

    // Сохраняем данные в localStorage
    saveData(){
    localStorage.setItem('cart', JSON.stringify(cartData));
    return cartData;
    }

    // Очищаем данные
    clearData(){
    cartData = [];
    saveData();
    return cartData;
    }

    // Поиск объекта в коллекции cartData по id
    getById(id) {
    return _.findWhere(cartData, {id: id});
    }

    // Добавление товара в коллекцию. Одинаковые товары не дублируются, а складываются.
    add(item) {
    let oldItem;
    updateData();
    oldItem = getById(item.id);
    if(!oldItem) {
        cartData.push(item);
    } else {
        oldItem.count = oldItem.count + item.count;
    }
    saveData();
    return item;
    }

    // Удаление товара из коллекции
    remove(id) {
    updateData();
    cartData = _.reject(cartData, function(item) {
        return item.id === id;
    });
    saveData();
    return cartData;
    }

    // Изменение количества товара в коллекции
    changeCount(id, delta) {
    let item;
    updateData();
    item = getById(id);
    if(item) {
        item.count = item.count + delta;
        if (item.count < 1) {
            remove(id);
        }
        saveData();
    }
    return getById(id) || {};
    }

    // Возвращаем количество видов товаров в корзине
    getCount(){
    return _.size(cartData);
    }

    // Возвращаем общее количество товаров
    getCountAll(){
    return _.reduce(cartData, function(sum, item) {return sum + item.count}, 0);
    }

    // Возвращаем общую сумму
    getSumma(){
    return _.reduce(cartData, function(sum, item) {return sum + item.count * item.price}, 0);
    }
}



