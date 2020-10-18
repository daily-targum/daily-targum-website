import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const footer = css.resolve`
  * {
    padding-top: ${styleHelpers.spacing(8)};
    padding-bottom: ${styleHelpers.spacing(8)};
    background-color: ${styleHelpers.color('primary_main')};
    border-top: 1px solid ${styleHelpers.color('divider')};
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      padding-top: ${styleHelpers.spacing(4)};
      padding-bottom: ${styleHelpers.spacing(4)};
    }
  }
`;

const logo = css.resolve`
  * {
    width: 180px;
    height: auto;
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      margin: ${styleHelpers.spacing(3, 0)};
    }
  }
`;

const sublogo = css.resolve`
  * {
    margin-left: ${styleHelpers.spacing(3)};
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
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      text-align: center;
      align-items: center;
      margin-bottom: ${styleHelpers.spacing(3)};
    }
  }
`;


const title = css.resolve`
  * {
    display: block;
    color: ${styleHelpers.color('primary_contrastText')};
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      margin: ${styleHelpers.spacing(2.75, 0)};
      text-align: center;
    }
  }
`;


const link = css.resolve`
  * {
    margin: ${styleHelpers.spacing(2, 0)};
    text-decoration: none;
    color: ${styleHelpers.color('primary_contrastTextMuted')};
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      margin: ${styleHelpers.spacing(2.75, 0)};
      text-align: center;
    }
  }
`;


const divider = css.resolve`
  @media ${styleHelpers.mediaQuery('md')} {
    * {
      display: none;
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

const linkCol = css.resolve`
  * {
    width: 300px;
    margin: ${styleHelpers.spacing(3, 0)};
  }
`;

const logoRow = css.resolve`
  *{
    ${styleHelpers.flex('row')};
    margin-top: ${styleHelpers.spacing(14)};
  }

  @media ${styleHelpers.mediaQuery('xs', 'xl')} {
    * {
      flex-direction: column;
      align-items: center;
      margin-top: ${styleHelpers.spacing(4)};
    }
  }
`;


const linksRow = css.resolve`
  *{
    ${styleHelpers.flex('row')};
    justify-content: space-between;
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      flex-direction: column;
      align-items: center;
    }
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
  linkCol,
  fakeUl,
  logoRow,
  linksRow,
  divider
});