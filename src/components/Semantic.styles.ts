import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const printLogo = css.resolve`
  * {
    display: none;
  }
  
  @media print {
    * {
      display: flex;
      ${styleHelpers.lockWidth('100px')};
      padding: ${styleHelpers.spacing(2, 0)};
    }
  }
`;


export default buildStyleSheet({
  printLogo
});