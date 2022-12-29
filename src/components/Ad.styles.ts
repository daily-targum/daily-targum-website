import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const bannerWrap = css.resolve`
  * {
    ${styleHelpers.flex('row')}
    justify-content: center;
    overflow: hidden;
    width: 85%;
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