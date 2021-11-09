import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import classNames from 'classnames';
import { toggleCardSelected } from '../state/actions';
import { getSelectedCards } from '../state/selectors';
import cardsMap from '../cards';
import styles from './Card.module.css';

interface Props {
  card: string | null;
}

const Card = ({ card }: Props) => {
  const dispatch = useDispatch();
  const onCardClick = (card: string) => dispatch(toggleCardSelected(card));
  const selectedCards = useSelector(getSelectedCards);
  if (!card) {
    return null;
  }
  return (
    <div className={styles.card}>
      <img
        className={classNames({
          [styles.selected]: selectedCards.indexOf(card) >= 0,
        })}
        alt="card"
        src={get(cardsMap, card)}
        onClick={() => onCardClick(card)}
      />
    </div>
  );
};

export default Card;
