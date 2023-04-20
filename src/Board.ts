interface Cell {
  val: "💣" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  revealed: boolean;
  backgroundColor: "red" | "green" | "transparent";
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

function populateWithBombs(board: Board, bombRatio = 0.2) {}

function getNeighbors(board: Board, cell: Cell): Cell[] {
  return [];
}

function populateWithNeighborsCount(board: Board, bombRatio = 0.2) {
  return [];
}

export function generateBoard(size: number, bombRatio = 0.2): Board {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  return b;
}

function revealCell(cell: Cell) {}

function revealAllCell(board: Board) {}

function getGameStatus(board: Board): GameStatus {
  return "inProgress";
}
