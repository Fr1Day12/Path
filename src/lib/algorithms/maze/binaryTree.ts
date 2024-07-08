import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/createWall";
import { destroyWall } from "../../../utils/destroyWall";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (disabled: boolean) => void,
  speed: SpeedType
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  for (const row of grid) {
    for (const tile of row) {
      if (tile.row % 2 === 0 || tile.col % 2 === 0) {
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          tile.isWall = true;
        }
      }
    }
  }

  for (let r = 1; r < MAX_ROWS; r += 2) {
    for (let c = 1; c < MAX_COLS; c += 2) {
      if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
        continue;
      } else if (r === MAX_ROWS - 2) {
        await destroyWall(grid, r, c, 1, speed);
      } else if (c === MAX_COLS - 2) {
        await destroyWall(grid, r, c, 0, speed);
      } else {
        await destroyWall(grid, r, c, getRandInt(0, 2), speed);
      }
    }
  }
  setIsDisabled(false);
};
