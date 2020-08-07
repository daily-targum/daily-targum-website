import React from 'react';
import Theme from './Theme';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from 'next/link';
import { styleHelpers } from '../utils';

const links = {
  company: [
    {
      title: 'Donate',
      href: '/page/[slug]',
      as: '/page/donate'
    },
    {
      title: 'Advertise',
      href: '/page/[slug]',
      as: '/page/advertise'
    },
    {
      title: 'Get Involved',
      href: '/page/[slug]',
      as: '/page/get-involved'
    },
    {
      title: 'Privacy Policy',
      href: '/page/[slug]',
      as: '/page/privacy-policy'
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

  return (
    <Section style={styles.footer}>
      <footer>

        <Grid.Row>
          <Grid.Col xs={0} md={8}>
            <div style={styles.centerHorizontally}>
              <Text.Br/>
              <Text.Br/>
              <Logo 
                color='#fff'
                style={styles.logo}
              />
              <a href="https://www.contentful.com/" rel="noreferrer" target="_blank">
                <img src="/powered-by-contentful.svg" alt="Powered by Contentful" style={styles.sublogo}/>
              </a>
            </div>
          </Grid.Col>
          <Grid.Col xs={0} md={8}>
            <Text variant='h4' style={styles.title}>Social Media</Text>
            {links.socialMedia.map(l => (
              <a 
                key={l.href} 
                style={styles.link}
                href={l.href}
              >{l.title}</a>
            ))}
          </Grid.Col>
          <Grid.Col xs={0} md={8}>
            <Text variant='h4' style={styles.title}>Company</Text>
            {links.company.map(l => (
              <Link
                key={l.as}
                href={l.href}
                as={l.as}
              >
                <a style={styles.link}>{l.title}</a>
              </Link>
            ))}
          </Grid.Col>


          {/* Mobile */}
          <Grid.Col xs={24} md={0}>
            <Text variant='h4' style={styles.title}>Social Media</Text>
            {links.socialMedia.map(l => (
              <a 
                key={l.href} 
                style={styles.mobileLink}
                href={l.href}
              >{l.title}</a>
            ))}
          </Grid.Col>
          <Grid.Col xs={24} md={0}>
            <div style={styles.spacer}/>
            <Text variant='h4' style={styles.title}>Company</Text>
            {links.company.map(l => (
              <Link
                key={l.as}
                href={l.href}
                as={l.as}
              >
                <a style={styles.mobileLink}>{l.title}</a>
              </Link>
            ))}
          </Grid.Col>
          <Grid.Col xs={24} md={0}>
            <div style={styles.centerHorizontally}>
              <div style={styles.spacer}/>
              <Logo 
                color='rgba(0,0,0,0.2)'
                style={styles.logo}
              />
              <a href="https://www.contentful.com/" rel="noreferrer" target="_blank">
                <img src="/powered-by-contentful.svg" alt="Powered by Contentful" style={styles.logo}/>
              </a>
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
    padding: theme.spacing(8, 0, 4),
    backgroundColor: theme.colors.primary.main
  },
  copyright: {
    ...styleHelpers.flex(),
    ...styleHelpers.textCenter(),
    color: theme.colors.primary.contrastTextMuted,
    fontSize: '0.8rem',
    marginTop: theme.spacing(10),
    fontWeight: 300
  },
  title: {
    color: theme.colors.primary.contrastText,
    ...styleHelpers.textCenter()
  },
  link: {
    marginTop: theme.spacing(2),
    textDecoration: 'none',
    color: theme.colors.primary.contrastTextMuted,
    textAlign: 'center'
  },
  mobileLink: {
    margin: theme.spacing(3.5, 0, 2),
    textDecoration: 'none',
    color: theme.colors.primary.contrastTextMuted,
    textAlign: 'center'
  },
  centerHorizontally: {
    ...styleHelpers.flex('column'),
    textAlign: 'center',
    alignItems: 'center'
  },
  spacer: {
    height: theme.spacing(10)
  }
}));

export default Footer;