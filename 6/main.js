const fs = require('fs');
const fishes = fs.readFileSync('input.txt', 'utf8')
.split(',').map(fish => Number(fish));

let fishDays = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    freshFishes: 0,
}

function init(input) {
    input.forEach(fish => fishDays[fish]++);
}

function simulateFishLifetime(input, days) {
    init(input)
    for(let day = 0; day < days; day++) {
        for(let fishAge = 0; fishAge< 9; fishAge++) {
            if(fishAge == 0) {
                fishDays.freshFishes = fishDays[0];
            } else {
                fishDays[fishAge-1] = fishDays[fishAge];
            }
        }
        fishDays[8] = fishDays.freshFishes;
        fishDays[6] += fishDays.freshFishes;
        fishDays.freshFishes = 0;
    }

    return Object.keys(fishDays).reduce((previousValue, currentValue) => previousValue + fishDays[currentValue], 0)
}

console.log(`After 80 days there will be : ${simulateFishLifetime(fishes, 80)} fishes`)
console.log(`After 256 days there will be : ${simulateFishLifetime(fishes, 10000)} fishes`)