import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const Players={
  x: 'player 1',
  o: 'player 2'
}
const INITIAL_GAME_BOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'x';
  
      if (gameTurns.length > 0 && gameTurns[0].player === 'x') {
        currentPlayer = 'o';
      }
      return currentPlayer;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD .map((array => [...array]))];


  for (const turn of gameTurns) {
   const {square, player} = turn;
   const { row, col } = square;

   gameBoard[row][col] = player; 
}
return gameBoard;
}


function deriveWinner(gameBoard,players){
  let winner; 
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column]
  
  if (firstSquareSymbol && 
    firstSquareSymbol === secondSquareSymbol &&
    firstSquareSymbol === thirdSquareSymbol
    )
    {
      winner = players[firstSquareSymbol ];
    }
  }
  return winner;
}

function App() {
  const [players,setPlayers] = useState(Players)
  const [gameTurns,setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns); 

  
const gameBoard = deriveGameBoard(gameTurns);
const winner = deriveWinner(gameBoard,players);
const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
        const currentPlayer = derivedActivePlayer(prevTurns); 
      
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
  
      return updatedTurns;
    });
  }
  
function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol,newName){
   setPlayers(prevPlayers =>{
    return{
      ...prevPlayers,
      [symbol] : newName
    }
   }
    )
}
  return (
 <main>
  <div id="game-container">
  <ol id="players" className="highlight-player ">
    <Player 
    initiaName={Players.x}
    symbol="x" 
     isActive={activePlayer === 'x'}
     onChangeName={handlePlayerNameChange}
     />
    <Player 
    initiaName={Players.o }
    symbol="o" 
    isActive={activePlayer === 'o'}
    onChangeName={handlePlayerNameChange}
    />

  </ol>
  {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner} />}

  <GameBoard 
  onSelectSquare={handleSelectSquare} 
  board = {gameBoard}
  />
  </div>
  <Log turns = {gameTurns}   />
 </main>

  )
}

export default App
