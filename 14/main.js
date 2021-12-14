const fs = require("fs");
const template = fs
    .readFileSync("testTemplate.txt", "utf8")
    .split(/\n/)
    .map((lane) => lane.split(" -> "))
    .reduce((previousValue, currentValue) => ({
        ...previousValue,
        [currentValue[0]]: currentValue[1]
    }), {});

const input = fs
    .readFileSync("testInput.txt", "utf8")

function doInsertion(input, count) {
    let transformedInput = input.split('');
    let chunkSize = 2;
    for (let insertionCount = 0; insertionCount < count; insertionCount++) {
        for (let i = 0; i <= transformedInput.length; i += chunkSize) {
            let chunk = transformedInput[i] + transformedInput[i + 1];
            let chunkInsertionEffect = template[chunk];
            if (chunkInsertionEffect) {
                transformedInput.splice(i + 1, 0, chunkInsertionEffect);
            }
        }
    }

    return transformedInput;
}

function countElements(input) {
    let elements = {};
    input.forEach(elem => {
        elements[elem] ? elements[elem]++ : elements[elem] = 1;
    })
    return {
        max: Math.max(...Object.values(elements)),
        min: Math.min(...Object.values(elements))
    };
}

console.time('counting')
let transformedPolymer = doInsertion(input, 40);
console.log(`Result: ${transformedPolymer}`)
let countedElements = countElements(transformedPolymer)
console.log(`Most popular element : ${countedElements.max}, least popular element : ${countedElements.min}, diff : ${countedElements.max - countedElements.min}`)
console.timeEnd('counting')