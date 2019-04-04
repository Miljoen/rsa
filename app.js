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

function gcd_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

// === TESTS ===
let step1 = document.querySelector('.calc-pq');
step1.onclick = function() {
    const start = performance.now();
    const pandQ = calculatePQ(parseInt(document.querySelector("input[name='field1']").value));
    const stop = performance.now();
    const time = stop - start;

    document.querySelector('.p-and-q-result').innerHTML = 'Found! p is ' + pandQ[0] + ' q is ' + pandQ[1] + '<br>' +
        'Amount of time busy finding p and q: ' + parseInt(time) + 'ms';
    document.querySelector('.result-P').value = pandQ[0];
    document.querySelector('.result-Q').value = pandQ[1];
};

let step2 = document.querySelector('.calc-e');
step2.onclick = function() {
    const p = document.querySelector('.result-P').value;
    const q = document.querySelector('.result-Q').value;

    const n = p * q;
    const phiOfN = (p - 1) * (q - 1);
    document.querySelector('.phi-result').innerHTML = 'n is ' + n + '<br>' + 'Phi(n) is ' + phiOfN;

    let e = 0;
    for (x = 2; x < phiOfN; x++) {
        if (gcd_two_numbers(x, phiOfN) === 1) {
            e = x;
            x = phiOfN;
        }
    }

    document.querySelector('.result-E-label').innerHTML = 'e is ' + e;
    document.querySelector('.result-E').value = e.toString();
};

let encryptedMessageSpaced = '';
let step3 = document.querySelector('.calc-C');
step3.onclick = function() {
    const mString = document.querySelector('.result-M').value;
    const n = document.querySelector('.result-N').value;

    let m = null;
    let c = null;
    let encryptedMessage = '';
    for (let i = 0; i < mString.length; i++) {
        let mCharacter = mString.charAt(i);
        m = mCharacter.charCodeAt(0);

        c = Math.pow(m, 7) % n;
        encryptedMessage += c.toString();
        encryptedMessageSpaced += ' ' + c.toString();
    }

    document.querySelector('.result-C-label').innerHTML = 'Message after encryption is: ' + encryptedMessage;


};

// let n = calculateN(17, 131);
// console.log('n = ' + n);

// const pandQ = calculatePQ(10);
// console.log('Found! P = ' + pandQ[0] + ' AND Q = ' + pandQ[1]);
//
//
// // Formula: M = C^d mod pq
//
// const p = pandQ[0];
// const q = pandQ[1];
// const e = 3;
//
// const phiOfN = (p - 1) * (q - 1);
//
// for(let k = 0; k < 100; k++) {
//     d = (1 + (k * phiOfN)) / e;
//
//     if(Number.isInteger(d)) {
//         console.log(d);
//         k=100;
//     }
// }