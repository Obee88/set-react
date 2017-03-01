import React, { PropTypes } from 'react';

const HintExplanationPanel = ({ explanationObject }) => (
  <div>
    EXPLANATION:
    <ul>
      {
        Object.keys(explanationObject).map(
          (key) => (<li key={`li-${key}`}>{`${key}: all ${explanationObject[key]}`}</li>)
        )
      }
    </ul>
  </div>
);

HintExplanationPanel.propTypes = {
  explanationObject: PropTypes.object,
};

export default HintExplanationPanel;
