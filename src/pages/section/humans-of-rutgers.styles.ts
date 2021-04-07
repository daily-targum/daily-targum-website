import { css } from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    flex: 1;
  }
`;


const banner = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(1)};
  }
`;


const post = css.resolve`
  * {
    cursor: pointer;
  }
`;


const square = css.resolve`
  * {
    ${styleHelpers.aspectRatioFullWidth(1)}
  }
`;


const carousel = css.resolve`
  * {
    ${styleHelpers.absoluteFill()}
    position: absolute !important;
  }
`;


const body = css.resolve`
  * {
    padding: ${styleHelpers.spacing(4)};
  }

  @media ${styleHelpers.mediaQuery('md')} {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  @media ${styleHelpers.printMediaQuery('md')} {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
  }
`;


const hideButton = css.resolve`
  * {
    ${styleHelpers.hideButton()}
    outline-offset: 2px;
  }
`;


const multiplePhotosIcon = css.resolve`
  * {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: inherit;
    pointer-events: none;
  }
`;


export default buildStyleSheet({
  page,
  banner,
  post,
  square,
  carousel,
  body,
  hideButton,
  multiplePhotosIcon
});