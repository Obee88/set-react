import React, { PropTypes } from 'react';
import { hintCard as hintCardStyle } from './styles.css';

const HintCard = ({ cardId }) => (
  <div className={hintCardStyle} >
    <img
      style={{ width: '100%' }}
      alt={cardId}
      key={cardId}
      src={`http://62.75.160.163/cards/${cardId}.png`}
    />
  </div>
);

HintCard.propTypes = {
  cardId: PropTypes.string,
};

export default HintCard;
