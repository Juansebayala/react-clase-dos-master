import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

const CurrentPlayer = ({ player, show }) => {
  return (
    <div className={cx('current-player', { 'current-player--hidden': show })}>
      <span>{`It's the turn of player: ${player}`}</span>
    </div>
  );
};

const Square = ({ data, value, onClick = () => {} }) => {
  return (
    <div data-square={data} onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = (tiles) => {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i];
    if (tiles[a] === tiles[b] && tiles[a] === tiles[c] && tiles[a] !== '') {
      return tiles[a];
    }
  }

  return null;
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = useState(false);
  const [areTilesFull, setAreTilesFull] = useState(false);

  const setTileTo = (tileIndex, player) => {
    player = currentPlayer;
    const dataTile = tileIndex.nativeEvent.target.dataset.square;
    const tilesModified = tiles.map((value, index) => {
      if (Number(dataTile) === index) {
        value = player;
      }
      return value;
    });

    setTiles(tilesModified);

    setCurrentPlayer(player === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    let count = 0;
    tiles.forEach((value) => {
      if (value !== '') {
        count++;
      }
    });

    if (count === 9) {
      setAreTilesFull(true);
    }

    if (areTilesFull || winner != null) {
      setGameEnded(true);
    }
  }, [tiles, areTilesFull, winner]);

  const restart = () => {
    setTiles(['', '', '', '', '', '', '', '', '']);
    setCurrentPlayer('X');
    setAreTilesFull(false);
    setGameEnded(false);
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState('X');

  return (
    <div className="tictactoe">
      <CurrentPlayer player={currentPlayer} show={gameEnded} />
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      <div className="tictactoe-row">
        <Square data="0" value={tiles[0]} onClick={setTileTo} />
        <Square data="1" value={tiles[1]} onClick={setTileTo} />
        <Square data="2" value={tiles[2]} onClick={setTileTo} />
      </div>
      <div className="tictactoe-row">
        <Square data="3" value={tiles[3]} onClick={setTileTo} />
        <Square data="4" value={tiles[4]} onClick={setTileTo} />
        <Square data="5" value={tiles[5]} onClick={setTileTo} />
      </div>
      <div className="tictactoe-row">
        <Square data="6" value={tiles[6]} onClick={setTileTo} />
        <Square data="7" value={tiles[7]} onClick={setTileTo} />
        <Square data="8" value={tiles[8]} onClick={setTileTo} />
      </div>
    </div>
  );
};
export default TicTacToe;
