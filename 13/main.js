const fs = require('fs');
const dots = fs.readFileSync('testDots.txt', 'utf8')
    .split(/\n/)
    .map(lane => lane.split(','))

const folds = fs.readFileSync('testFolds.txt', 'utf8')
    .split(/\n/)
    .map(line => line.replace('fold along ', ''))
    .map(fold => ({
        coord: Number(fold.split('=')[1]),
        axis: fold.split('=')[0]
    }));

const initScreen = (data) => {
    let xs = [];
    let ys = [];
    let screen = [];

    data.map(l => {
        let tmp = l.map(n => parseInt(n));
        xs.push(tmp[0]); ys.push(tmp[1]);
    });
    let rows = Math.max(...ys)
    let columns = Math.max(...xs)
    for (let y = 0; y <= rows; y++) {
        screen[y] = Array(columns + 1).fill('.');
    }
    ys.map((y, i) => screen[y][xs[i]] = '#');

    return screen;
}

function foldBoard(oldScreen, fold) {
    let screen = [];

    if(fold.axis === 'x') {

    } else if(fold.axis === 'y') {
        
    } else {

    }
    return screen;
}

function countDots(dots, folds) {
    let board = initScreen(dots)
    console.log(board)
    folds.map((fold) => {
        board = foldBoard(board, fold);
    })

    return board
}
countDots(dots, folds);