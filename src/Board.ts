export type nbNeighbors = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type bomb = "💣";
export type backgroundColor = "red" | "green" | "transparent";

interface Cell {
  val: bomb | nbNeighbors;
  revealed: boolean;
  backgroundColor: backgroundColor;
  x: number;
  y: number;
}

type Board = Cell[][];

type GameStatus = "won" | "lost" | "inProgress";

export function createEmptyBoard(size: number): Board {
  const b = [];
  for (let y = 0; y < size; y += 1) {
    const row: Cell[] = [];
    for (let x = 0; x < size; x += 1) {
      const cell: Cell = {
        val: 0,
        x,
        y,
        revealed: false,
        backgroundColor: "transparent",
      };
      row.push(cell);
    }
    b.push(row);
  }
  return b;
}

export const populateWithBombs = (board: Board, bombRatio = 0.2) => {
  const allCells = board.flat();
  const nbBombs = bombRatio * allCells.length;
  const indexes: number[] = [];
  while (indexes.length < nbBombs) {
    const randomIdx = Math.floor(Math.random() * allCells.length);
    if (!indexes.includes(randomIdx)) {
      allCells[randomIdx].val = "💣";
      indexes.push(randomIdx);
    }
  }

  /*
  const allCells = board.flat();
  const nbBombs = bombRatio * allCells.length;
  const indexes: number[] = allCells.map((_, i) => i);
  for (let i = 0; i < nbBombs; i += 1) {
    const randomIdx = Math.floor(Math.random() * indexes.length);
    const cellIdx = indexes[randomIdx];
    allCells[cellIdx].val = "💣";
    indexes.splice(randomIdx, 1);
  }
  */

  /*
  board.flat().forEach((cell) => {
    if (Math.random() < bombRatio) cell.val = "💣";
  });
  */
};

export function getNeighbors(board: Board, cell: Cell): Cell[] {
  const res: Cell[] = [];

  // TODO

  return res;
}

export function populateWithBombsCount(board: Board) {
  // TODO
}

export function generateBoard(size: number, bombRatio = 0.2): Board {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithBombsCount(b);
  return b;
}

function revealCell(cell: Cell) {}

function revealAllCell(board: Board) {}

function getGameStatus(board: Board): GameStatus {
  return "inProgress";
}
