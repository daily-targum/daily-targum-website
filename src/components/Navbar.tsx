import React from 'react';
import Theme from './Theme';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Search from './Search';
import Link from 'next/link';
// @ts-ignore
import NextNprogress from './NextNProgress';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from '../store';
import { navigationActions } from '../store/ducks/navigation';
import { styleHelpers } from '../utils';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

export const NAVBAR_HEIGHT = 60;


const navbarLinks: {
  title: string
  href: string
  as: string,
  mobileOnly?: boolean
}[] = [
  {
    title: 'News',
    href: '/section/news',
    as: '/section/news'
  },
  {
    title: 'Sports',
    href: '/section/sports',
    as: '/section/sports'
  },
  {
    title: 'Opinions',
    href: '/section/opinions',
    as: '/section/opinions'
  },
  {
    title: 'Inside Beat',
    href: '/section/inside-beat',
    as: '/section/inside-beat'
  },
  {
    title: 'Videos',
    href: '/multimedia/videos',
    as: '/multimedia/videos'
  },
  {
    title: 'Photos',
    href: '/multimedia/photos',
    as: '/multimedia/photos'
  },
  {
    title: 'HoRU',
    href: '/section/humans-of-rutgers',
    as: '/section/humans-of-rutgers'
  },
  {
    title: 'Podcasts',
    href: '',
    as: ''
  },
  {
    title: 'Search',
    href: '/search',
    as: '/search',
    mobileOnly: true
  }
]

function MobileMenu() {
  const isVisible = useSelector(s => s.navigation.mobileMenuVisible);
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navigationActions.closeMobileMenu());
  }, [router.pathname]);

  return (
    <Grid.Display
      xs={true} 
      lg={false}
    >
      <div
        className={[
          classes.mobileMenu,
          'animate-all-fast'
        ].join(' ')}
        style={{
          opacity: +isVisible,
          pointerEvents: isVisible ? undefined : 'none'
        }}
      >
        {navbarLinks.map(link => (link.as === router.asPath) ? (
          <span 
            key={link.as}
            className={[
              classes.mobileLink,
              classes["link:hover"],
              classes.linkActive
            ].join(' ')}
            onClick={() => dispatch(navigationActions.closeMobileMenu())}
          >
            <span>{link.title}</span>
          </span>
        ) : (
          <Link 
            key={link.as}
            href={link.href} 
            as={link.as}
          >
            <a className={[
              classes.mobileLink,
              classes["link:hover"]
            ].join(' ')}>
              <span>{link.title}</span>
            </a>
          </Link>
        ))}
      </div>
    </Grid.Display>
  );
}

function DesktopNavbar() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const mobileMenuVisible = useSelector(s => s.navigation.mobileMenuVisible);
  return (
    <>
      <NextNprogress
        color={theme.colors.accent}
        height={2}
        options={{
          showSpinner: false
        }}
      />
      <Section 
        className={classes.navbar}
        style={{
          position: mobileMenuVisible ? 'fixed' : 'sticky'
        }}
      >
        <Grid.Display
          xs={false}
          lg={true} 
          style={{ flex: 1 }}
        >
          <div className={classes.inner}>
            <Link href='/'>
              <a>
                <Logo className={classes.logo}/>
              </a>
            </Link>
            
            <div className={classes.links}>
              {navbarLinks.filter(l => !l.mobileOnly).map(link => (
                <Link 
                  key={link.as}
                  href={link.href} 
                  as={link.as}
                >
                  <a
                    className={[
                      classes['link:hover'],
                      classes.link,
                      'animate-all-fast',
                      (link.as === router.asPath) ? classes.linkActive : null,
                    ].join(' ')}
                  >
                    <span>{link.title}</span>
                  </a>
                </Link>
              ))}
            </div>

            <Search.Input/>
          </div>
        </Grid.Display>

        <Grid.Display
          xs={true}
          lg={false}
        >
          <div className={classes.inner}>
            <Link href='/'>
              <a>
                <Logo className={classes.logo}/>
              </a>
            </Link>

            <div 
              className={[classes.links, classes.menuIconWrap].join(' ')}
              onClick={() => dispatch(navigationActions.toggleMobileMenu())}
            >
              {mobileMenuVisible ? (
                <MdClose
                  size={34}
                />
              ) : (
                <FiMenu
                  size={30}
                />
              )}
            </div>
          </div>
        </Grid.Display>

      </Section>
      <div className={mobileMenuVisible ? classes.navbarSpacer : undefined}/>
    </>
  );
}

export function Navbar() {
  return (
    <>
      <MobileMenu/>
      <DesktopNavbar/>
    </>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  navbar: {
    position: 'sticky',
    width: '100%',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'saturate(180%) blur(10px)',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    height: NAVBAR_HEIGHT,
    overflow: 'visible'
  },
  navbarSpacer: {
    height: NAVBAR_HEIGHT,
  },
  inner: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: NAVBAR_HEIGHT
  },
  noPadding: {
    padding: 0,
    margin: 0
  },
  logo: {
    width: 175,
    height: 'auto',
    marginTop: 8
  },
  logoDT: {
    width: 40,
    height: 'auto',
    marginTop: 8
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1.5), 
    height: NAVBAR_HEIGHT,
    alignItems: 'center',
    display: 'flex',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'solid'
  },
  mobileLink: {
    ...styleHelpers.hideLink(),
    fontSize: 'calc(18px + 2vw)',
    marginBottom: theme.spacing(3),
    cursor: 'pointer'
  },
  'link:hover': {
    color: theme.colors.accent,
    borderBottomColor: theme.colors.accent
  },
  linkActive: {
    color: theme.colors.accent,
    borderBottomColor: theme.colors.accent
  },
  menuIconWrap: {
    fontSize: '1.6em',
    cursor: 'pointer',
    // make icon easier to click
    paddingLeft: 20
  },
  mobileMenu: {
    ...styleHelpers.flex(),
    ...styleHelpers.absoluteFill(),
    position: 'fixed',
    backgroundColor: theme.colors.surface,
    paddingLeft: theme.spacing(2.5),
    zIndex: 999,
    justifyContent: 'center'
  }
}));

export default Navbar;