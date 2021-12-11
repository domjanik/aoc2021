const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split('')
                .map(octopus => Number(octopus)));

let flashes = 0;
let boardSize = input.length;
let steps = 0;

const every = (callback, box = {y:[0, boardSize-1], x:[0, boardSize-1]}) => {
    for (let y = box.y[0]; y <= box.y[1]; y++) for (let x = box.x[0]; x <= box.x[1]; x++)
        (x >= 0 && y >= 0 && x < boardSize && y < boardSize) && callback(x, y, input[y][x])
}

function markNewFlashes(data) {
    let flashable = false;
    every((x,y,d) => {
        if (isNaN(d) || d <= 9) return;
        flashes++;
        data[y][x] = 'flash';
        flashable = true;
    })
    return flashable;
}

function megaFlash(data) {
    return data.reduce((previousValue, currentValue) => [...previousValue,...currentValue], []).every(octopus => octopus == 0)
}

function step(data) {
    steps++;
    every((x,y) => data[y][x]++);
    while (markNewFlashes(data)) {
        every((x,y, octopus) => {
            if (octopus != 'flash') return;
            every((u,v,q) => !isNaN(q) && data[v][u]++, {x:[x-1, x+1], y:[y-1, y+1]})
            data[y][x] = 'd';
        })
    }
    every((x,y,octopus) => (octopus == 'd') && (data[y][x] = 0));
    return data;
}

function countFlashes(data, stepsToDo) {
    let tempData = [...data];

    for(let i = 0; i < stepsToDo; i++) {
        tempData = step(tempData);
    }
    return flashes;
}

function findSyncedFlashStep(data) {
    let tempData = [...data];

    do {
        tempData = step(tempData);
    } while (!megaFlash(tempData)) 
    return steps;
}
console.log(`Flashes in 100 steps : ${countFlashes(input, 100)} ${1683 === flashes}`)
console.log(`Steps to make synced flash : ${findSyncedFlashStep(input)} ${steps === 788}`);