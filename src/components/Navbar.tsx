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

const navbarLinks = [
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
    href: '/section/[section]',
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

function Normal() {
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
      <Section className={classes.navbar}>
        <div className={classes.inner}>
          <Link href='/'>
            <a>
              <Logo.DT className={classes.logoDT} />
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
                    <a className={[
                      classes['link:hover'],
                      classes.link,
                      'animate-color',
                      (link.as === router.asPath) ? classes.linkActive : null,
                    ].join(' ')}>
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>
            </Grid.Col>
            <Grid.Col lg={0}>
              <div className={[classes.links, classes.menuIconWrap].join(' ')}>
                <FontAwesomeIcon size='1x' icon={faBars}/>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Section>
    </>
  );
}

function Stacked() {
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
      <Section className={classes.navbar}>
        <div className={classes.inner} style={{paddingTop: 40, paddingBottom: 50}}>
          <Grid.Row>
            <Grid.Col xs={24} style={{alignItems: 'center'}}>
              <Link href='/'>
                <a>
                  <Logo className={classes.logo} />
                </a>
              </Link>
              <div style={{height: 10}}/>
            </Grid.Col>
            <Grid.Col xs={0} lg={24} style={{alignItems: 'center'}}>
              <div className={classes.links}>
                {navbarLinks.map(link => (
                  <Link 
                    key={link.as}
                    href={link.href} 
                    as={link.as}
                  >
                    <a className={[
                      classes['link:hover'],
                      classes.link,
                      'animate-color',
                      (link.as === router.asPath) ? classes.linkActive : null,
                    ].join(' ')}>
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>
            </Grid.Col>
            <Grid.Col lg={0}>
              <div className={[classes.links, classes.menuIconWrap].join(' ')}>
                <FontAwesomeIcon size='1x' icon={faBars}/>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Section>
    </>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  navbar: {
    position: 'sticky',
    width: '100%',
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    borderBottomStyle: 'solid',
    backgroundColor: theme.colors.background,
    zIndex: 1000
  },
  navbarShadow: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  inner: {
    display: 'flex',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noPadding: {
    padding: 0,
    margin: 0
  },
  logo: {
    width: 180,
    height: 'auto',
    marginTop: 8
  },
  logoDT: {
    width: 40,
    height: 'auto',
    marginTop: 8
  },
  'link:hover': {
    color: theme.colors.accent
  },
  linkActive: {
    color: theme.colors.accent
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.textMuted,
    marginLeft: theme.spacing(4)
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  menuIconWrap: {
    fontSize: '1.6em'
  }
}));

export const Navbar = () => {
  const router = useRouter();
  return router.pathname === '/' ? (
    <Stacked/>
  ) : (
    <Normal/>
  );
};