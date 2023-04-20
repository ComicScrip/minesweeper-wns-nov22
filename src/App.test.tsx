import { createEmptyBoard } from "./Board";

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
