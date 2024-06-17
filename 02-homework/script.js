// 1
let name = prompt("Please, enter your name:");
console.log(`Hello, ${name}!`);

// 2
const currentYear = 2024;
let birthYear = prompt("Please, enter your birth year:");
let age = currentYear - birthYear;
console.log(`You are ${age} years old.`);

// 3
let money = prompt("Please, enter the amount of money in your wallet:");
let chocolatePrice = prompt("Please, enter the price of a chocolate bar:");
let chocolateAmount = Math.floor(money / chocolatePrice);
let change = money % chocolatePrice;
console.log(`You can buy ${chocolateAmount} chocolate bars and your change will be ${change} UAH.`);
