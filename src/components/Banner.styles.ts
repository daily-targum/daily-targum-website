import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const logoWrap = css.resolve`
  * {
    background-color: ${styleHelpers.color("banner")};
    padding: ${styleHelpers.spacing(2)};
    display: flex;
    justify-content: center;
  }
`;


const logo = css.resolve`
  * {
    text-transform: uppercase;
    font-weight: 900;
    font-size: calc(32px + 2vw);
    color: ${styleHelpers.color("primary_contrastText")};
  }
`;


const logoAccent = css.resolve`
  * {
    color: ${styleHelpers.color("accent_main")};
    display: inline;
  }
`;


const legacy = css.resolve`
  * {
    ${styleHelpers.card()}
    margin-bottom: ${styleHelpers.spacing(2)};
  }
`;


export default buildStyleSheet({
  logoWrap,
  logo,
  logoAccent,
  legacy
});