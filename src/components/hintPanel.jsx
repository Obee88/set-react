import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HintCard from './hintCard.jsx';
import { hintPanel as hintPanelStyle, hintCardsWraper as hintCardsWraperStyle } from './styles.css';
import { requestHint } from '../state/actions';
import { explainSolution } from '../services/table';
import HintExplanationPanel from './hintExplanationPanel.jsx';

const HintPanel = ({ hintButtonClicked, solution, hintVisible }) => (
  <div className={hintPanelStyle}>
    {
      !hintVisible && <button onClick={hintButtonClicked}>Give me hint</button>
    }
    {
      hintVisible && (
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
  hintVisible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  solution: state.solution,
  hintVisible: state.hintVisible,
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
