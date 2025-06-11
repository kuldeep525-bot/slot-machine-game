//1.deposit the money.
//2.determine number of lines to bet on
//3.collect a bet amount
//4.spin the sloat machine
//5.check the user won.
//6.give user winning price
//7.play again

const prompt = require("prompt-sync")();

const Rows = 3;
const Cols = 3;

const Symbol_count = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const Symbol_value = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depsitamout = prompt("Enter a desposit Amount:");
    const NumberDespositAmount = parseFloat(depsitamout); //converting string to float value

    if (isNaN(NumberDespositAmount) || NumberDespositAmount <= 0) {
      console.log("invalid depsit amount,try again");
    } else {
      return NumberDespositAmount;
    }
  }
};

//2. step

const getNumberOfLines = () => {
  while (true) {
    const line = prompt("Enter the number of line to bet on (1-3):");
    const numberofline = parseFloat(line); //converting string to float value

    if (isNaN(numberofline) || numberofline <= 0 || numberofline > 3) {
      console.log("invalid number of lines, try again");
    } else {
      return numberofline;
    }
  }
};

//3.collect a bet amount

const getbet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the number bet per line:");
    const numberbet = parseFloat(bet); //converting string to float value

    if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance / lines) {
      console.log("invalid bet, try again");
    } else {
      return numberbet;
    }
  }
};

//4.spin the sloat machine

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(Symbol_count)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];

  for (let i = 0; i < Cols; i++) {
    reels.push([]);
    const reelsymbol = [...symbols];
    for (let j = 0; j < Rows; j++) {
      const randomIndex = Math.floor(Math.random() * reelsymbol.length);
      const selectsymbol = reelsymbol[randomIndex];
      reels[i].push(selectsymbol);
      reelsymbol.splice(randomIndex, 1);
    }
  }

  return reels;
};

//5.check the user won.

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < Rows; i++) {
    rows.push([]);
    for (let j = 0; j < Cols; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printrows = (rows) => {
  for (const row of rows) {
    let rowstring = "";
    for (const [i, symbol] of row.entries()) {
      rowstring += symbol;
      if (i != row.length - 1) {
        rowstring += " | ";
      }
    }
    console.log(rowstring);
  }
};

//6.give user winning price

const getwinning = (rows, bet, lines) => {
  let winning = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allsame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allsame = false;
        break;
      }
    }

    if (allsame) {
      winning += bet * Symbol_value[symbols[0]];
    }
  }

  return winning;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("you have a balance of $ " + balance);
    const numberofline = getNumberOfLines();
    const bet = getbet(balance, numberofline);
    balance -= bet * numberofline;
    const reels = spin();
    const rows = transpose(reels);
    printrows(rows);
    const winnings = getwinning(rows, bet, numberofline);
    balance += winnings;
    console.log("you won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("you ran out of money!");
      break;
    }

    const playagain = prompt("Do you want to play again (y/n)?");

    if (playagain != "y") {
      break;
    }
  }
};

game();
