import { FC } from "react";
import "./Tile.css";

type Props = {
  number: number;
  image?: string;
};

const Tile: FC<Props> = ({ number, image }) => {
  return (
    <div className={`tile ${number % 2 === 0 ? "black-tile" : "white-tile"}`}>
      {image && (
        <div
          className="chess-piece"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
