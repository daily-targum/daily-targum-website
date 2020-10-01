import React from 'react';
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
import styles from './Navbar.module.scss';
import cn from 'classnames';
import { theme } from '../constants';
import FocusTrap from 'focus-trap-react';
import { Squash as Hamburger } from 'hamburger-react'

export const NAVBAR_HEIGHT = 60;

function Banner() {
  return (
    <div 
      className={cn(
        styles.banner,
        'dark-mode'
      )}
    >
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

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.keyCode === 27 && isVisible) {
        dispatch(navigationActions.closeMobileMenu());
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isVisible]);

  return (
    <Grid.Display
      xs={true} 
      lg={false}
    >
      <div
        className={styles.mobileMenu}
        style={{
          opacity: +isVisible
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
            tabIndex={isVisible ? undefined : -1}
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

export function Navbar() {
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);
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

      <FocusTrap active={mobileMenuVisible}>
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
                    <Logo className={styles.logo}/>
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

                  <Hamburger 
                    hideOutline={false}
                    toggled={mobileMenuVisible}
                    toggle={() => dispatch(navigationActions.toggleMobileMenu())}
                  />
                </div>
              </Grid.Display>
            </nav>        
          </Section>

          <MobileMenu/>
        </div>
      </FocusTrap>

      <div className={mobileMenuVisible ? styles.navbarSpacer : undefined}/>
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