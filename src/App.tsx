import { useState } from "react";
import { generateBoard, getGameStatus, revealCell } from "./Board";
import { produce } from "immer";

function App() {
  const [board, setBoard] = useState(generateBoard(5));
  const [isCheating, setIsCheating] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => {
          setBoard(generateBoard(5));
          setGameOver(false);
        }}
      >
        Reload
      </button>
      <button
        onClick={() => {
          setIsCheating((c) => !c);
        }}
      >
        {isCheating ? "Stop cheating" : "Cheat"}
      </button>
      <table style={{ opacity: gameOver ? 0.7 : 1 }}>
        <tbody>
          {board.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map((cell) => {
                  return (
                    <td
                      style={{ backgroundColor: cell.backgroundColor }}
                      key={`${cell.y}-${cell.x}`}
                      onClick={() => {
                        const newBoard = produce(board, (draft) => {
                          revealCell(draft[cell.y][cell.x]);
                        });
                        setBoard(newBoard);

                        const status = getGameStatus(newBoard);

                        if (status !== "inProgress") {
                          alert(`you ${status}`);
                          setGameOver(true);
                        }
                      }}
                    >
                      {cell.revealed || gameOver || isCheating ? cell.val : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
