import { FC } from "react";
import "./Tile.css";

type Props = {
  number: number;
};

const Tile: FC<Props> = ({ number }) => {
  return (
    <div className={`tile ${number % 2 === 0 ? "black-tile" : "white-tile"}`}>
      <img src="assets/images/bishop_b.png" />
    </div>
  );
};

export default Tile;
