import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const searchWrap = css.resolve`
  * {
    position: relative;
    flex: 1;
    transition: opacity ${styleHelpers.timing(1)};
  }
`;


const search = css.resolve`
  * {
    ${styleHelpers.card()};
    border: 1px solid ${styleHelpers.color('divider')};
    background-color: ${styleHelpers.color('surface')};
    outline-width: 5px;
    position: relative;
    z-index: 1001;
    overflow: visible;
    height: 100%;
  }
`;


const searchInput = css.resolve`
  * {
    ${styleHelpers.unstyle()};
    margin: ${styleHelpers.spacing(0, 0.5)};
    height: 100%;
    min-width: 0;
    width: auto;
    flex: 1;
    line-height: 1.2rem;
    color: ${styleHelpers.color('text')};
  }
`;


const searchPlaceholder = css.resolve`
  * {
    flex: 1;
    color: ${styleHelpers.color('text')};
    margin: ${styleHelpers.spacing(0, 0.5)};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0.7;
    line-height: 1.2em;
  }
`;


const searchIcon = css.resolve`
  * {
    ${styleHelpers.lockWidth('18px')};
    color: ${styleHelpers.color('text')};
    opacity: 0.7;
    cursor: pointer;
    margin: 0 3px;
  }
`;


const searchRow = css.resolve`
  * {
    ${styleHelpers.absoluteFill()};
    ${styleHelpers.flex('row')};
    align-items: center;
    justify-content: center;
    padding: ${styleHelpers.spacing(0, 1)};
    transition: opacity ${styleHelpers.timing(1)};
  }
`;


const bottomActions = css.resolve`
  * {
    padding: theme.spacing(1, 3);
    ${styleHelpers.flex('row')};
    justify-content: space-between;
  }
`;


const hideButton = css.resolve`
  * {
    ${styleHelpers.hideButton()};
  }
`;


const hide = css.resolve`
  * {
    opacity: 0;
  }
`;


const touchTransparent = css.resolve`
  * {
    pointer-events: none;
  }
`;


const clickable = css.resolve`
  * {
    ${styleHelpers.hideButton()};
    cursor: pointer;
    display: flex;
  }
`;


const preview = css.resolve`
  * {
    position: absolute;
    background-color: ${styleHelpers.color('surface')};
    top: calc(100% + 7px);
    position: absolute;
    right: 0;
    border-radius: ${styleHelpers.roundness(1)};
    padding: ${styleHelpers.spacing(2, 0)};
    border: 1px solid ${styleHelpers.color('divider')};
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
    z-index: 1005;
    width: 500px;
  }

  @media ${styleHelpers.mediaQuery('xs', 'lg')} {
    * {
      width: 100%;
    }
  }
`;


const previewLink = css.resolve`
  * {
    ${styleHelpers.hideLink()};
    display: flex;
    padding: ${styleHelpers.spacing(1.5, 3)};
  }

  *:focus {
    background-color: ${styleHelpers.color('highlight')};
    text-decoration: underline;
  }
`;


const backdrop = css.resolve`
  * {
    ${styleHelpers.absoluteFill()};
    position: fixed;
    background-color: rgba(0, 0, 0, 0.726);
    height: 100vh;
    z-index: 1001;
  }
`;


const spin = css.resolve`
  * {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const centerText = css.resolve`
  * {
    display: block;
    text-align: center;
    padding: ${styleHelpers.spacing(5)};
  }
`;


export default buildStyleSheet({
  searchWrap,
  search,
  searchInput,
  searchPlaceholder,
  searchIcon,
  searchRow,
  bottomActions,
  hideButton,
  hide,
  touchTransparent,
  clickable,
  preview,
  previewLink,
  backdrop,
  spin,
  centerText
});