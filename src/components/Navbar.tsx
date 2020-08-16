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
    href: '/videos',
    as: '/videos'
  },
  {
    title: 'Photos',
    href: '/photos',
    as: '/photos'
  },
  {
    title: 'HoRU',
    href: '/section/humans-of-rutgers',
    as: '/section/humans-of-rutgers'
  },
  {
    title: 'Podcasts',
    href: '/podcasts/[slug]',
    as: '/podcasts/targum-tea'
  },
  {
    title: 'Search',
    href: '/search',
    as: '/search',
    mobileOnly: true
  }
]

function MobileMenu() {
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);
  const isVisible = useSelector(s => s.navigation.mobileMenuVisible);
  const styles = Theme.useStyleCreator(styleCreator, darkNavbar);
  const cng = Theme.useClassNameGenerator();
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isVisible) {
      dispatch(navigationActions.closeMobileMenu());
    }
  }, [router.pathname]);

  return (
    <Grid.Display
      xs={true} 
      lg={false}
    >
      <div
        className={'animate-all-fast'}
        style={{
          ...styles.mobileMenu,
          opacity: +isVisible,
          pointerEvents: isVisible ? undefined : 'none'
        }}
      >
        {navbarLinks.map(link => (link.as === router.asPath) ? (
          <span 
            key={link.as}
            style={styles.linkActive}
            className={cng(styles.mobileLink)}
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
            <a className={cng(styles.mobileLink)}>
              <span>{link.title}</span>
            </a>
          </Link>
        ))}
      </div>
    </Grid.Display>
  );
}

function DesktopNavbar() {
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);
  const styles = Theme.useStyleCreator(styleCreator, darkNavbar);
  const cng = Theme.useClassNameGenerator();
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
        className={cng(styles.navbar)}
        style={{
          position: mobileMenuVisible ? 'fixed' : 'sticky'
        }}
        styleInside={{
          overflow: 'visible'
        }}
      >
        <nav>
          
          <Grid.Display
            xs={false}
            lg={true} 
            style={{ flex: 1 }}
          >
            <div style={styles.inner}>
              <Link href='/'>
                <a>
                  <Logo style={styles.logo}/>
                </a>
              </Link>
              
              <div style={styles.links}>
                {navbarLinks.filter(l => !l.mobileOnly).map(link => (
                  <Link 
                    key={link.as}
                    href={link.href} 
                    as={link.as}
                  >
                    <a
                      style={{
                        ...(link.as === router.asPath) ? styles.linkActive : null,
                      }}
                      className={[
                        cng(styles.link),
                        'animate-all-fast'
                      ].join(' ')}
                    >
                      <span>{link.title}</span>
                    </a>
                  </Link>
                ))}
              </div>

              <Search.Input dark={darkNavbar}/>
            </div>
          </Grid.Display>

          <Grid.Display
            xs={true}
            lg={false}
          >
            <div style={styles.inner}>
              <Link href='/'>
                <a>
                  <Logo style={styles.logo}/>
                </a>
              </Link>

              <div 
                style={{
                  ...styles.menuIconWrap,
                  ...styles.links
                }}
                onClick={() => dispatch(navigationActions.toggleMobileMenu())}
              >
                {mobileMenuVisible ? (
                  <MdClose
                    style={styles.icon}
                    size={34}
                  />
                ) : (
                  <FiMenu
                    style={styles.icon}
                    size={30}
                  />
                )}
              </div>
            </div>
          </Grid.Display>

        </nav>        
      </Section>
      <div style={mobileMenuVisible ? styles.navbarSpacer : undefined}/>
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

const styleCreator = Theme.makeStyleCreator((theme, darkNavbar: boolean) => ({
  navbar: {
    position: 'sticky',
    width: '100%',
    top: 0,
    zIndex: 1000,
    backgroundColor: darkNavbar ? 'rgba(33, 32, 32, 0.92)' : 'rgba(255,255,255,0.92)',
    backdropFilter: 'saturate(180%) blur(10px)',
    '-webkit-backdrop-filter': 'saturate(180%) blur(10px)',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    height: NAVBAR_HEIGHT,
    overflow: 'visible'
  },
  navbarSpacer: {
    height: NAVBAR_HEIGHT
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
    marginTop: 8,
    color: darkNavbar ? theme.colors.primary.contrastText : theme.colors.text,
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
    color: darkNavbar ? theme.colors.primary.contrastText : theme.colors.text,
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1), 
    height: NAVBAR_HEIGHT,
    alignItems: 'center',
    display: 'flex',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'solid',
    ':hover': {
      color: theme.colors.accent,
      borderBottomColor: theme.colors.accent
    }
  },
  mobileLink: {
    ...styleHelpers.hideLink(),
    fontSize: 'calc(18px + 2vw)',
    color: darkNavbar ? theme.colors.primary.contrastText : theme.colors.text,
    marginBottom: theme.spacing(3),
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.accent,
      borderBottomColor: theme.colors.accent
    }
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
    backgroundColor: darkNavbar ? theme.colors.primary.main : theme.colors.surface,
    paddingLeft: theme.spacing(2.5),
    zIndex: 999,
    justifyContent: 'center'
  },
  icon: {
    color: darkNavbar ? theme.colors.primary.contrastText : theme.colors.text
  }
}));

export function useDynamicHeader() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(navigationActions.enableDarkNavbar());
    return () => {
      dispatch(navigationActions.disableDarkNavbar());
    };
  });
}

Navbar.useDynamicHeader = useDynamicHeader;
export default Navbar;