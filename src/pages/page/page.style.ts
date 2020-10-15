import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    ${styleHelpers.page()}
  }
`

export default buildStyleSheet({
  page
});