const fs = require('fs');
const crabs = fs.readFileSync('input.txt', 'utf8')
.split(',').map(crab => Number(crab));
const testCrabs = [16,1,2,0,4,2,7,1,2,14]
//Most popular position : 8;

function calcCrabPosition(input) {
    let sortedCrabs = input.sort((a,b) => a-b)
    let initialPositionAmount = {}
    sortedCrabs.forEach(element => {
        initialPositionAmount[element] = (initialPositionAmount[element] || 0) + 1
    });
    console.log(initialPositionAmount)
    let mostPopularInitialPositionAmount = Object.keys(initialPositionAmount).map(key => initialPositionAmount[key]).sort((a,b) => a-b).pop();
    let mostPopularInitialPositions = Object.keys(initialPositionAmount).filter(el => initialPositionAmount[el] === mostPopularInitialPositionAmount)
    let mostPopularInitialPosition = mostPopularInitialPositions[0];
    let usedFuel = 0;

    input.forEach(crab => {
        let fuelToUse = 0;
        if(crab > mostPopularInitialPosition) {
            fuelToUse = crab - mostPopularInitialPosition;
        } else {
            fuelToUse = mostPopularInitialPosition - crab;
        }
        usedFuel += fuelToUse
    })

    return usedFuel
}

console.log(calcCrabPosition(crabs))