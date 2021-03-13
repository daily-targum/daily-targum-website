import { css } from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    flex: 1;
  }
`;

const section = css.resolve`
  * {
    margin: ${styleHelpers.spacing(4)} 0;
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      margin: 0 0 ${styleHelpers.spacing(4)};
    }
  }

  @media ${styleHelpers.printMediaQuery('xs', 'md')} {
    * {
      margin: 0 0 ${styleHelpers.spacing(4)};
    }
  }
`;

const description = css.resolve`
  * {
    ${styleHelpers.flex('column')}
    align-items: flex-start;
    justify-content: center;
    padding: 0 ${styleHelpers.spacing(2)};
    flex: 1;
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    padding: ${styleHelpers.spacing(2)};
  }

  @media ${styleHelpers.printMediaQuery('xs', 'md')} {
    padding: ${styleHelpers.spacing(2)};
  }
`;

const centerHorizontally = css.resolve`
  * {
    ${styleHelpers.flex('row')}
    justify-content: center;
  }
`;

const hideButton = css.resolve`
  * {
    ${styleHelpers.hideButton()}
  }
`;

export default buildStyleSheet({
  page,
  section,
  description,
  centerHorizontally,
  hideButton
});