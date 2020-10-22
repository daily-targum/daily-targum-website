import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const bannerWrap = css.resolve`
  * {
    ${styleHelpers.flex('row')}
    justify-content: center;
    overflow: hidden;
  }

  @media print {
    * {
      display: none;
    }
  }
`;


const dev = css.resolve`
  * {
    background-color: #eee;
  }
`;


export default buildStyleSheet({
  bannerWrap,
  dev
});