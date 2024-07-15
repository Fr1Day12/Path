import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

const Grid = ({
  isValuelizationRunningRef,
}: {
  isValuelizationRunningRef: MutableRefObject<boolean>;
}) => {
  const { grid, setGrid } = usePathfinding();

  const [isMouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isValuelizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isValuelizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isValuelizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center border-sky-300 mt-10",

        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,

        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
          MAX_COLS * 8
        }px] w-[${MAX_COLS * 7}px]`
      )}>
      {grid.map((r, i) => (
        <div key={i} className="flex">
          {r.map((tile, tileIndex) => {
            const { row, col, isStart, isEnd, isPath, isTraversed, isWall } =
              tile;
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isStart={isStart}
                isEnd={isEnd}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
