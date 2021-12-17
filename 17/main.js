const fs = require("fs");
const input = fs
    .readFileSync("input.txt", "utf8")
    .replace('target area: x=', '')
    .replaceAll('..', ',')
    .replace(', y=', ',')
    .split(',')
    .map(value => Number(value))
let inputCoords = {
    xMin: input[0],
    xMax: input[1],
    yMin: input[2],
    yMax: input[3]
}

function throwProbe(xVelocity, yVelocity, data) {
    let x = 0;
    let y = 0;
    let maxY = -999;
    let validThrow = false;

    while (x <= data.xMax && y >= data.yMin) {
        x += xVelocity;
        y += yVelocity;
        maxY = Math.max(maxY, y);
        xVelocity -= xVelocity > 0 ? 1 : 0;
        yVelocity--;

        if (x >= data.xMin && x <= data.xMax && y >= data.yMin && y <= data.yMax) {
            validThrow = true;
            break;
        };
    }

    return validThrow ? maxY : null;
}

function findHighestY(data) {
    let highestY = -999;
    let tryCounter = 0;

    for (let rowIndex = data.yMin; rowIndex < 999; rowIndex++) {
        for (let colIndex = data.xMax; colIndex > 0; colIndex--) {
            let throwResult = throwProbe(colIndex, rowIndex, data);
            if (throwResult != null) {
                tryCounter++;
                highestY = Math.max(highestY, throwResult);
            }
        }
    }
    return {
        highest: highestY,
        validTryCount: tryCounter
    };
}
let findHighestYResult = findHighestY(inputCoords)
console.log(`Highest y you can get : ${findHighestYResult.highest}`)
console.log(`Possible velocities : ${findHighestYResult.validTryCount}`)