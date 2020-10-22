import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const videoWrap = css.resolve`
  * {
    ${styleHelpers.aspectRatioFullWidth(16/9)}
    position: relative;
  }
`;


const video = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
`;


const persistentPlayerWrap = css.resolve`
  * {
    ${styleHelpers.card()}
    width: calc(150px + 12vw);
    z-index: 1000;
    position: fixed;
    bottom: 10px;
    right: 10px;
    box-shadow: 0px 2px 11px #0000004d;
  }
`;


const closeIcon = css.resolve`
  * {
    ${styleHelpers.hideButton()}
    position: absolute !important;
    top: theme.spacing(1);
    right: theme.spacing(1);
    z-index: 1001;
    cursor: pointer;
    color: #fff;
    width: 24px;
    height: 24px;
  }
`;


const description = css.resolve`
  * {
    ${styleHelpers.flex('column')}
    align-items: flex-start;
    padding: ${styleHelpers.spacing(8, 0, 4)};
  }
`;


const text = css.resolve`
  * {
    color: ${styleHelpers.color('text')};
  }
`;


const thumbnail = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
  }
`;


const videoOverlay = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
    position: absolute !important;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity theme.timing(0.5);
    width: 100%;
    ${styleHelpers.hideButton()};
    cursor: pointer;
  }

  *:hover,
  *:focus {
    opacity: 1;
  }
`;


const hideButton = css.resolve`
  * {
    ${styleHelpers.hideButton()}
  }
`;


const date = css.resolve`
  * {
    color: ${styleHelpers.color('textMuted')};
  }
`;


export default buildStyleSheet({
  videoWrap,
  video,
  persistentPlayerWrap,
  closeIcon,
  description,
  text,
  thumbnail,
  videoOverlay,
  hideButton,
  date
});