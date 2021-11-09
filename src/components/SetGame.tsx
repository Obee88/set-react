import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import HintPanel from './HintPanel';
import InfoPanel from './InfoPanel';
import { startGame as startGameAction } from '../state/actions';
import { getActive } from '../state/selectors';

interface Props {
  autoStart?: Boolean;
}

const defaultProps = {
  autoStart: false,
};


const SetGame = ({ autoStart }: Props) => {
  const dispatch = useDispatch();
  const active = useSelector(getActive);
  const startGame = () => {
    dispatch(startGameAction());
  };
  useEffect(
    () => {
      if (autoStart) {
        startGame();
      }
    }, []
  );
  return (
    <div>
      {
        active ? (
          <div>
            <Table />
            <div style={{ float: 'left' }} >
              <InfoPanel />
              <HintPanel />
            </div>
          </div>
        ) : (
          <button onClick={startGame}>Start game</button>
        )
      }
    </div>
  );
};

SetGame.defaultProps = defaultProps;

export default SetGame;
