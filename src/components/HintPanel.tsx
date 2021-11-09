import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { requestHint } from '../state/actions';
import { getHintVisible, getSolution } from '../state/selectors';
import { explainSolution } from '../services/table';
import HintCard from './HintCard';
import HintExplanationPanel from './HintExplanationPanel';
import styles from './Hint.module.css';

const HintPanel = () => {
  const dispatch = useDispatch();
  const hintButtonClicked = () => {
    dispatch(requestHint());
  };
  const solution = useSelector(getSolution);
  const hintVisible = useSelector(getHintVisible); 
  return (
    <div className={styles.hintPanel}>
      {
        !hintVisible && <button onClick={hintButtonClicked}>Give me hint</button>
      }
      {
        hintVisible && (
          <div className={classNames(styles.hintCardsWraper, 'well')}>
            {
              solution.map(
                (cardId) => (<HintCard key={cardId} cardId={cardId} />)
              )
            }
            <br />
            <HintExplanationPanel explanationObject={explainSolution(solution)} />
          </div>
        )
      }
    </div>
  );
};

export default HintPanel;
