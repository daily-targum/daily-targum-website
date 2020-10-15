import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const footer = css.resolve`
  * {
    padding: ${styleHelpers.spacing(5, 0)};
    background-color: ${styleHelpers.color('primary_main')};
    border-top: 1px solid ${styleHelpers.color('divider')};
  }
`;

const logo = css.resolve`
  * {
    width: 180px;
    height: auto;
    margin-bottom: ${styleHelpers.spacing(3)};
  }
`;

const sublogo = css.resolve`
  * {
    width: 135px;
    height: auto;
    margin-bottom: ${styleHelpers.spacing(3)};
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      padding: ${styleHelpers.spacing(0, 0, 3)};
    }
  }
`;


const copyright = css.resolve`
  * {
    ${styleHelpers.flex('column')};
    color: ${styleHelpers.color('primary_contrastTextMuted')};
    font-size: 0.85rem;
    font-weight: 300;
    padding-bottom: env(safe-area-inset-bottom);
    margin-top: ${styleHelpers.spacing(4)};
    text-align: center;
    justify-content: center;
  }
`;


const title = css.resolve`
  * {
    color: ${styleHelpers.color('primary_contrastText')};
    text-align: center;
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      margin: ${styleHelpers.spacing(2.75, 0)};
    }
  }
`;


const link = css.resolve`
  * {
    margin: ${styleHelpers.spacing(2, 0)};
    text-decoration: none;
    color: ${styleHelpers.color('primary_contrastTextMuted')};
    text-align: center;
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      margin: ${styleHelpers.spacing(2.75, 0)};
    }
  }
`;


const centerHorizontally = css.resolve`
  * {
    ${styleHelpers.flex('column')};
    text-align: center;
    align-items: center;
  }
`;

const col = css.resolve`
  *{
    margin: ${styleHelpers.spacing(3, 0)};
  }
`;


const fakeUl = css.resolve`
 * {
  ${styleHelpers.flex('column')};
 }
`;

export default buildStyleSheet({
  footer,
  logo,
  sublogo,
  copyright,
  title,
  link,
  centerHorizontally,
  col,
  fakeUl
});