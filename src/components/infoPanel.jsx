import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Timer from './timer.jsx';
import TimeDisplay from './timeDisplay.jsx';


class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameOver: false,
      finishingTime: null,
    };
  }

  render() {
    const { deck, setsFound, wrongClicks, startingTime, startNewGame, solution } = this.props;
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
                  <td>Cards remaining: </td>
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
            </table>
        }
        {
          (deck.length === 0 && solution === null) &&
            <div>
              Game Over!
              <br />
              <br />
              Your Time: <TimeDisplay timeInMillis={new Date().getTime() - startingTime} />
              <br />
              <button onClick={startNewGame}>Start new game</button>
            </div>
        }
      </div>
    );
  }
}

InfoPanel.propTypes = {
  deck: PropTypes.array,
  setsFound: PropTypes.number,
  wrongClicks: PropTypes.number,
  solution: PropTypes.array,
  startingTime: PropTypes.number,
  startNewGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  deck: state.deck,
  setsFound: state.setsFound,
  wrongClicks: state.wrongClicks,
  solution: state.solution,
  startingTime: state.startTime,
});

const mapDispatchToProps = (dispatch) => ({
  startNewGame() {
    return dispatch({ type: 'startGame' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPanel);

