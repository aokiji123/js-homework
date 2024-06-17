// 1
let age = prompt("Please, enter your age:");
age = parseInt(age);

if (isNaN(age) || age < 0) {
    alert("Please, enter a valid age.");
} else {
    if (age >= 0 && age < 12) {
        alert("You are a child.");
    } else if (age >= 12 && age < 18) {
        alert("You are a teenager.");
    } else if (age >= 18 && age < 60) {
        alert("You are an adult.");
    } else {
        alert("You are a senior.");
    }
}

// 2
let year = prompt("Please, enter a year:");
year = parseInt(year);

if (isNaN(year) || year <= 0) {
    alert("Please enter a valid year.");
} else {
    let isLeapYear = false;

    if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
        isLeapYear = true;
    }

    if (isLeapYear) {
        alert(`${year} is a leap year.`);
    } else {
        alert(`${year} is not a leap year.`);
    }
}

// 3
let amount = prompt("Enter the amount of USD:");
amount = parseFloat(amount);

if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount.");
} else {
    let currency = prompt("Enter the currency (EUR, UAH, AZN):").toUpperCase();
    const exchangeRates = {
        EUR: 0.85,
        UAH: 27.5,
        AZN: 1.7
    };

    if (exchangeRates[currency] !== undefined) {
        let convertedAmount = amount * exchangeRates[currency];
        alert(`${amount} USD equals ${convertedAmount.toFixed(2)} ${currency}.`);
    } else {
        alert("Invalid currency.");
    }
}
