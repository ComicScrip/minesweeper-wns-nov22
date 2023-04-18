interface Cell {
  val: "💣" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  revealed: boolean;
  backgroundColor: "red" | "green" | "transparent";
  x: number;
  y: number;
}

type Board = Cell[][];

type GameStatus = "won" | "lost" | "inProgress";

function createEmptyBoard(size: number): Board {
  return [];
}

function populateWithBombs(board: Board, bombRatio = 0.2) {
  return [];
}

function getNeighbors(board: Board, cell: Cell): Cell[] {
  return [];
}

function populateWithNeighborsCount(board: Board, bombRatio = 0.2) {
  return [];
}

function generateBoard(size: number, bombRatio = 0.2): Board {
  return [];
}

function revealCell(cell: Cell) {}

function revealAllCell(board: Board) {}

function getGameStatus(board: Board): GameStatus {
  return "inProgress";
}
