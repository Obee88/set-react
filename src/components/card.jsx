import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { card as cardStyle, img as imgStyle, selected as selectedStyle } from './styles.css';

const Card = ({ card, selectedCards, selectDeselectCard, tableWidth, tableHeight }) => {
  let imgClassName = imgStyle;
  if (selectedCards.indexOf(card) >= 0) {
    imgClassName = `${imgClassName} ${selectedStyle}`;
  }
  return (
    <div className={cardStyle} >
      {card ? <img
        className={imgClassName}
        alt="card"
        src={`http://185.53.129.19/set/cards/${card}.png`}
        onClick={() => (selectDeselectCard(card))}
        style={{ maxWidth: tableWidth / 5, maxHeight: tableHeight / 3 }}
      /> : ''}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.string,
  tableWidth: PropTypes.number,
  tableHeight: PropTypes.number,
  selectedCards: PropTypes.array,
  selectDeselectCard: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedCards: state.cards.selectedCards,
});

import { selectDeselectCard as selectDeselectCardAction } from '../state/cards/actions';
const mapDispatchToProps = (dispatch) => ({
  selectDeselectCard(card) {
    dispatch(selectDeselectCardAction(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
