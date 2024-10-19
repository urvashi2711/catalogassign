const fs = require('fs');

function lagrangeInterpolation(points) {
    let secret = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let li = 1;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (0 - xj) / (xi - xj);
            }
        }
        secret += yi * li;
    }

    return Math.round(secret);
}


function decodeValue(value, base) {
    return parseInt(value, base);
}


function processTestCase(fileName) {
    const rawData = fs.readFileSync(fileName);
    const data = JSON.parse(rawData);

    const points = [];
    const keys = data.keys;
    const n = keys.n;
    const k = keys.k;


    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = parseInt(i);
            const base = parseInt(data[i].base);
            const y = decodeValue(data[i].value, base);
            points.push({ x, y });
        }
    }

    const secret = lagrangeInterpolation(points.slice(0, k));

    console.log(`The secret (constant term 'c') for ${fileName} is: ${secret}`);
}

processTestCase('testcase1.json');
processTestCase('testcase2.json');
