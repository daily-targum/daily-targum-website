import React from 'react';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from './Link';
import styles from './Footer.module.scss';

const links = {
  company: [
    {
      title: 'About',
      href: '/page/about'
    },
    {
      title: 'Donate',
      href: 'https://www.paypal.com/us/fundraiser/charity/1499274'
    },
    {
      title: 'Contact',
      href: '/page/contact'
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
  return (
    <Section className={styles.footer}>
      <footer>

        <Grid.Row reverse>

          <Grid.Col xs={24} md={8} className={styles.col}>
            <Text variant='h4' className={styles.title}>Social Media</Text>
            {links.socialMedia.map(l => (
              <Link 
                key={l.href} 
                className={styles.link}
                href={l.href}
              >
                {l.title}
              </Link>
            ))}
          </Grid.Col>

          <Grid.Col xs={24} md={8} className={styles.col}>
            <Text variant='h4' className={styles.title}>Company</Text>
            {links.company.map(l => (
              <Link
                key={l.href}
                className={styles.link}
                href={l.href}
              >
                {l.title}
              </Link>
            ))}
          </Grid.Col>

          <Grid.Col xs={24} md={8} className={styles.col}>
            <div className={styles.centerHorizontally}>
              <Text.Br/>
              <Text.Br/>
              <Logo 
                color='#fff'
                className={styles.logo}
              />
              <Link href="https://www.contentful.com/">
                <img src="/powered-by-contentful.svg" alt="Powered by Contentful" loading='lazy' className={styles.sublogo}/>
              </Link>
            </div>
          </Grid.Col>

        </Grid.Row>
        <Text className={styles.copyright}>Copyright © 2020 Targum Publishing Company. All rights reserved.</Text>
      
      </footer>
    </Section>
  );
}

export default Footer;