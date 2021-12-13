const { count } = require('console');
const fs = require('fs');
const dots = fs.readFileSync('testInput.txt', 'utf8')
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

    for (let y = 0, rows = Math.max(...ys), cols = Math.max(...xs); y <= rows; y++) {
        screen[y] = Array(cols + 1).fill('.');
    }
    ys.map((y, i) => screen[y][xs[i]] = '#');

    return screen;
}

function foldBoard(oldScreen, rule, foldId, screen = []) {
    oldScreen.forEach((row, y) => {
        if (rule.axis == 'x') {
            screen[y] = Array(rule.coord).fill(0);
         } else {
            if (y < rule.coord) {
                screen[y] = Array(oldScreen[0].length).fill(0);
            }
        }
        row.forEach((d, x) => {
            if (d == 0) {
                return
            };
            if (rule.axis == 'x') {
                if (x < rule.coord) {
                    screen[y][x] = 1;
                 } else {
                    screen[y][oldScreen[0].length-x-1] = 1;
                 }
            } else {
                if (y < rule.coord) {
                    screen[y][x] = 1;
                } else {
                    console.log(oldScreen.length-y-1);
                    console.log(x);
                    screen[oldScreen.length-y-1][x] = 1;
                }
            }
        })
    })

    if (foldId == 0) console.log(screen.reduce((a, b) => a.concat(b)).reduce((acc, p) => acc+p));
    return screen;
}

function countDots(dots, folds) {
    let board = initScreen(dots)
    console.log(folds)
    folds.map((fold, index) => {
        board = foldBoard(board, fold, index);
    })

    return board
}
countDots(dots, folds);