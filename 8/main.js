const fs = require('fs');
const digits = fs.readFileSync('input.txt', 'utf8').trim().split(/\n/);

function checkEasyDigitsOnDisplay(input) {
    let easyDigits = 0;
    input.forEach(element => {
        const output = element.split(' | ')[1];
        output.split(' ').forEach(num => {
            if(num.length === 2 || num.length === 3 || num.length === 7 || num.length === 4) {
                easyDigits++;
            }
        })
    });
    return easyDigits
}

console.log(`Count easy numbers on display : ${checkEasyDigitsOnDisplay(digits)}`);
