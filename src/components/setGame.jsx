import React, { PropTypes } from 'react';
import Table from './table.jsx';
import { connect } from 'react-redux';

const SetGame = ({ game, startGame }) => (
  <div>
    {
      game.active ? (<Table />) : (
        <button onClick={startGame}>Start game</button>
      )
    }
  </div>
);

SetGame.propTypes = {
  game: PropTypes.object,
  startGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

import { fillTable as fillTableAction } from '../state/cards/actions';
import { startGame as startGameAction } from '../state/game/actions';
const mapDispatchToProps = (dispatch) => ({
  startGame() {
    dispatch(fillTableAction());
    dispatch(startGameAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetGame);
