import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    ${styleHelpers.page()}
    padding-bottom: calc(${styleHelpers.spacing(6)} + 2vw);
  }
`

export default buildStyleSheet({
  page
});