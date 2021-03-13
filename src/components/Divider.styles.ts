import { css } from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const divider = css.resolve`
  * {
    width: 100%;
    border: none;
    border-top: 1px solid ${styleHelpers.color("divider")};
  }
`;


const dividerVertical = css.resolve`
  * {
    height: 100%;
    width: 1px;
    background-color: ${styleHelpers.color("divider")};
    border: none;
    padding: 0;
    margin: 0;
  }
`;


export default buildStyleSheet({
  divider,
  dividerVertical
});