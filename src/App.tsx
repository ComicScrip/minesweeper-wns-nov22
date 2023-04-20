import { useState } from "react";
import { generateBoard } from "./Board";

function App() {
  const [board, setBoard] = useState(generateBoard(5));

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
                  return <td key={`${cell.y}-${cell.x}`}>{cell.val}</td>;
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
