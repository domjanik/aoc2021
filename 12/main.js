const fs = require("fs");
const path = fs
  .readFileSync("input.txt", "utf8")
  .split(/\r\n/)
  .map((line) => line.split("-"))
  .map((line) => ({
    start: line[0],
    end: line[1],
  }));

function createCaves(input) {
  let caves = {};
  input.forEach((path) => {
    let startingCave = caves[path.start];
    let endingCave = caves[path.end];
    if (!startingCave) {
      caves[path.start] = {
        name: path.start,
        isSmall: path.start === path.start.toLowerCase(),
        possibleCaves: [path.end],
      };
    } else {
      startingCave.possibleCaves.push(path.end);
    }
    if (!endingCave) {
      caves[path.end] = {
        name: path.end,
        isSmall: path.end === path.end.toLowerCase(),
        possibleCaves: [path.start],
      };
    } else {
      endingCave.possibleCaves.push(path.start);
    }
  });
  return caves;
}

const allPaths = (nodes, canVisitNode) => {
  let paths = [
      { n: "start", finished: false, way: ["start"], smallVisited2x: false },
    ],
    i = 0;
  while (i < paths.length) {
    let path = paths[i];
    if (nodes[path.n].name == "end") {
      path.finished = true;
    } else {
      nodes[path.n].possibleCaves.map(
        (nextCave) =>
          canVisitNode(nodes, nextCave, path.way, path.smallVisited2x) &&
          paths.push({
            n: nextCave,
            finished: false,
            smallVisited2x:
              path.smallVisited2x ||
              (nodes[nextCave].isSmall && path.way.includes(nextCave)),
            way: [].concat(path.way, [nextCave]),
          })
      );
    }
    i++;
  }
  return paths.filter((p) => p.finished).length;
};

function calculatePossiblePaths(input) {
  let caves = createCaves(input);
  return allPaths(caves, (nodes, n, way) => {
    if (nodes[n].name === "start") return false;
    if (!nodes[n].isSmall || nodes[n].name == "end") return true;
    return !way.includes(n);
  });
}

function calculatePossiblePathWithSmallTwice(input) {
  let caves = createCaves(input);
  return allPaths(caves, (nodes, n, way, smallVisited2x) => {
    if (nodes[n].name == "start") return false;
    if (!nodes[n].isSmall || nodes[n].name == "end") return true;
    if (!way.includes(n)) return true;
    return !smallVisited2x && way.lastIndexOf(n) == way.indexOf(n);
  });
}
console.log(
  `Possible paths with visiting small cave only once: ${calculatePossiblePaths(
    path
  )}`
);
console.log(
  `Possible paths with visiting small cave only twice : ${calculatePossiblePathWithSmallTwice(
    path
  )}`
);
