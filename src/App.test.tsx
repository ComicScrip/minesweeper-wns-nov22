import {
  Cell,
  backgroundColor,
  bomb,
  createEmptyBoard,
  getGameStatus,
  getNeighbors,
  nbNeighbors,
  populateWithBombsCount,
  revealCell,
} from "./Board";

describe("createEmptyBoard", () => {
  it("creates an array of arrays of objects with correct values", () => {
    const b = createEmptyBoard(2);
    expect(b.length).toBe(2);
    expect(b[0].length).toBe(2);
    expect(b[1].length).toBe(2);
    const commonProps = {
      val: 0,
      backgroundColor: "transparent",
      revealed: false,
    };
    expect(b).toEqual([
      [
        { ...commonProps, x: 0, y: 0 },
        { ...commonProps, x: 1, y: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1 },
        { ...commonProps, x: 1, y: 1 },
      ],
    ]);
  });
});

describe("getNeigbors", () => {
  it("sould return the proper neighbors", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const b = [
      [
        { ...commonProps, x: 0, y: 0 },
        { ...commonProps, x: 1, y: 0 },
        { ...commonProps, x: 2, y: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1 },
        { ...commonProps, x: 1, y: 1 },
        { ...commonProps, x: 2, y: 1 },
      ],
      [
        { ...commonProps, x: 0, y: 2 },
        { ...commonProps, x: 1, y: 2 },
        { ...commonProps, x: 2, y: 2 },
      ],
    ];

    // left up
    expect(new Set(getNeighbors(b, b[0][0]))).toEqual(
      new Set([b[0][1], b[1][1], b[1][0]])
    );

    // center up
    expect(new Set(getNeighbors(b, b[0][1]))).toEqual(
      new Set([b[0][2], b[1][2], b[1][1], b[1][0], b[0][0]])
    );

    // right up
    expect(new Set(getNeighbors(b, b[0][2]))).toEqual(
      new Set([b[1][2], b[1][1], b[0][1]])
    );

    // left middle
    expect(new Set(getNeighbors(b, b[1][0]))).toEqual(
      new Set([b[1][1], b[2][1], b[2][0], b[0][0], b[0][1]])
    );

    // center middle
    expect(new Set(getNeighbors(b, b[1][1]))).toEqual(
      new Set([
        b[1][2],
        b[2][2],
        b[2][1],
        b[2][0],
        b[1][0],
        b[0][0],
        b[0][1],
        b[0][2],
      ])
    );

    // right middle
    expect(new Set(getNeighbors(b, b[1][2]))).toEqual(
      new Set([b[2][2], b[2][1], b[1][1], b[0][1], b[0][2]])
    );

    // left down
    expect(new Set(getNeighbors(b, b[2][0]))).toEqual(
      new Set([b[2][1], b[1][0], b[1][1]])
    );

    // center down
    expect(new Set(getNeighbors(b, b[2][1]))).toEqual(
      new Set([b[2][2], b[1][2], b[1][1], b[1][0], b[2][0]])
    );

    // right down
    expect(new Set(getNeighbors(b, b[2][2]))).toEqual(
      new Set([b[2][1], b[1][1], b[1][2]])
    );
  });
});

describe("populateWithBombsCount", () => {
  it("should populate the board with the number of bombs surrounding each cell that is not a bomb itself", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const board = [
      [
        { ...commonProps, x: 0, y: 0, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 0 },
        { ...commonProps, x: 2, y: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 1 },
        { ...commonProps, x: 2, y: 1 },
      ],
      [
        { ...commonProps, x: 0, y: 2 },
        { ...commonProps, x: 1, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 2, y: 2 },
      ],
    ];

    const expectedBoard = [
      [
        { ...commonProps, x: 0, y: 0, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 0, val: 2 },
        { ...commonProps, x: 2, y: 0, val: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 1, val: 3 },
        { ...commonProps, x: 2, y: 1, val: 1 },
      ],
      [
        { ...commonProps, x: 0, y: 2, val: 2 },
        { ...commonProps, x: 1, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 2, y: 2, val: 1 },
      ],
    ];
    populateWithBombsCount(board);
    expect(board).toEqual(expectedBoard);
  });
});

describe("revealCell", () => {
  it("should change background color and reveled status according to the cell's val", () => {
    const cell: Cell = {
      val: 0,
      backgroundColor: "transparent",
      revealed: false,
      x: 0,
      y: 0,
    };

    revealCell(cell);
    expect(cell.revealed).toBe(true);
    expect(cell.backgroundColor).toBe("green");

    const bomb: Cell = {
      val: "💣",
      backgroundColor: "transparent",
      revealed: false,
      x: 0,
      y: 0,
    };

    revealCell(bomb);
    expect(bomb.revealed).toBe(true);
    expect(bomb.backgroundColor).toBe("red");
  });
});

describe("getGameStatus", () => {
  it("should return in progress when not lost nor won", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const b = [
      [
        { ...commonProps, x: 0, y: 0, revealed: true },
        { ...commonProps, x: 1, y: 0, revealed: true },
        { ...commonProps, x: 2, y: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 1 },
        { ...commonProps, x: 2, y: 1, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 2 },
        { ...commonProps, x: 2, y: 2 },
      ],
    ];

    expect(getGameStatus(b)).toBe("inProgress");
  });

  it("should return lost if one bomb has been revealed", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const b = [
      [
        { ...commonProps, x: 0, y: 0, revealed: true },
        { ...commonProps, x: 1, y: 0, revealed: true },
        { ...commonProps, x: 2, y: 0 },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb, revealed: true },
        { ...commonProps, x: 1, y: 1 },
        { ...commonProps, x: 2, y: 1, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 2 },
        { ...commonProps, x: 2, y: 2 },
      ],
    ];

    expect(getGameStatus(b)).toBe("lost");
  });

  it("should return lost if one bomb has been revealed, even if all non-bombs have been revealed", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const b = [
      [
        { ...commonProps, x: 0, y: 0, revealed: true },
        { ...commonProps, x: 1, y: 0, revealed: true },
        { ...commonProps, x: 2, y: 0, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb, revealed: true },
        { ...commonProps, x: 1, y: 1, revealed: true },
        { ...commonProps, x: 2, y: 1, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 2, revealed: true },
        { ...commonProps, x: 2, y: 2, revealed: true },
      ],
    ];

    expect(getGameStatus(b)).toBe("lost");
  });

  it("should return won if every cell that is not a bomb has been revealed", () => {
    const commonProps = {
      val: 0 as nbNeighbors,
      backgroundColor: "transparent" as backgroundColor,
      revealed: false,
    };

    const b = [
      [
        { ...commonProps, x: 0, y: 0, revealed: true },
        { ...commonProps, x: 1, y: 0, revealed: true },
        { ...commonProps, x: 2, y: 0, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 1, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 1, revealed: true },
        { ...commonProps, x: 2, y: 1, revealed: true },
      ],
      [
        { ...commonProps, x: 0, y: 2, val: "💣" as bomb },
        { ...commonProps, x: 1, y: 2, revealed: true },
        { ...commonProps, x: 2, y: 2, revealed: true },
      ],
    ];

    expect(getGameStatus(b)).toBe("won");
  });
});
