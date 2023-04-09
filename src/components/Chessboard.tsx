import React from "react";

import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ChessBoard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i;
      board.push(
        <div className={`tile ${number % 2 === 0 ? "black-tile" : "white-tile"}`}>
        </div>
      );
    }
  }
  return <div id="chessboard">{board}</div>;
};

export default ChessBoard;
