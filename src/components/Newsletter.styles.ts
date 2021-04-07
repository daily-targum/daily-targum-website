import { css } from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const section = css.resolve`
  * {
    padding-top: ${styleHelpers.spacing(12)};
    padding-bottom: ${styleHelpers.spacing(12)};
  }
`;


const inner = css.resolve`
  * {
    ${styleHelpers.flex('column')};
    justify-content: center;
    align-items: center;
  }
`;


const text = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(2)};
    text-align: center;
  }
`;


export default buildStyleSheet({
  section,
  inner,
  text
});