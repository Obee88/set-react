import { get } from 'lodash';
import React from 'react';
import cardsMap from '../cards';
import styles from './Hint.module.css';

interface Props {
  cardId: string,
}

const HintCard = ({ cardId }: Props) => (
  <div className={styles.hintCard} >
    <img
      style={{ width: '100%' }}
      alt={cardId}
      key={cardId}
      src={get(cardsMap, cardId)}
    />
  </div>
);

export default HintCard;
