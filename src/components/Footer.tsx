import React from 'react';
import Theme from './Theme';
import Grid from './Grid';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from 'next/link';

const links = {
  company: [
    {
      title: 'Get Involved',
      href: '/page/[section]',
      as: '/page/get-involved'
    },
    {
      title: 'Advertise',
      href: '/page/[section]',
      as: '/page/advertise'
    },
    {
      title: 'Donate',
      href: '/page/[section]',
      as: '/page/donate'
    },
    {
      title: 'Privacy Policy',
      href: '/page/[slug]',
      as: '/page/privacy-policy'
    },
  ],
  socialMedia: [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/thedailytargum/'
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/Daily_Targum'
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
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Section className={classes.footer}>
      <Grid.Row>
        <Grid.Col xs={0} md={8}>
          <Logo 
            color='rgba(0,0,0,0.2)'
            className={classes.logo}
          />
          <a href="https://www.contentful.com/" rel="noreferrer" target="_blank">
            <img src="/powered-by-contentful.svg" alt="Powered by Contentful" className={classes.logo}/>
          </a>
        </Grid.Col>
        <Grid.Col xs={0} md={8}>
          <Text variant='h4'>Social Media</Text>
          {links.socialMedia.map(l => (
            <a 
              key={l.href} 
              className={classes.link}
              href={l.href}
            >{l.title}</a>
          ))}
        </Grid.Col>
        <Grid.Col xs={0} md={8}>
          <Text variant='h4'>Company</Text>
          {links.company.map(l => (
            <Link
              key={l.as}
              href={l.href}
              as={l.as}
            >
              <a className={classes.link}>{l.title}</a>
            </Link>
          ))}
        </Grid.Col>


        {/* Mobile */}
        <Grid.Col xs={24} md={0}>
          <Text variant='h4' className={classes.centerVertically}>Social Media</Text>
          {links.socialMedia.map(l => (
            <a 
              key={l.href} 
              className={[classes.link, classes.centerVertically].join(' ')}
              href={l.href}
            >{l.title}</a>
          ))}
        </Grid.Col>
        <Grid.Col xs={24} md={0}>
          <div className={classes.spacer}/>
          <Text variant='h4' className={classes.centerVertically}>Company</Text>
          {links.company.map(l => (
            <Link
              key={l.as}
              href={l.href}
              as={l.as}
            >
              <a className={[classes.link, classes.centerVertically].join(' ')}>{l.title}</a>
            </Link>
          ))}
        </Grid.Col>
        <Grid.Col xs={24} md={0} className={classes.centerVertically}>
          <div className={classes.spacer}/>
          <Logo 
            color='rgba(0,0,0,0.2)'
            className={classes.logo}
          />
          <a href="https://www.contentful.com/" rel="noreferrer" target="_blank">
            <img src="/powered-by-contentful.svg" alt="Powered by Contentful" className={classes.logo}/>
          </a>
        </Grid.Col>
      </Grid.Row>
      <Text className={classes.copyright}>Copyright © 2020 Targum Publishing Company. All rights reserved.</Text>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  logo: {
    width: 200,
    height: 'auto',
    marginBottom: theme.spacing(3)
  },
  footer: {
    padding: theme.spacing(10),
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    borderTopStyle: 'solid'
  },
  socialIcons: {
    marginTop: theme.spacing(2),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
    color: 'rgba(0,0,0,0.2)'
    // fontSize: '1.5rem'
  },
  copyright: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontSize: '0.8rem',
    marginTop: theme.spacing(10)
  },
  link: {
    marginTop: theme.spacing(2),
    textDecoration: 'none',
    color: theme.colors.textMuted
  },
  centerVertically: {
    textAlign: 'center',
    alignItems: 'center'
  },
  spacer: {
    height: theme.spacing(10)
  }
}));

export default Footer;