const fs = require('fs');
const dots = fs.readFileSync('testInput.txt', 'utf8')
    .split(/\n/)
    .map(line => ({
        x: Number(line.split(",")[0]),
        y: Number(line.split(",")[1])
    }));

const folds = fs.readFileSync('testFolds.txt', 'utf8')
    .split(/\n/)
    .map(line => line.replace('fold along ', ''))
    .map(fold => ({
        coord: fold.split('=')[1],
        axis: fold.split('=')[0]
    }));


function findBoardSize(dots) {
    return ({
        x: Math.max(...dots.map(dot => dot.x)),
        y: Math.max(...dots.map(dot => dot.y)),
    })
}

function createBoard(boardSize, dots) {
    let board = Array(boardSize.y + 1).fill(Array(boardSize.x + 1).fill('.'));
    return board;
}

function countDots(dots, folds) {
    let boardSize = findBoardSize(dots);
    let board = createBoard(boardSize, dots);
    console.log(dots);

    dots.forEach((dot) => {
        console.log(dot);
        board[dot.y][dot.x] = '#'
    });
    console.log(board)
    return 0
}
countDots(dots, folds);