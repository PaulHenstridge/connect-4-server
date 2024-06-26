
export default function checkWin(board, rowIndex, columnIndex, player){
    const playerNumber = player.playerNumber;
    console.log('WIN CHECKING-> ',
    checkHorizontalWin(board,rowIndex, playerNumber),
    checkVerticalWin(board, columnIndex,playerNumber),
    checkDiagonalWin(board, rowIndex, columnIndex, playerNumber))
    
    return (
        checkHorizontalWin(board,rowIndex, playerNumber)
        ||
        checkVerticalWin(board, columnIndex,playerNumber)
        ||
        checkDiagonalWin(board, rowIndex, columnIndex, playerNumber)
    )
};

function checkHorizontalWin(board, rowIndex, player) {
    return board[rowIndex].reduce((acc, value) => {
      if(acc.found) return acc;
      if( value === player){
        acc.count++;
        if( acc.count === 4) {
          acc.found = true;
        }
      } else {
        acc.count = 0;
      }
      return acc;
    },{count:0, found:false }).found;

}
   // check for vertical win
  function checkVerticalWin(board, columnIndex, player) {
  let count = 0;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (board[rowIndex][columnIndex] === player) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
  };
  // check diagonals up to 3 slots away in either direction, on both diagonals
  function checkDiagonalWin(board, rowIndex, columnIndex, player) {
    
    // top-left to bottom-right
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const r = rowIndex + i;
      const c = columnIndex + i;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        if (board[r][c] === player) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
    }

    // top-right to bottom-left
    count = 0;
    for (let i = -3; i <= 3; i++) {
      const r = rowIndex + i;
      const c = columnIndex - i;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        if (board[r][c] === player) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
    }

    return false;
  };