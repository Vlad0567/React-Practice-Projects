import { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);


    const checkWinner = (currentBoard: (string | null)[]) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
            [0, 4, 8], [2, 4, 6] // Диагонали
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return currentBoard[a];
            }
        }
        return null;
    };


    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) setWinner(gameWinner);
    };


    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="container">
            <h2>Крестики-нолики</h2>
            <div className="board">
                {board.map((cell, index) => (
                <button key={index} className="cell" onClick={() => handleClick(index)}>
                    {cell}
                </button>
                ))}
            </div>
            {winner ? <p className="winner">Победитель: {winner} 🎉</p> : <p>Ходит: {isXNext ? "X" : "O"}</p>}
            <button className="reset" onClick={resetGame}>Новая игра</button>
        </div>
    );
};

export default TicTacToe;
