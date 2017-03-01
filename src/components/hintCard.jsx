import React, { PropTypes } from 'react';
import { hintCard as hintCardStyle } from './styles.css';

const HintCard = ({ cardId }) => (
  <div className={hintCardStyle} >
    <img
      style={{ width: '100%' }}
      alt={cardId}
      key={cardId}
      src={`http://185.53.129.19/cards/${cardId}.png`}
    />
  </div>
);

HintCard.propTypes = {
  cardId: PropTypes.string,
};

export default HintCard;
