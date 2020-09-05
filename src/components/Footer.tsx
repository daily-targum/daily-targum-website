import React from 'react';
import Theme from './Theme';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from './Link';
import { styleHelpers } from '../utils';

const links = {
  company: [
    {
      title: 'About',
      href: '/page/about'
    },
    {
      title: 'Donate',
      href: '/page/donate'
    },
    {
      title: 'Advertise',
      href: '/page/advertise'
    },
    {
      title: 'Get Involved',
      href: '/page/get-involved'
    },
    {
      title: 'Privacy Policy',
      href: '/page/privacy-policy'
    },
  ],
  socialMedia: [
    {
      title: 'Twitter',
      href: 'https://twitter.com/Daily_Targum'
    },
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/thedailytargum/'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/dailytargum/'
    },
    {
      title: 'YouTube',
      href: 'https://www.youtube.com/user/TargumMultimedia'
    },
  ]
}

export function Footer() {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  return (
    <Section style={styles.footer}>
      <footer>

        <Grid.Row reverse>

          <Grid.Col xs={24} md={8} style={styles.col}>
            <Text variant='h4' style={styles.title}>Social Media</Text>
            {links.socialMedia.map(l => (
              <Link 
                key={l.href} 
                className={cng(styles.link)}
                href={l.href}
              >
                {l.title}
              </Link>
            ))}
          </Grid.Col>

          <Grid.Col xs={24} md={8} style={styles.col}>
            <Text variant='h4' style={styles.title}>Company</Text>
            {links.company.map(l => (
              <Link
                key={l.href}
                className={cng(styles.link)}
                href={l.href}
              >
                {l.title}
              </Link>
            ))}
          </Grid.Col>

          <Grid.Col xs={24} md={8} style={styles.col}>
            <div style={styles.centerHorizontally}>
              <Text.Br/>
              <Text.Br/>
              <Logo 
                color='#fff'
                style={styles.logo}
              />
              <Link href="https://www.contentful.com/">
                <img src="/powered-by-contentful.svg" alt="Powered by Contentful" loading='lazy' style={styles.sublogo}/>
              </Link>
            </div>
          </Grid.Col>

        </Grid.Row>
        <Text style={styles.copyright}>Copyright © 2020 Targum Publishing Company. All rights reserved.</Text>
      
      </footer>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  logo: {
    width: 180,
    height: 'auto',
    marginBottom: theme.spacing(3)
  },
  sublogo: {
    width: 140,
    height: 'auto',
    marginBottom: theme.spacing(3)
  },
  footer: {
    padding: theme.spacing(5, 0),
    backgroundColor: theme.colors.primary.main
  },
  copyright: {
    ...styleHelpers.flex(),
    ...styleHelpers.textCenter(),
    color: theme.colors.primary.contrastTextMuted,
    fontSize: '0.8rem',
    fontWeight: 300,
    paddingBottom: 'env(safe-area-inset-bottom)',
    marginTop: theme.spacing(4)
  },
  title: {
    color: theme.colors.primary.contrastText,
    ...styleHelpers.textCenter()
  },
  link: {
    margin: theme.spacing(2, 0),
    textDecoration: 'none',
    color: theme.colors.primary.contrastTextMuted,
    textAlign: 'center',
    [theme.mediaQuery('xs', 'md')]: {
      margin: theme.spacing(2.75, 0),
    }
  },
  centerHorizontally: {
    ...styleHelpers.flex('column'),
    textAlign: 'center',
    alignItems: 'center'
  },
  col: {
    margin: theme.spacing(3, 0)
  }
}));

export default Footer;