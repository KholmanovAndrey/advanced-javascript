// 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).

// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий)
// и полить майонезом (+20 рублей, +5 калорий).
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Burger {
    constructor(size, ...stuffing){
        this.price = size.price;
        this.calories = size.calories;
        this.stuffing = stuffing;
        console.log(this.price, this.calories);
        this.addTopping();
    }
    addTopping(){
        this.stuffing.forEach(stuf => {
            this.price += stuf.price;
            this.calories += stuf.calories;
            console.log(stuf);
        });
        console.log(this.price, this.calories);
    }
}

const small = {price: 50, calories: 20};
const big = {price: 100, calories: 40};
const cheese = {price: 10, calories: 20};
const herbs = {price: 20, calories: 5};
const potato = {price: 15, calories: 10};
const spice = {price: 15, calories: 0};
const sauce = {price: 20, calories: 5};

const Burger1 = new Burger(small, cheese, spice);
const Burger2 = new Burger(big, herbs, sauce);
const Burger3 = new Burger(big, potato);