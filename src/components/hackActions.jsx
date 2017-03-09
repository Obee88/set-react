import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HackActions = ({ shortenDeck, removeGreenFromDeck }) => (
  <div>
    <button onClick={shortenDeck}>Short</button>
    <button onClick={removeGreenFromDeck}>Short</button>
  </div>
);

HackActions.propTypes = {
  shortenDeck: PropTypes.func,
  removeGreenFromDeck: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  shortenDeck() {
    dispatch({ type: 'shortenDeck' });
  },
  removeGreenFromDeck() {
    dispatch({ type: 'removeGreenFromDeck' });
  },
});

export default connect(
  null,
  mapDispatchToProps
)(HackActions);
