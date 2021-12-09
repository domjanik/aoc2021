const fs = require('fs');
const map = fs.readFileSync('input.txt', 'utf8')
    .split(/\n/)
    .map(line => line.split("").map(digit => Number(digit)));


function checkIfLowPoint(y, x, input) {
    const adjacentNumbers = []
    if(y > 0) {
        adjacentNumbers.push(input[y-1][x])
    } 
    if(y + 1 < input.length) {
        adjacentNumbers.push(input[y+1][x])
    }
    if(x > 0) {
        adjacentNumbers.push(input[y][x-1])
    } 
    if(input[y].length > x + 1) {
        adjacentNumbers.push(input[y][x+1])
    }
    return Math.min(...adjacentNumbers) > input[y][x];
}

function findLowPoints(input) {
    let lowPoints = []
    for(let lineIndex = 0; lineIndex < input.length; lineIndex++) {
        for(let levelIndex = 0; levelIndex < input[lineIndex].length; levelIndex++) {
            const isLowPoint = checkIfLowPoint(lineIndex, levelIndex, input);
            if(isLowPoint) {
                lowPoints.push({
                    value: input[lineIndex][levelIndex],
                    y: lineIndex,
                    x: levelIndex
                });
            }
        }
    }


    return lowPoints;
}

function summarizeRiskLevels(lowPoints) {
    return lowPoints.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0) + lowPoints.length;
}
const lowPoints = findLowPoints(map);

function createBasin(point, input) {
    let x = point.x;
    let y = point.y;
    let adjacentNumbers = [];
    if(y > 0 && input[y-1][x] != 9) {
        adjacentNumbers.push({
            value: input[y-1][x],
            y: y-1,
            x
        });
    } 
    if(y + 1 < input.length && input[y+1][x] != 9) {
        adjacentNumbers.push({
            value: input[y+1][x],
            y: y+1,
            x
        });
    }
    if(x > 0 && input[y][x-1] != 9) {
        adjacentNumbers.push({
            value: input[y][x-1],
            y,
            x: x-1
        });
    } 
    if(input[y].length > x + 1 && input[y][x+1] != 9) {
        adjacentNumbers.push({
            value: input[y][x+1],
            y,
            x: x+1
        });
    }

    return adjacentNumbers
}

function findBasins(lowPoints, input) {
    let basins = [];
    lowPoints.forEach((point) => {
        let basin = createBasin(point, input);
        let newlyAdded = basin;
        do {
            let addToBasin = [];
            newlyAdded.forEach(basinPoint => {
                let adjecentPoints = createBasin(basinPoint, input);
                let validPoints = adjecentPoints.filter(point => !newlyAdded.find(addedPoint => addedPoint.x == point.x && addedPoint.y === point.y) && 
                !basin.find(addedPoint => addedPoint.x == point.x && addedPoint.y === point.y) && 
                !addToBasin.find(addedPoint => addedPoint.x == point.x && addedPoint.y === point.y));
                addToBasin = [...addToBasin, ...validPoints];
            });
            basin = [...basin, ...addToBasin];
            newlyAdded = addToBasin;
        } while(newlyAdded.length != 0);
        basins.push(basin);
    })

    return basins;
}
const basins = findBasins(lowPoints, map);
function summarizeBasinSize(basins) {
    let basinSizes = basins.map(basin => basin.length).sort((a,b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
}
console.log(`Summarized Low Points Risk Levels : ${summarizeRiskLevels(lowPoints)}`);
console.log(`Multiplied basin sizes : ${summarizeBasinSize(basins)}`);
