import { toPairs } from 'lodash';
import React from 'react';
import { ExplanationObject } from '../services/table';

interface Props {
  explanationObject: ExplanationObject,
}

const HintExplanationPanel = ({ explanationObject }: Props) => (
  <div>
    EXPLANATION:
    <ul>
      {
        toPairs(explanationObject).map(
          ([key, value]) => (<li key={`li-${key}`}>{`${key}: all ${value}`}</li>)
        )
      }
    </ul>
  </div>
);

export default HintExplanationPanel;
