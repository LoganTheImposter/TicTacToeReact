import React, { useState } from "react";
import "./App.css";

const initialState = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState("א");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const nextPlayer = currentPlayer === "א" ? "𐒀" : "א";
    setCurrentPlayer(nextPlayer);

    const winnerPlayer = checkWinner(newBoard);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
    }
  };

  const handleRestart = () => {
    setBoard(initialState);
    setCurrentPlayer("א");
    setWinner(null);
  };

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  return (
    <div className="container">
    <div className="app">
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
    </div>
  );
}

export default App;
