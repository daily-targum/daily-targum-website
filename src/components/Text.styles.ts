import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const truncate = css.resolve`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: var(--text-numberOfLines);
`;


const blockquote = css.resolve`
  * {
    font-style: italic;
    font-size: 1.2rem;
    line-height: lineHeight('paragraph');
    color: ${styleHelpers.color('textMuted')};
    border-left: 3px solid v${styleHelpers.color('text')};
    padding-left: ${styleHelpers.spacing(3)};
    margin: ${styleHelpers.spacing(4, 0)};
  }
  @media ${styleHelpers.mediaQuery('md')} {
    * {
      max-width: 75%;
      margin: ${styleHelpers.spacing(6)} auto;
    }
  }
  @media ${styleHelpers.printMediaQuery('md')} {
    * {
      max-width: 75%;
      margin: ${styleHelpers.spacing(6)} auto;
    }
  }
`;


const h1 = css.resolve`
  * {
    font-size: 2.5rem;
    line-height: 1.2em;
    font-weight: 800;
    margin-bottom: ${styleHelpers.spacing(2)};
  }
`;  


const h2 = css.resolve`
  * {
    font-size: 2rem;
    line-height: 1.2em;
    font-weight: 700;
    margin-bottom: ${styleHelpers.spacing(2)};
  }
`;  


const h3 = css.resolve`
  * {
    font-size: 1.4rem;
    line-height: 1.2em;
    font-weight: 700;
    margin-bottom: ${styleHelpers.spacing(2)};
  }
`;  


const h4 = css.resolve`
  * {
    font-size: 1.2rem;
    line-height: 1.2em;
    font-weight: 700;
    margin-bottom: ${styleHelpers.spacing(1.5)};
  }
`;  


const h5 = css.resolve`
  * {
    font-size: 1rem;
    line-height: 1.2em;
    font-weight: 700;
    margin-bottom: ${styleHelpers.spacing(1)};
  }
`;  


const h6 = css.resolve`
  * {
    font-size: 0.8rem;
    line-height: 1.2em;
    margin-bottom: ${styleHelpers.spacing(2)};
  }
`;  


const p = css.resolve`
  * {
    font-size: 1.1rem;
    line-height: 1.8em;
    margin-bottom: ${styleHelpers.spacing(2)};
    font-weight: normal;
    word-wrap: break-word;
  }
`;  


const span = css.resolve`
  * {
    font-size: 1rem;
    line-height: 1.2em;
  }
`;


const br = css.resolve`
  * {
    height: ${styleHelpers.spacing(2)};
  }
`;


const noPadding = css.resolve`
  * {
    padding: 0;
    margin: 0;
  }
`;


export default buildStyleSheet({
  truncate,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  br,
  noPadding
});