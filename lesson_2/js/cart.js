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

// Получаем данные
function updateData() {
    cartData = JSON.parse(localStorage.getItem('cart')) || []; // вроде должно писаться так, но нужно еще с JSON разобраться
    return cartData;
}

// Возвращаем данные
function getData() {
    return cartData;
}

// Сохраняем данные в localStorage
function saveData() {
    localStorage.setItem('cart', JSON.stringify(cartData));
    return cartData;
}

// Очищаем данные
function clearData() {
    cartData = [];
    saveData();
    return cartData;
}

// Поиск объекта в коллекции cartData по id
function getById(id) {
    return _.findWhere(cartData, {id: id});
}

// Добавление товара в коллекцию. Одинаковые товары не дублируются, а складываются.
function add(item) {
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
function remove(id) {
    updateData();
    cartData = _.reject(cartData, function(item) {
        return item.id === id;
    });
    saveData();
    return cartData;
}

// Изменение количества товара в коллекции
function changeCount(id, delta) {
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
function getCount() {
    return _.size(cartData);
}

// Возвращаем общее количество товаров
function getCountAll() {
    return _.reduce(cartData, function(sum, item) {return sum + item.count}, 0);
}

// Возвращаем общую сумму
function getSumma() {
    return _.reduce(cartData, function(sum, item) {return sum + item.count * item.price}, 0);
}
