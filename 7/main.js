const fs = require('fs');
const crabs = fs.readFileSync('input.txt', 'utf8').split(',').map(crab => Number(crab));

function calcUsedFuel(crab,position) {
    if(crab > position) {
        return crab - position;
    } else {
        return position - crab;
    }
}

function calcCrabPosition(input) {
    const sortedCrabs = [...input].sort((a,b) => a-b);
    const lastCrab = sortedCrabs.pop();
    const board = {};
    let lowestFuelUsage = null;
    for(let boardPosition = 0 ; boardPosition < lastCrab; boardPosition++) {
        board[boardPosition] = 0;
    }
    for(let boardPosition = 0; boardPosition < lastCrab; boardPosition++){
        for(const crab of input) {
            board[boardPosition] += calcUsedFuel(crab, boardPosition);
        }
    }

    Object.keys(board).forEach(key => {
        if(lowestFuelUsage === null || lowestFuelUsage > board[key])
        lowestFuelUsage = board[key];
    })
    
    return lowestFuelUsage;
}

function calcCrabPositionProgressive(input) {
    const sortedCrabs = [...input].sort((a,b) => a-b);
    const lastCrab = sortedCrabs.pop();
    const board = {};
    let lowestFuelUsage = null;
    for(let boardPosition = 0 ; boardPosition < lastCrab; boardPosition++){
        board[boardPosition] = 0;
    }

    for(let boardPosition = 0 ; boardPosition < lastCrab; boardPosition++){
        for(const crab of input) {
            const usedFuel = calcUsedFuel(crab, boardPosition);
            board[boardPosition] += (usedFuel  * (usedFuel + 1)) / 2;
        }
    }
    
    Object.keys(board).forEach(key => {
        if(lowestFuelUsage === null || lowestFuelUsage > board[key])
        lowestFuelUsage = board[key];
    })

    return lowestFuelUsage;
}

console.log(`Fuel needed : ${calcCrabPosition(crabs)}`)
console.log(`Fuel needed in progressive rate : ${calcCrabPositionProgressive(crabs)}`)