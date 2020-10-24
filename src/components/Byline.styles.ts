import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';

const row = css.resolve`
  * {
    ${styleHelpers.flex('row')};
    align-items: center;
    margin: ${styleHelpers.spacing(3, 0)};
  }
`;


const column = css.resolve`
  * {
    ${styleHelpers.flex('column')};
    max-width: 100%;
  }
`;


const avatar = css.resolve`
  * {
    ${styleHelpers.centerBackgroundImage()};
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin-right: ${styleHelpers.spacing(2)};
  }

  @media ${styleHelpers.mediaQuery('xs', 'sm')} {
    * {
      display: none;
    }
  };

  @media ${styleHelpers.printMediaQuery('xs', 'sm')} {
    * {
      display: none;
    }
  };
`;


const date = css.resolve`
  * {
    color: ${styleHelpers.color('textMuted')};
  }
`;


const author = css.resolve`
  * {
    color: ${styleHelpers.color('accent_main')};
    display: block;
  }
`;


const authors = css.resolve`
  * {
    ${styleHelpers.flex('row')};
    flex-wrap: wrap;
    margin-bottom: ${styleHelpers.spacing(0.4)};
  }

  * * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


const hideLink = css.resolve`
  * {
    ${styleHelpers.hideLink()};
  }
`;


const breakSpaces = css.resolve`
  * {
    white-space: break-spaces;
  }
`;


const bylineCompact = css.resolve`
  * {
    margin: ${styleHelpers.spacing(1, 0)};
  }
`;


const bylineCompactAuthor = css.resolve`
  * {
    color: ${styleHelpers.color('textMuted')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    font-style: italic;
  }
`;


const bylineCompactDate = css.resolve`
  * {
    color: ${styleHelpers.color('accent_main')};
    margin-right: ${styleHelpers.spacing(2)};
  }
`;


export default buildStyleSheet({
  row,
  column,
  avatar,
  date,
  author,
  authors,
  hideLink,
  breakSpaces,
  bylineCompact,
  bylineCompactAuthor,
  bylineCompactDate
});