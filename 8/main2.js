
const fs = require('fs');
const digits = fs.readFileSync('input.txt', 'utf8').trim().split(/\n/);

function identifyTopBar(seven, one) {
    return seven.find((bar) => one.indexOf(bar) === -1);
}

function identifyMiddleBar(four, one, encoded) {
    const midPossible = four.filter((bar) => one.indexOf(bar) === -1);
    const midCounts = midPossible.map((possibleBar) =>
        encoded.filter((encodedDigit) => encodedDigit.length === 5)
        .reduce((previousValue, currentValue) => previousValue + currentValue.split("").includes(possibleBar), 0)
    );
    return midCounts[0] === 3 ? midPossible[0] : midPossible[1];
}

function identifyUpperRightBar(one, encoded) { 
    const upperRightPossible = [...one];
    const upperRightCounts = upperRightPossible.map((possibleBar) =>
        encoded.filter((encodedDigit) => encodedDigit.length === 6)
        .reduce((previousValue, currentValue) => previousValue + currentValue.split("").includes(possibleBar), 0)
    );
    return upperRightCounts[0] === 2 ? upperRightPossible[0] : upperRightPossible[1];
}

function identifyUpperLeftBar(four, one, encoded) {
    midPossible = four.filter((possibleBar) => one.indexOf(possibleBar) === -1);
    const midCounts = midPossible.map((possibleBar) =>
        encoded.filter((encodedDigit) => encodedDigit.length === 5)
        .reduce((previousValue, currentValue) => previousValue + currentValue.split("").includes(possibleBar), 0)
    );
    return midCounts[0] === 3 ? midPossible[1] : midPossible[0];
}

function identifyBottomRightBar(one, upperRight) {
    return one[0] === upperRight ? one[1] : one[0];
}

function identifyBottomBar(digitMap, encoded) {
    const bottomPossible = encoded
    .find((encodedDigit) => encodedDigit.length === 7)
    .split("")
    .filter((possibleBar) => [digitMap.top, digitMap.middle, digitMap.upperLeft, digitMap.upperRight, digitMap.bottomRight].indexOf(possibleBar) === -1);
    const bottomCounts = bottomPossible.map((possibleBar) =>
        encoded.filter((encodedDigit) => encodedDigit.length === 5)
        .reduce((previousValue, currentValue) => previousValue + currentValue.split("").includes(possibleBar), 0)
    );
    return bottomCounts[0] === 3 ? bottomPossible[0] : bottomPossible[1];
  
}

function identifyBottomLeftBar(digitMap, encoded) {
    const bottomPossible = encoded
    .find((encodedDigit) => encodedDigit.length === 7)
    .split("")
    .filter((possibleBar) => [digitMap.top, digitMap.middle, digitMap.upperLeft, digitMap.upperRight, digitMap.bottomRight].indexOf(possibleBar) === -1);
    const bottomCounts = bottomPossible.map((possibleBar) =>
        encoded.filter((v) => v.length === 5)
        .reduce((previousValue, currentValue) => previousValue + currentValue.split("").includes(possibleBar), 0)
    );
    return bottomCounts[0] === 3 ? bottomPossible[1] : bottomPossible[0];
}

function createDigitMap(encoded) {
    let digitMap = {
    }

    for (let num of encoded) {
        if(num.length === 2) {
            digitMap[1] = num.split("");
        } else if(num.length === 4) {
            digitMap[4] = num.split("");
        } else if(num.length === 3) {
            digitMap[7] = num.split("");
        } else if(num.length === 7) {
            digitMap[8] = num.split("");
        }
    }

    let dictionary = {
        top: identifyTopBar(digitMap[7], digitMap[1]),
        middle: identifyMiddleBar(digitMap[4], digitMap[1], encoded),
        upperRight: identifyUpperRightBar(digitMap[1], encoded),
        upperLeft: identifyUpperLeftBar(digitMap[4], digitMap[1], encoded),
        bottomRight: null,
        bottomLeft: null,
        bottom: null
    };

    dictionary.bottomRight = identifyBottomRightBar(digitMap[1], dictionary.upperRight);
    dictionary.bottomLeft = identifyBottomLeftBar(dictionary, encoded);
    dictionary.bottom = identifyBottomBar(dictionary, encoded);

    digitMap[0] = [dictionary.top, dictionary.upperRight, dictionary.upperLeft, dictionary.bottomLeft, dictionary.bottomRight, dictionary.bottom];
    digitMap[2] = [dictionary.top, dictionary.upperRight, dictionary.middle, dictionary.bottomLeft, dictionary.bottom];
    digitMap[3] = [dictionary.top, dictionary.upperRight, dictionary.middle, dictionary.bottomRight, dictionary.bottom];
    digitMap[5] = [dictionary.top, dictionary.upperLeft, dictionary.middle, dictionary.bottomRight, dictionary.bottom];
    digitMap[6] = [dictionary.top, dictionary.middle, dictionary.upperLeft, dictionary.bottomLeft, dictionary.bottomRight, dictionary.bottom];
    digitMap[9] = [dictionary.top, dictionary.upperRight, dictionary.upperLeft, dictionary.middle, dictionary.bottomRight, dictionary.bottom];
    Object.keys(digitMap)
        .map(key => digitMap[key] = digitMap[key]
        .sort((a,b) => a > b ? 1 : a < b ? -1 : 0))
        .map((val, index) => digitMap[val.join('')] = index);
    return digitMap;
}

function sumDecodedInputs(input) {
    let summedNumbers = 0;
    input.forEach(element => {
        const output = element.split("|");
        const encoded = output[0].trim().split(" ");
        const digits = output[1].trim().split(" ");
        const digitMap = createDigitMap(encoded);
        const sortedDigits = digits.map(dig => dig.split('').sort((a,b) => a > b ? 1 : a < b ? -1 : 0).join(''));
        let digit = "";
        sortedDigits.map(dig => digitMap[dig]).forEach(dig => digit += dig);
        summedNumbers += Number(digit);
    });
    return summedNumbers
}

console.log(`Sum of decoded inputs : ${sumDecodedInputs(digits)}`);
