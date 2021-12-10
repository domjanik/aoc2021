const fs = require('fs');
const brackets = fs.readFileSync('testInput.txt', 'utf8')
    .split(/\n/)
    .map(line => line.split(""));

const bracketPoints = {
    ">": 25137,
    "]": 57,
    "}": 1197,
    ")": 3,
    "<": 4,
    "[": 2,
    "{": 3,
    "(": 1,
};

function findMatchingBracket(bracket) {
    switch (bracket) {
        case ">":
            return "<"
        case "]":
            return "["
        case "}":
            return "{"
        case ")":
            return "("
    }
}

function parse(lines) {
    return lines.map(line =>
        line.reduce(
            ([openBrackets, invalidBrackets], currentChar) => {
                if (findMatchingBracket(currentChar)) {
                    if (findMatchingBracket(currentChar) !== openBrackets.pop()) {
                        invalidBrackets.push(currentChar);
                    }
                } else {
                    openBrackets.push(currentChar);
                }
                return [openBrackets, invalidBrackets];
            },
            [[], []]
        )
    );
}

function findMissingClosingBrackets(input) {
    return parse(input)
        .map(([openBrackets, invalidBrackets]) => invalidBrackets.shift())
        .filter(Boolean)
        .map(bracket => bracketPoints[bracket])
        .reduce((summedPoints, bracketPoints) => summedPoints + bracketPoints);
}

function autoCompleteBracketsMiddleScore(input) {
    return parse(input)
        .filter(([openBrackets, invalidBrackets]) => !invalidBrackets.length)
        .map(([openBrackets]) =>
            openBrackets.map(bracket => bracketPoints[bracket]).reverse().reduce((summedPoints, bracketPoints) => summedPoints * 5 + bracketPoints, 0)
        )
        .sort((a, b) => a - b)
        .find((_, index, array) => index === array.length >> 1);
}

console.log(`Missing closing brackets points : ${findMissingClosingBrackets(brackets)}`);
console.log(`Middle score : ${autoCompleteBracketsMiddleScore(brackets)}`);