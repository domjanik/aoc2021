const fs = require("fs");
const template = fs
    .readFileSync("template.txt", "utf8")
    .split(/\n/)
    .map((lane) => lane.split(" -> "))
    .reduce((previousValue, currentValue) => ({
        ...previousValue,
        [currentValue[0]]: currentValue[1]
    }), {});

const input = fs
    .readFileSync("input.txt", "utf8")

function doInsertion(input, count) {
    let tempPairs = {};
    let pairsCount = {}
    for (let i = 0; i < input.length; i++) {
        if (i !== input.length - 1) {
            pairsCount[input[i] + input[i + 1]] ? pairsCount[input[i] + input[i + 1]]++ : pairsCount[input[i] + input[i + 1]] = 1;
        }
    }
    for (let insertionCount = 0; insertionCount < count; insertionCount++) {
        pairsToCheck = pairsCount;
        for (let pair in pairsToCheck) {
            let left = pair[0] + template[pair];
            let right = template[pair] + pair[1];
            tempPairs[left] ? tempPairs[left] += pairsToCheck[pair] : tempPairs[left] = pairsToCheck[pair];
            tempPairs[right] ? tempPairs[right] += pairsToCheck[pair] : tempPairs[right] = pairsToCheck[pair];
        }
        pairsCount = tempPairs;
        tempPairs = {};
    }

    const elCounts = {
        [input[0]]: 1,
    };
    for (const pair in pairsCount) {
        if (elCounts[pair[1]]) {
            elCounts[pair[1]] = elCounts[pair[1]] + pairsCount[pair]
        }
        else {
            elCounts[pair[1]] = pairsCount[pair]
        }
    }
    return {
        max: Math.max(...Object.values(elCounts)),
        min: Math.min(...Object.values(elCounts))
    };
}

console.time('counting')
let countedElements = doInsertion(input, 40);
console.log(`Most popular element : ${countedElements.max}, least popular element : ${countedElements.min}, diff : ${countedElements.max - countedElements.min}`)
console.timeEnd('counting')