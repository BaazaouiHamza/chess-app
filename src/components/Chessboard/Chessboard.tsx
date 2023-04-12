import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoradState: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  initialBoradState.push({
    image: `assets/images/rook_${type}.png`,
    x: 0,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/rook_${type}.png`,
    x: 7,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/knight_${type}.png`,
    x: 1,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/knight_${type}.png`,
    x: 6,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 2,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 5,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/king_${type}.png`,
    x: 4,
    y: y,
  });
  initialBoradState.push({
    image: `assets/images/queen_${type}.png`,
    x: 3,
    y: y,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoradState.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  initialBoradState.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

const ChessBoard = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoradState);
  const chessboardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      console.log(element);

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      activePiece.style.left =
        x < minX ? `${minX}` : x > maxX ? `${maxX}px` : `${x}px`;
      activePiece.style.top =
        y < minY ? `${minY}` : y > maxY ? `${maxY}px` : `${y}px`;
    }
  };

  const dropPiece = (e: React.MouseEvent) => {
    if (activePiece) {
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === 0 && p.y === 0) {
            p.x = 5;
          }
          return p;
        });
        return pieces;
      });
      activePiece = null;
    }
  };

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j}.${i}`} number={number} image={image} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default ChessBoard;
