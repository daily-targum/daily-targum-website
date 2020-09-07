import React from 'react';
import Theme from './Theme';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Search from './Search';
import Link from './Link';
import Text from './Text';
// @ts-ignore
import NextNprogress from './NextNProgress';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from '../store';
import { navigationActions } from '../store/ducks/navigation';
import { useScrollock } from '../utils';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import styles from './Navbar.module.scss';
import cn from 'classnames';

export const NAVBAR_HEIGHT = 60;

function Banner() {
  return (
    <div className={styles.banner}>
      <Text className={styles.bannerText}>We would love to hear what you think of the new website. <Link href='https://docs.google.com/forms/d/e/1FAIpQLSe70rAwuC9-K1hmOhSnH9L2iLmb7IfWspcvLDBGVHl_Z-QpkQ/viewform'>Leave Feedback</Link>.</Text>
    </div>
  );
}


const navbarLinks: {
  title: string
  href: string
  mobileOnly?: boolean
}[] = [
  {
    title: 'News',
    href: '/section/news'
  },
  {
    title: 'Sports',
    href: '/section/sports'
  },
  {
    title: 'Opinions',
    href: '/section/opinions'
  },
  {
    title: 'Inside Beat',
    href: '/section/inside-beat'
  },
  {
    title: 'Videos',
    href: '/videos'
  },
  // {
  //   title: 'Photos',
  //   href: '/photos'
  // },
  {
    title: 'HoRU',
    href: '/section/humans-of-rutgers'
  },
  // {
  //   title: 'Podcasts',
  //   href: '/podcasts/targum-tea'
  // },
  // {
  //   title: 'Search',
  //   href: '/search',
  //   mobileOnly: true
  // },
  {
    title: 'About',
    href: '/page/about'
  }
]

function MobileMenu() {
  const isVisible = useSelector(s => s.navigation.mobileMenuVisible);
  const router = useRouter();
  const dispatch = useDispatch();

  const { toggleScrollock } = useScrollock();

  React.useEffect(() => {
    toggleScrollock(isVisible)
  }, [isVisible]);

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
        className={styles.mobileMenu}
        style={{
          opacity: +isVisible,
          pointerEvents: isVisible ? undefined : 'none'
        }}
      >
        {navbarLinks.map(link => (link.href === router.asPath) ? (
          <span 
            key={link.href}
            className={cn(styles.mobileLink, styles.linkActive)}
            onClick={() => dispatch(navigationActions.closeMobileMenu())}
          >
            <span>{link.title}</span>
          </span>
        ) : (
          <Link 
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
          >
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
    </Grid.Display>
  );
}

function DesktopNavbar() {
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);
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

      <div 
        className={cn(
          styles.navbarWrap,
          {
            ['dark-mode']: darkNavbar
          }
        )}
        style={{
          ...(mobileMenuVisible ? {
            position: 'fixed'
          } : null)
        }}
      >
        <Banner/>

        <Section 
          className={styles.navbar}
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
              <div className={styles.inner}>
                <Link href='/'>
                  <a>
                    <Logo className={styles.logo}/>
                  </a>
                </Link>
                
                <div className={styles.links}>
                  {navbarLinks.filter(l => !l.mobileOnly).map(link => (
                    <Link 
                      key={link.href}
                      href={link.href}
                      className={cn(
                        styles.link,
                        {
                          [styles.linkActive]: link.href === router.asPath
                        }
                      )}
                    >
                      <span>{link.title}</span>
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
              <div className={styles.inner}>
                <Link href='/'>
                  <Logo className={styles.logo}/>
                </Link>

                <div
                  className={cn(
                    styles.menuIconWrap,
                    styles.links
                  )}
                  onClick={() => dispatch(navigationActions.toggleMobileMenu())}
                >
                  {mobileMenuVisible ? (
                    <MdClose
                      className={styles.icon}
                      size={34}
                    />
                  ) : (
                    <FiMenu
                      className={styles.icon}
                      size={30}
                    />
                  )}
                </div>
              </div>
            </Grid.Display>
          </nav>        
        </Section>
      </div>

      <div className={mobileMenuVisible ? styles.navbarSpacer : undefined}/>
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

export function useDynamicHeader() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(navigationActions.enableDarkNavbar());
    return () => {
      dispatch(navigationActions.disableDarkNavbar());
    };
  }, []);
}

Navbar.useDynamicHeader = useDynamicHeader;
export default Navbar;