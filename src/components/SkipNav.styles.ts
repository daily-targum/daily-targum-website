import { css } from 'styled-jsx/css';
import { buildStyleSheet } from '../utils';

const HEIGHT = '55px';


const link = css.resolve`
  * {
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    position: absolute;
    overflow: hidden;
  }

  *:focus {
    padding: 0 1.2rem;
    position: fixed;
    background: white;
    z-index: 1;
    width: auto;
    height: ${HEIGHT};
    line-height: ${HEIGHT};
    outline-color: #000;
  
    background-color: #0366d6;
    background-color: -webkit-focus-ring-color;
    color: #fff;
    z-index: 8000;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }
`;

const content = css.resolve`
  @media print {
    * {
      display: none;
    }
  }
`;

export default buildStyleSheet({
  link,
  content
});