import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';

const HEIGHT = '60px';

const navbarWrap = css.resolve`
  * {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1000;
  }
`;

const navbar = css.resolve`
  * {
    position: sticky;
    background-color: ${styleHelpers.color('navbar')};
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${styleHelpers.color('divider')};
    height: ${HEIGHT};
    overflow: visible;
  }
`;

const navbarSpacer = css.resolve`
  * {
    height: ${HEIGHT};
  }
`;

const inner = css.resolve`
  * {
    ${styleHelpers.flex('row')};
    flex: 1;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: ${HEIGHT};
  }
`;


const noPadding = css.resolve`
  * {
    padding: 0;
    margin: 0;
  }
`;


const logo = css.resolve`
  * {
    width: 175px;
    height: auto;
    margin-top: 8px;
    color: ${styleHelpers.color('text')};
  }
`;


const links = css.resolve`
  * {
    ${styleHelpers.flex('row')};
    justify-content: flex-end;
    align-items: center;
  }
`;


const link = css.resolve`
  * {
    text-decoration: none;
    color: ${styleHelpers.color('text')};
    margin: ${styleHelpers.spacing(0, 1)};
    padding: ${styleHelpers.spacing(1)};
    height: ${HEIGHT};
    align-items: center;
    display: flex;
    border-width: 0;
    border-bottom-width: 2px;
    border-top-width: 2px;
    border-color: transparent;
    border-style: solid;
    transition: border-bottom-color theme.timing(1), color theme.timing(1);
  }

  *:hover {
    color: ${styleHelpers.color('accent_main')};
    border-bottom-color: ${styleHelpers.color('accent_main')};
  }
`;


const mobileLink = css.resolve`
  * {
    ${styleHelpers.hideLink()};
    font-size: calc(18px + 2vw);
    color: ${styleHelpers.color('text')};
    margin-bottom: ${styleHelpers.spacing(3)};
    cursor: pointer;
  }

  *:hover {
    color: ${styleHelpers.color('accent_main')};
    border-bottom-color: ${styleHelpers.color('accent_main')};
  }
`;


const linkActive = css.resolve`
  * {
    color: ${styleHelpers.color('accent_main')};
    border-bottom-color: ${styleHelpers.color('accent_main')};
  }
`;


const mobileMenu = css.resolve`
  * {
    ${styleHelpers.flex('column')};
    ${styleHelpers.absoluteFill()};
    position: fixed;
    background-color: ${styleHelpers.color('surface')};
    padding: ${styleHelpers.spacing(2.5)};
    margin-top: ${HEIGHT};
    z-index: -1;
    align-items: flex-start;
  }
`;


const fadeOut = css.resolve`
  * {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }
`;


const fadeIn = css.resolve`
  * {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;


const icon = css.resolve`
  * {
    color: ${styleHelpers.color('text')};
  }
`;


const search = css.resolve`
  * {
    margin-bottom: ${styleHelpers.spacing(3)};
  }
`;


export default buildStyleSheet({
  navbarWrap,
  navbar,
  navbarSpacer,
  inner,
  noPadding,
  logo,
  links,
  link,
  mobileLink,
  linkActive,
  mobileMenu,
  fadeOut,
  fadeIn,
  icon,
  search
});