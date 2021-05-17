import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const image = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;


const grow = css.resolve`
  * {
    position: relative;
    height: 100%;
  }
`;

export default buildStyleSheet({
  image,
  grow
});