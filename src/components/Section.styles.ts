import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const section = css.resolve`
  * {
    ${styleHelpers.flex('column')}
    width: 100%;
    align-items: center;
    padding-right: calc(${styleHelpers.spacing(1.25)} + 1vw);
    padding-left: calc(${styleHelpers.spacing(1.25)} + 1vw);
  }

  @media print {
    * {
      padding: 0;
    }
  }
`;

const inside = css.resolve`
  * {
    width: 100%;
    max-width: calc(1000px + 22vw);
  }

  @media print {
    * {
      padding: 0;
    }
  }
`;


const offsetPadding = css.resolve`
  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      margin-right: calc((${styleHelpers.spacing(1.25)} + 1vw) * -1);
      margin-left: calc((${styleHelpers.spacing(1.25)} + 1vw) * -1);
    }
  }

  @media print {
    * {
      margin: 0;
    }
  }
`;

export default buildStyleSheet({
  section,
  inside,
  offsetPadding
});