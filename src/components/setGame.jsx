import React, { PropTypes } from 'react';
import Table from './table.jsx';
import Indicator from './indicator.jsx';
import HintPanel from './hintPanel.jsx';
import InfoPanel from './infoPanel.jsx';
// import HackActions from './hackActions.jsx';
import { connect } from 'react-redux';


const SetGame = ({ game, startGame }) => (
  <div>
    {
      game.active ? (
        <div>
          <Table />
          <Indicator />
          <div style={{ float: 'left' }} >
            <InfoPanel />
            <HintPanel />
            {/* <HackActions /> */}
          </div>
        </div>
      ) : (
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
  game: state,
});

import { startGame as startGameAction } from '../state/actions';
const mapDispatchToProps = (dispatch) => ({
  startGame() {
    dispatch(startGameAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetGame);
