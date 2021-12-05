const fs = require('fs');
const vents = fs.readFileSync('input.txt', 'utf8')
.split('\r\n')
.map((data, index) => {
    let coords = data.split(' -> ');
    let ventStart = coords[0].split(',') 
    let ventEnd = coords[1].split(',') 
    return {
        start: { 
            x: Number(ventStart[0]),
            y: Number(ventStart[1])
        },
        end: {
            x: Number(ventEnd[0]),
            y: Number(ventEnd[1])
        }
    }
})
let board;
let crossedPoints;



function prepareBoard() {
    board = [];
    crossedPoints = 0;
}

function drawLines(input, diagonal) {
    for (const vent of input) {
        if (vent.start.x === vent.end.x) {
            for (let y = Math.min(vent.start.y, vent.end.y); y <= Math.max(vent.start.y, vent.end.y); y++) {
                markVent(vent.start.x, y);
            }
        } else if (vent.start.y === vent.end.y) {
            for (let x = Math.min(vent.start.x, vent.end.x); x <= Math.max(vent.start.x, vent.end.x); x++) {
                markVent(x, vent.start.y);
            }
        } else if (diagonal) {
            const stepX = vent.start.x < vent.end.x ? 1 : -1;
            const stepY = vent.start.y < vent.end.y ? 1 : -1;
            for (let i = 0; i <= Math.abs(vent.start.x - vent.end.x); i++) {
                const x = vent.start.x + i * stepX;
                const y = vent.start.y + i * stepY;
                markVent(x, y);
            }
        }
    }

    checkCrossedPoints()
}

function checkCrossedPoints() {
    crossedPoints = board.flat().filter((n) => n > 1).length;
}

function markVent(x, y) {
    if (!board[y]) board[y] = Array(1000).fill(0);
    board[y][x] += 1;
}

function findVents(input) {
    prepareBoard();
    drawLines(input, false);
    return crossedPoints;
}

function findVentsWithDiagonal(input) {
    prepareBoard();
    drawLines(input, true);
    return crossedPoints;
}

console.log("Intercepting lines:", findVents(vents));
console.log("Intercepting lines (also diagonally):", findVentsWithDiagonal(vents));
