function calculateN(p, q) {
    return p * q;
}

function calculatePQ(n) {
    let randomPrime1 = randomPrime();
    let randomPrime2 = randomPrime();
    const pandQ = [2];

    while(randomPrime1 * randomPrime2 !== n) {
        console.log('Brute force in action..');
        randomPrime1 = randomPrime();
        randomPrime2 = randomPrime();
        pandQ[0] = randomPrime1;
        pandQ[1] = randomPrime2;
    }

    return pandQ;
}

function randomPrime() {
    let number = Math.floor(Math.random() * 254) + 2;
    while (!isPrimeNumber(number)) {
        console.log(number + ' is not a prime number');
        number = Math.floor(Math.random() * 254) + 2;
    }
    return number;
}

function isPrimeNumber(value) {
    for(let i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

// === TESTS ===
let n = calculateN(17, 131);
console.log('n = ' + n);

const pandQ = calculatePQ(10);
console.log('Found! P = ' + pandQ[0] + ' AND Q = ' + pandQ[1]);


// Formula: M = C^d mod pq

const p = pandQ[0];
const q = pandQ[1];
const e = 3;

const phiOfN = (p - 1) * (q - 1);

for(let k = 0; k < 100; k++) {
    d = (1 + (k * phiOfN)) / e;

    if(Number.isInteger(d)) {
        console.log(d);
        k=100;
    }
}