import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const button = css.resolve`
  * {
    ${styleHelpers.hideButton()};
    ${styleHelpers.hideLink()};
    padding: ${styleHelpers.spacing(2, 8)};
    background-color: ${styleHelpers.color("accent_main")};
    border-radius: ${styleHelpers.roundness(1)};
    color: ${styleHelpers.color("accent_contrastText")};
    font-size: 1.3rem;
  }
`;


const textButton = css.resolve`
  * {
    color: ${styleHelpers.color("accent_main")};
    cursor: pointer;
    ${styleHelpers.hideButton()};
  }
`;


export default buildStyleSheet({
  button,
  textButton
});