import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';

const clickable = css.resolve`
  * {
    ${styleHelpers.hideButton()}
    ${styleHelpers.hideLink()}
    flex: 1;
  }
`;


const stackedCard = css.resolve`
  * {
    ${styleHelpers.flex("column")}
  }
`;


const stackedCardBody = css.resolve`
  * {
    flex: 1;
    padding: ${styleHelpers.spacing(2.5, 2)};
    background-color: ${styleHelpers.color('surface')};
  }
`;

const textPadding = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(1.5)};
  }
`;

const spacer = css.resolve`
  * {
    padding-bottom: ${styleHelpers.spacing(2.5)};
  }
`;

const byline = css.resolve`
  * {
    display: flex;
    color: ${styleHelpers.color('textMuted')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-style: italic;
    font-size: 0.925rem;
  }
`;

const tag = css.resolve`
  * {
    display: flex;
    color: ${styleHelpers.color('accent_main')};
    font-weight: 700;
  }
`;


export default buildStyleSheet({
  clickable,
  stackedCard,
  stackedCardBody,
  spacer,
  byline,
  textPadding,
  tag
});