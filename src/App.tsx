import { useState } from "react";
import { generateBoard, getGameStatus, revealCell } from "./Board";
import { produce } from "immer";

function App() {
  const [board, setBoard] = useState(generateBoard(5));
  const [isCheating, setIsCheating] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => {
          setBoard(generateBoard(5));
        }}
      >
        Reload
      </button>
      <table>
        <tbody>
          {board.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map((cell) => {
                  return (
                    <td
                      key={`${cell.y}-${cell.x}`}
                      style={{ backgroundColor: cell.backgroundColor }}
                      onClick={() => {
                        const newBoard = produce(board, (draft) => {
                          revealCell(draft[cell.y][cell.x]);
                        });
                        console.log({ newBoard });

                        setBoard(newBoard);

                        const gameStatus = getGameStatus(newBoard);
                        if (gameStatus !== "inProgress") {
                          alert(`you ${gameStatus}`);
                          //revealAllCell();
                        }
                      }}
                    >
                      {isCheating || cell.revealed ? cell.val : ""}
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
