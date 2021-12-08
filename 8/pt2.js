const fs = require('fs');
const digits = fs.readFileSync('input.txt', 'utf8').trim().split(/\n/);
// 968175 

function identifyTopBar(seven, one) {
    const splittedOne = one.split('');
    return seven.split('').filter(bar => splittedOne.indexOf(bar) === -1);
}

function identifyMiddleBar(four, one, encoded) {
    const possibleMidBars = four.split("").filter((c) => !one.split("").includes(c));
    const midCounts = possibleMidBars.map((d) =>
        encoded.split(" ").filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
    );
    return midCounts[0] === 3 ? possibleMidBars[0] : possibleMidBars[1];
}

function identifyUpperRightBar(four, one, encoded) { 
    const possibleMidBars = four.split("").filter((c) => !one.split("").includes(c));
    const midCounts = possibleMidBars.map((d) =>
        encoded.split(" ").filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
    );
    return midCounts[0] === 3 ? possibleMidBars[1] : possibleMidBars[0];
}

function identifyUpperLeftBar(one, encoded) {
    const dUpperRightPossible = [...one];
    const dUpperRightCounts = dUpperRightPossible.map((d) =>
      encoded.split(" ").filter((v) => v.length === 6).reduce((acc, e) => acc + e.split("").includes(d), 0)
    );
    return dUpperRightCounts[0] === 2 ? dUpperRightPossible[0] : dUpperRightPossible[1];
}
function identifyBottomRightBar(one, encoded, dUpperRight) {
    const dUpperRightPossible = [...one];
    const dUpperRightCounts = dUpperRightPossible.map((d) =>
      encoded.split(" ").filter((v) => v.length === 6).reduce((acc, e) => acc + e.split("").includes(d), 0)
    );
    return one[0] === dUpperRight ? one[1] : one[0];
}
function identifyBottomBar(map, encoded) {
    const dBottomPossible = encoded.split(" ")
    .find((v) => v.length === 7)
    .split("")
    .filter((c) => !map.includes(c));
  const dBottomCounts = dBottomPossible.map((d) =>
    encoded.split(" ").filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
  );
  return dBottomCounts[0] === 3 ? dBottomPossible[0] : dBottomPossible[1];
}

function identifyBottomLeftBar(map, encoded) {
    console.log(`map : ${map}`)
    console.log(encoded)
    const dBottomPossible = encoded.split(" ")
    .find((v) => v.length === 7)
    .split("")
    .filter((c) => !map.includes(c));
    const dBottomCounts = dBottomPossible.map((d) =>
    encoded.split(" ").filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
    );
    return dBottomCounts[0] === 3 ? dBottomPossible[1] : dBottomPossible[0];
}

function decodeHarderNumber(line) {
    return '_'
}

function decodeDigits(input, encoded) {
    let map = {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
    }

    for (let num of input.split(' ')) {
        if(num.length === 2) {
            map[1] = num;
        } else if(num.length === 4) {
            map[4] = num;
        } else if(num.length === 3) {
            map[7] = num;
        } else if(num.length === 7) {
            map[8] = num;
        }
    }
    let dictionary = [];
    let topBar = identifyTopBar(map[7], map[1]);
    dictionary.push(topBar)
    let middleBar = identifyMiddleBar(map[4], map[1], encoded);
    dictionary.push(middleBar)

    let upperRightBar = identifyUpperRightBar(map[4], map[1], encoded);
    dictionary.push(upperRightBar)

    let upperLeftBar = identifyUpperLeftBar(map[1], encoded);
    dictionary.push(upperLeftBar)

    let bottomRightBar = identifyBottomRightBar(map[1], encoded, upperRightBar);
    dictionary.push(bottomRightBar)
    
    let bottomLeftBar = identifyBottomLeftBar(dictionary, encoded);
    dictionary.push(bottomLeftBar)

    let bottomBar = identifyBottomBar(dictionary, encoded);
    dictionary.push(bottomBar)

    console.log(`top : ${topBar}`);
    console.log(`mid : ${middleBar}`);
    console.log(`bottom left : ${bottomLeftBar}`);
    console.log(`bottom : ${bottomBar}`);
    console.log(`bottom right : ${bottomRightBar}`);
    console.log(`upper left : ${upperLeftBar}`);
    console.log(`upper right : ${upperRightBar}`);
}

function sumDecodedInputs(input) {
    let summedNumbers = 0;
    input.forEach(element => {
        const outputs = element.split(' | ');
        const output = outputs[1];
        let testNumber = Array(4);
        let digitsMap = decodeDigits(outputs[0], outputs[1])

        output.split(' ').forEach((num, index) => {
            if(num.length === 2) {
                testNumber.push(1);
            } else if(num.length === 4) {
                testNumber.push(4);
            } else if(num.length === 3) {
                testNumber.push(7);
            } else if(num.length === 7) {
                testNumber.push(8);
            } else {
                testNumber.push(decodeHarderNumber(num))
            }
        })
        // summedNumbers += Number(testNumber.join(''));
    });
    return summedNumbers
}

console.log(`Sum of decoded inputs : ${sumDecodedInputs(digits)}`);
