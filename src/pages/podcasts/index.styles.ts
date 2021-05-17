import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    ${styleHelpers.page()}
  }
`;

const darkSection = css.resolve`
  * {
    background-color: #000;
    flex: 1;
  }
`;

const podcastWrap = css.resolve`
  * {
    padding: ${styleHelpers.spacing(6, 0)};
    width: 100%;
    max-width: 800px;
  }
`;

const podcastBody = css.resolve`
  * {
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: 0 calc(1vw + ${styleHelpers.spacing(4)});
  }

  @media ${styleHelpers.mediaQuery('xs', 'md')} {
    * {
      padding: ${styleHelpers.spacing(4)};
    }
  }

  @media print {
    * {
      padding: 0 ${styleHelpers.spacing(4)} 0 0;
    }
  }
`;


const imageShadow = css.resolve`
  @media ${styleHelpers.mediaQuery('md')} {
    *:before {
      content: ' ';
      display: block;

      position: absolute;
      top: 8px;
      left: 8px;

      height: 100%;
      width: 100%;

      background: repeating-linear-gradient(
        to bottom right,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.12) 10px,
        rgba(255,255,255,0.12) 20px
      );
    }
  }

  @media ${styleHelpers.printMediaQuery('md')} {
    *:before {
      content: ' ';
      display: block;

      position: absolute;
      top: 8px;
      left: 8px;

      height: 100%;
      width: 100%;

      background: repeating-linear-gradient(
        to bottom right,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.12) 10px,
        rgba(255,255,255,0.12) 20px
      );
    }
  }
`;


const imageOverlay = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

const playButtonWrap = css.resolve`
  * {
    ${styleHelpers.hideButton()}
    background: radial-gradient(#000 50%, transparent 51%);
    color: #fff;
    cursor: pointer;
  }
`;


export default buildStyleSheet({
  page,
  podcastWrap,
  imageShadow,
  darkSection,
  podcastBody,
  imageOverlay,
  playButtonWrap
});