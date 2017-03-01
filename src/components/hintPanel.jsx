import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HintCard from './hintCard.jsx';
import { hintPanel as hintPanelStyle, hintCardsWraper as hintCardsWraperStyle } from './styles.css';
import { requestHint } from '../state/cards/actions';
import { explainSolution } from '../services/table';
import HintExplanationPanel from './hintExplanationPanel.jsx';

const HintPanel = ({ hintButtonClicked, solution }) => (
  <div className={hintPanelStyle}>
    {
      solution.length === 0 && <button onClick={hintButtonClicked}>Give me hint</button>
    }
    {
      solution.length > 0 && (
        <div className={`${hintCardsWraperStyle} well`}>
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

HintPanel.propTypes = {
  solution: PropTypes.array,
  hintButtonClicked: PropTypes.func,
};

const mapStateToProps = (state) => ({
  solution: state.cards.solution,
});

const mapDispatchToProps = (dispatch) => ({
  hintButtonClicked() {
    dispatch(requestHint());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HintPanel);
