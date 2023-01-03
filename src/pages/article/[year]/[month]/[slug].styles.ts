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

const heading = css.resolve`
  * {
    font-size: 1.2rem;
    padding: ${styleHelpers.spacing(1, 0)};
    font-style: italic;
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

const shareSidebar = css.resolve`
  * {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const shareIcons = css.resolve`
  * {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: ${styleHelpers.spacing(3.5, -1.5)}; 
  }
`

const shareIcon = css.resolve`
  * {
    margin: ${styleHelpers.spacing(0.25)};
  }
`


const printIcon = css.resolve`
  * {
    margin: ${styleHelpers.spacing(.65,0.5)};
    height: 41px;
    width: 41px;
    border-radius: 50%;
    background-color: ${styleHelpers.color('textMuted')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`


export default buildStyleSheet({
  page,
  title,
  photoWrap,
  divider,
  fullWidth,
  figcaption,
  captionSpacer,
  category,
  shareIcon,
  shareIcons,
  printIcon,
  shareSidebar,
  heading
});