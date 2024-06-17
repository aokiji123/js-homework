class Fraction {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.reduce();
    }

    reduce() {
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const divisor = gcd(this.numerator, this.denominator);
        this.numerator /= divisor;
        this.denominator /= divisor;
    }

    static divide(fraction1, fraction2) {
        const newNumerator = fraction1.numerator * fraction2.denominator;
        const newDenominator = fraction1.denominator * fraction2.numerator;
        return new Fraction(newNumerator, newDenominator);
    }

    toString() {
        return `${this.numerator}/${this.denominator}`;
    }
}

const fraction1 = new Fraction(1, 2);
const fraction2 = new Fraction(1, 3);
const fraction3 = new Fraction(8, 12);
const result = Fraction.divide(fraction1, fraction2);
console.log(result.toString()); // 3/2
console.log(fraction3.toString()); // 2/3
