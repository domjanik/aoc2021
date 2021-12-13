const fs = require("fs");
const dots = fs
  .readFileSync("dots.txt", "utf8")
  .split(/\n/)
  .map((lane) => lane.split(","));

const folds = fs
  .readFileSync("folds.txt", "utf8")
  .split(/\n/)
  .map((line) => line.replace("fold along ", ""))
  .map((fold) => ({
    coord: Number(fold.split("=")[1]),
    axis: fold.split("=")[0],
  }));

const initScreen = (data) => {
  let xs = [];
  let ys = [];
  let screen = [];

  data.map((l) => {
    let tmp = l.map((n) => parseInt(n));
    xs.push(tmp[0]);
    ys.push(tmp[1]);
  });
  let rows = Math.max(...ys);
  let columns = Math.max(...xs);
  for (let y = 0; y <= rows; y++) {
    screen[y] = Array(columns + 1).fill(".");
  }
  ys.map((y, i) => (screen[y][xs[i]] = "#"));

  return screen;
};

function foldBoard(oldScreen, fold, foldId) {
  let screen = [];
  if (fold.axis === "x") {
    for (let i = 0; i < oldScreen.length; i++) {
      screen[i] = new Array(fold.coord - 1).fill(".");
    }
    oldScreen.forEach((row, yIndex) => {
      row.forEach((x, xIndex) => {
        if (xIndex < fold.coord) {
          screen[yIndex][xIndex] = oldScreen[yIndex][xIndex];
        } else if (xIndex === fold.coord) {
          return;
        } else {
          let diff = row.length - xIndex - 1;
          screen[yIndex][diff] =
            oldScreen[yIndex][xIndex] === "#"
              ? oldScreen[yIndex][xIndex]
              : oldScreen[yIndex][diff];
        }
      });
    });
  } else if (fold.axis === "y") {
    for (let i = 0; i < fold.coord; i++) {
      screen[i] = new Array(oldScreen[0].length).fill(".");
    }
    oldScreen.forEach((row, index) => {
      if (index < fold.coord) {
        screen[index] = row;
      } else if (index === fold.coord) {
        return;
      } else {
        let diff = index - fold.coord;
        row.forEach((x, xIndex) =>
          x === "#" ? (screen[fold.coord - diff][xIndex] = "#") : null
        );
      }
    });
  }
  return screen;
}

function countDots(dots, folds) {
  let board = initScreen(dots);
  folds.map((fold, index) => {
    board = foldBoard(board, fold, index);
  });

  return board;
}

console.table(
  countDots(dots, folds)
    .map((row) => row.map((dot) => (dot === "#" ? "░" : ".")).join(""))
    .join("\n")
);
