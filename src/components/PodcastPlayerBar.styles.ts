import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';

const HEIGHT = 55;

const spacer = css.resolve`
  * {
    ${styleHelpers.lockHeight(HEIGHT)};
  }
`;

const section = css.resolve`
  * {
    ${styleHelpers.lockHeight(HEIGHT)};
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    border-top: 1px solid ${styleHelpers.color('divider')};
    background-color: ${styleHelpers.color('navbar')};;
    backdrop-filter: saturate(180%) blur(10px);
  }
`;

const inside = css.resolve`
  * {
    ${styleHelpers.flex('row')};
    justify-content: space-between;
    align-items: center;
  }
`;

const row = css.resolve`
  * {
    ${styleHelpers.lockHeight(HEIGHT)};
    ${styleHelpers.flex('row')};
    align-items: center;
  }
`;

const col = css.resolve`
  * {
    ${styleHelpers.flex('column')};
  }
`;

const icon = css.resolve`
  * {
    margin-right: ${styleHelpers.spacing(2)};
    cursor: pointer;
    color: ${styleHelpers.color('text')};
  }
`;

const time = css.resolve`
  * {
    padding: ${styleHelpers.spacing(0, 2)};
    text-align: center;
  min-width: 80px;
  }
`;

const coverImage = css.resolve`
  * {
    ${styleHelpers.lockHeight(HEIGHT - 10)};
    ${styleHelpers.lockWidth(HEIGHT - 10)};
    ${styleHelpers.centerBackgroundImage()};
    margin-right: 5px;
  }
`;

const centerHorizontally = css.resolve`
  * {
    align-items: center;
  }
`;

const progressBar = css.resolve`
  * {
    flex: 1;
    height: 4px;
    background-color: ${styleHelpers.color('divider')};
  }
`;

const progressBarProgress = css.resolve`
  * {
    height: 100%;
    transition: width 0.1s;
    transition-timing-function: linear;
    background-color: ${styleHelpers.color('accent_main')};
  }
`;

export default buildStyleSheet({
  spacer,
  section,
  inside,
  row,
  col,
  icon,
  time,
  coverImage,
  centerHorizontally,
  progressBar,
  progressBarProgress
});