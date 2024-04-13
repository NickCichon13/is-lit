import React, {useState} from "react";
import cells from './cells';
import './board.css';

function Board({numrows = 5, numcols = 5, chanceLightStartsOn = 0.25}) {
    const [board, setBoard] = useState(createBoard);
  
    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
      return Array.from({length: numrows}).map(
          row => Array.from({length: numcols}).map(
              cell => Math.random() < chanceLightStartsOn
        )
    );
}

    function hasWon () {
        return board.every(row => row.every(cell => !cell));
    }

    function flipCellsAround(around) {
        setBoard(firstBoard => {
            const [ x, y ] = around.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                if (x >= 0 && x < numcols && y >= 0 && numrows){
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            }

            const boardCopy = firstBoard.map(row => [...row]);

                flipCell(y, x, boardCopy);
                flipCell(y, x - 1, boardCopy);
                flipCell(y, x + 2, boardCopy);
                flipCell(y - 1, x, boardCopy);
                flipCell(y + 1, x, boardCopy);

                return boardCopy;
        });
    }

    if(hasWon()) {
        return <div> you Win!</div>;
    }

    let tableBoard = [];

    for (let y = 0; y < numrows; y++) {
        let row = [];
        for (let x = 0; x < numcols; x++) {
            let around = `${y}-${x}`;
            row.push(
                <cell
                    key={around}
                    islit={board[y][x]}
                    flipCellsAroundMe={evt => flipCellsAround(around)} />
            );
        }
        tableBoard.push(<tr key={y}></tr>);
    }

    return (
        <table className="Board">
            <tbody>{tableBoard}</tbody>
        </table>
    )

}
