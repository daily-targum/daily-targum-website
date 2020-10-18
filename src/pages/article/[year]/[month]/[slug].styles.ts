import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../../../utils';


const page = css.resolve`
  * {
    ${styleHelpers.page()};
  }
`;


const title = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(1)};
  }
`;


const photoWrap = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(1)};
  }
`;


const divider = css.resolve`
  * {
    margin-top: ${styleHelpers.spacing(1)};
  }
`;


const fullWidth = css.resolve`
  * {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;


const figcaption = css.resolve`
  * {
    padding: ${styleHelpers.spacing(1, 0)};
    color: ${styleHelpers.color('textMuted')};
    font-size: 0.9rem;
  }
`;


const captionSpacer = css.resolve`
  * {
    display: block;
    height: ${styleHelpers.spacing(1)};
  }
`;


const category = css.resolve`
  * {
    display: block;
    text-transform: uppercase;
    margin: ${styleHelpers.spacing(1, 0, 2)};
    font-weight: bold;
    text-decoration: none;
    font-size: 0.95rem;
  }
`;


export default buildStyleSheet({
  page,
  title,
  photoWrap,
  divider,
  fullWidth,
  figcaption,
  captionSpacer,
  category
});