const fs = require('fs');
const fishes = fs.readFileSync('input.txt', 'utf8')
.split(',').map(fish => Number(fish));

function simulateFishLifetime(input, days) {
    let tempFishes = [...input]
    for(let i = 0; i < days; i++) {
        tempFishes = tempFishes.map((fish) => {
            if(fish != 0) {
                return fish = fish - 1;
            } else {
                return fish;
            }
        })
        tempFishes.filter(fish => fish === 0).forEach(fish => {
            fish = 6;
            tempFishes.push(8);
        })
    }

    return tempFishes.length;
}

console.log(simulateFishLifetime(fishes, 80))