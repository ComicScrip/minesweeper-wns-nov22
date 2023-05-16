export type nbNeighbors = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type bomb = "💣";
export type backgroundColor = "red" | "green" | "transparent";
export type GameStatus = "won" | "lost" | "inProgress";
export interface Cell {
  val: bomb | nbNeighbors;
  revealed: boolean;
  backgroundColor: backgroundColor;
  x: number;
  y: number;
}

export type Board = Cell[][];

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

  if (cell.x < board.length - 1) res.push(board[cell.y][cell.x + 1]); // right
  if (cell.x < board.length - 1 && cell.y < board.length - 1)
    res.push(board[cell.y + 1][cell.x + 1]); // right-down
  if (cell.y < board.length - 1) res.push(board[cell.y + 1][cell.x]); // down
  if (cell.x > 0 && cell.y < board.length - 1)
    res.push(board[cell.y + 1][cell.x - 1]); // left-down
  if (cell.x > 0) res.push(board[cell.y][cell.x - 1]); // left
  if (cell.x > 0 && cell.y > 0) res.push(board[cell.y - 1][cell.x - 1]); // left-up
  if (cell.y > 0) res.push(board[cell.y - 1][cell.x]); // up
  if (cell.y > 0 && cell.x < board.length - 1)
    res.push(board[cell.y - 1][cell.x + 1]); // right up

  return res;
}

export function populateWithBombsCount(board: Board) {
  board.flat().forEach((cell) => {
    if (cell.val !== "💣")
      cell.val = getNeighbors(board, cell).filter((cell) => cell.val === "💣")
        .length as nbNeighbors;
  });
}

export function generateBoard(size: number, bombRatio = 0.2): Board {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithBombsCount(b);
  return b;
}

export function revealCell(cell: Cell) {
  // TODO
}

export function getGameStatus(board: Board): GameStatus {
  // TODO
  return "inProgress";
}
