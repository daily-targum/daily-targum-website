import React from 'react';
import Theme from './Theme';
import Grid from './Grid';
import Section from './Section';
import Logo from './Logo'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import NextNprogress from 'nextjs-progressbar';
import { useRouter } from 'next/router';
import { useSelector } from '../store';

export const NAVBAR_HEIGHT = 60;

const navbarLinks: {
  title: string
  href: string
  as: string
}[] = [
  // {
  //   title: 'Home',
  //   href: '/',
  //   as: '/'
  // },
  {
    title: 'News',
    href: '/section/[section]',
    as: '/section/news'
  },
  {
    title: 'Sports',
    href: '/section/[section]',
    as: '/section/sports'
  },
  {
    title: 'Opinions',
    href: '/section/[section]',
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
    title: 'Humans of RU',
    href: '/section/[section]',
    as: '/section/humans-of-rutgers'
  }
]

function Nav({
  dark
}: {
  dark: boolean
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const {colors} = Theme.useTheme();
  const router = useRouter();
  return (
    <>
      <NextNprogress
        color={colors.accent}
        height="2"
        options={{showSpinner: false}}
      />
      <Section className={[classes.navbar, 'animate-all-normal'].join(' ')}>
        <div className={classes.inner}>
          <Link href='/'>
            <a>
              <Logo className={classes.logo}/>
            </a>
          </Link>
          <Grid.Row>
            <Grid.Col xs={0} lg={24}>
              <div className={classes.links}>
                {navbarLinks.map(link => (
                  <Link 
                    key={link.as}
                    href={link.href} 
                    as={link.as}
                  >
                    <a
                      className={[
                        classes['link:hover'],
                        classes.link,
                        'animate-all-normal',
                        (link.as === router.asPath) ? classes.linkActive : null,
                      ].join(' ')}
                    >
                      <span>{link.title}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </Grid.Col>
            <Grid.Col lg={0}>
              <div className={[classes.links, classes.menuIconWrap].join(' ')}>
                <FontAwesomeIcon size='1x' color={dark ? '#fff' : '#000'} icon={faBars}/>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Section>
    </>
  );
}

export function Navbar() {
  const dynamicHeaderEnabled = useSelector(s => s.navigation.dynamicHeaderEnabled);
  const [dark, setDark] = React.useState(true);

  function onScroll() {
    let offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    setDark(offsetTop < 200);
  }

  React.useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav dark={dynamicHeaderEnabled && dark}/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  navbar: {
    position: 'sticky',
    width: '100%',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,.05)',
    backgroundColor: '#fff'
  },
  navbarShadow: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  inner: {
    display: 'flex',
    height: NAVBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noPadding: {
    padding: 0,
    margin: 0
  },
  logo: {
    width: 170,
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
    justifyContent: 'flex-end'
  },
  link: {
    textDecoration: 'none',
    color: '#000', // '#555',
    marginLeft: theme.spacing(4),
    height: NAVBAR_HEIGHT,
    alignItems: 'center',
    display: 'flex',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'solid'
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
    fontSize: '1.6em'
  }
}));

// export function useDynamicHeader() {
//   const dispatch = useDispatch();
//   React.useEffect(() => {
//     dispatch(navigationActions.enableDynamicHeader());
//     return () => {
//       dispatch(navigationActions.disablewDynamicHeader());
//     };
//   });
// }

// Navbar.useDynamicHeader = useDynamicHeader;
export default Navbar;