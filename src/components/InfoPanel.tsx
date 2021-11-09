import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timer from './Timer';
import TimeDisplay from './TimeDisplay';
import { startGame } from '../state/actions';
import { getDeck, getSetsFound, getSolution, getStartTime, getWrongClicks } from '../state/selectors';
import styles from './styles.module.css';

const InfoPanel = () => {
  const dispatch = useDispatch();
  const startNewGame = () => {
    return dispatch(startGame());
  };
  const deck = useSelector(getDeck);
  const setsFound = useSelector(getSetsFound);
  const wrongClicks = useSelector(getWrongClicks);
  const solution = useSelector(getSolution);
  const startingTime = useSelector(getStartTime);
  return (
    <div className="well" >
      {
        !(deck.length === 0 && solution === null) &&
          <table>
            <tbody>
              <tr>
                <td>Time: </td>
                <td><Timer /></td>
              </tr>
              <tr>
                <td>Cards remaining:&nbsp;&nbsp;</td>
                <td>{deck.length}</td>
              </tr>
              <tr>
                <td>Sets found:</td>
                <td>{setsFound}</td>
              </tr>
              <tr>
                <td>Mistakes:</td>
                <td>{wrongClicks}</td>
              </tr>
            </tbody>
            <button onClick={startNewGame} className={styles.restartButton}>Restart</button>
          </table>
      }
      {
        (deck.length === 0 && solution === null) &&
          <div>
            Game Over!
            <br />
            <br />
            Your Time: <TimeDisplay timeInMillis={new Date().getTime() - (startingTime || 0)} />
            <br />
            <button onClick={startNewGame}>Start new game</button>
          </div>
      }
    </div>
  );
};

export default InfoPanel;

