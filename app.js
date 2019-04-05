function calculateN(p, q) {
    return p * q;
}

function calculatePhiOfN(p, q) {
    return (p - 1) * (q - 1);
}

function calculatePQ(n) {
    let randomPrime1 = randomPrime();
    let randomPrime2 = randomPrime();
    const pandQ = [2];

    while(randomPrime1 * randomPrime2 !== n) {
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

function calculateD(phiOfN, e) {
    let d = null;
    let k = 2;

    for(k; k < phiOfN; k++) {
        d = (1 + (k * phiOfN)) / e;

        if (Number.isInteger(d)) {
            break;
        }
    }

    if (k === phiOfN) {
        return 0;
    }

    return d;
}

// ========================================================= TESTS =============================================
let step1 = document.querySelector('.calc-pq');
step1.onclick = function() {
    const n = parseInt(document.querySelector("input[name='field1']").value);
    const start = performance.now();
    const pandQ = calculatePQ(n);
    const stop = performance.now();
    const time = stop - start;

    document.querySelector('.p-and-q-result').innerHTML = 'Found! p is ' + pandQ[0] + ' q is ' + pandQ[1] + '<br>' +
        'Amount of time busy finding p and q: ' + parseInt(time) + 'ms';
    document.querySelector('.result-P').value = pandQ[0];
    document.querySelector('.result-Q').value = pandQ[1];
    document.querySelector('.decrypt-N').value = n;
};

let step2 = document.querySelector('.calc-e');
step2.onclick = function() {
    const p = document.querySelector('.result-P').value;
    const q = document.querySelector('.result-Q').value;

    const n = calculateN(p, q);
    const phiOfN = calculatePhiOfN(p, q);
    document.querySelector('.phi-result').innerHTML = 'n is ' + n + '<br>' + 'Phi(n) is ' + phiOfN;

    let e = [];
    for (x = 2; x < phiOfN; x++) {
        if (gcd_two_numbers(x, phiOfN) === 1) {
            e.push(x);
        }
    }

    let selectE = document.querySelector(".select-E");
    for(let i = 0; i < e.length; i++) {
        let opt = e[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectE.appendChild(el);
    }

    e = e[0];

    document.querySelector('.result-E-label').innerHTML = 'e is ' + e;
    document.querySelector('.result-E').value = e.toString();
    document.querySelector('.decrypt-E').value = e.toString();
};

let step3 = document.querySelector('.calc-C');
step3.onclick = function() {
    const mString = document.querySelector('.result-M').value;
    const n = document.querySelector('.result-N').value;
    const e = document.querySelector('.result-E').value;

    let m = null;
    let c = null;
    let encryptedMessage = '';
    for (let i = 0; i < mString.length; i++) {
        let mCharacter = mString.charAt(i);
        m = mCharacter.charCodeAt(0);

        c = Math.pow(m, e) % n;
        if (i !== mString.length-1) {
            encryptedMessage += c.toString() + ',';
        } else {
            encryptedMessage += c.toString();
        }
    }

    document.querySelector('.result-C-label').innerHTML = 'Message after encryption is: ' + encryptedMessage;
    document.querySelector('.result-C').value =     encryptedMessage;
};

let step4 = document.querySelector('.calc-D');
step4.onclick = function() {
    const n = document.querySelector('.decrypt-N').value;
    const e = document.querySelector('.decrypt-E').value;

    const pandQ = calculatePQ(parseInt(n));

    const p = pandQ[0];
    const q = pandQ[1];

    const phiOfN = calculatePhiOfN(p, q);

    const d = calculateD(phiOfN, e);

    document.querySelector('.result-D-label').innerHTML = 'D is ' + d;
    document.querySelector('.result-D').value = d;
};

let step5 = document.querySelector('.calc-M');
step5.onclick = function() {
    const cStringArray = document.querySelector('.result-C').value.split(',');
    const d = BigInt(document.querySelector('.result-D').value);
    const n = document.querySelector('.decrypt-N').value;
    const pandQ = calculatePQ(parseInt(n));
    const p = BigInt(pandQ[0]);
    const q = BigInt(pandQ[1]);

    let decryptedString = '';
    cStringArray.forEach(function (c) {
        c = BigInt(c);
        let m = BigInt(0);
        m = (c**d)%(p * q);
        let decryptedCharacter = String.fromCharCode(parseInt(m));
        decryptedString += decryptedCharacter;
    });

    document.querySelector('.result-M-label').innerHTML = 'Message after decryption is: ' + decryptedString;
};