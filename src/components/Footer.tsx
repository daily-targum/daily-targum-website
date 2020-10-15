import React from 'react';
import Grid from './Grid/web';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from './Link';
import Divider from './Divider';
import Image from './Image';

import Styles from './Footer.styles';
const { classNames, StyleSheet } = Styles;

type Link = {
  title: string;
  href: string;
}

function alphabetically(a: Link, b: Link){
  if(a.title < b.title) { return -1; }
  if(a.title > b.title) { return 1; }
  return 0;
}

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
      title: 'Classifieds',
      href: '/classifieds'
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
    <>
      <Section className={classNames.footer}>
        <footer className='dark-mode'>

          <Grid.Row>

            <Grid.Col xs={0} md={8} className={classNames.col}>
              <div className={classNames.centerHorizontally}>
                <Text.Br/>
                <Text.Br/>
                <Logo 
                  color='#fff'
                  className={classNames.logo}
                />
                <Link href="https://www.contentful.com/">
                  <Image 
                    src="/powered-by-contentful.svg" 
                    altText="Powered by Contentful" 
                    className={classNames.sublogo}
                  />
                </Link>
              </div>
            </Grid.Col>

            <Grid.Col xs={24} md={8} className={classNames.col}>
              <Text variant='h4' className={classNames.title}>Company</Text>
              <div role="list" className={classNames.fakeUl}>
                {links.company.sort(alphabetically).map(l => (
                  <Link
                    key={l.href}
                    className={classNames.link}
                    href={l.href}
                    role="listitem"
                  >
                    {l.title}
                  </Link>
                ))}
              </div>
            </Grid.Col>

            <Grid.Col xs={24} md={0}>
              <Divider/>
            </Grid.Col>

            <Grid.Col xs={24} md={8} className={classNames.col}>
              <Text variant='h4' className={classNames.title}>Social Media</Text>
              <div role="list" className={classNames.fakeUl}>
                {links.socialMedia.sort(alphabetically).map(l => (
                  <Link 
                    key={l.href} 
                    className={classNames.link}
                    href={l.href}
                    role="listitem"
                  >
                    {l.title}
                  </Link>
                ))}
              </div>
            </Grid.Col>

            <Grid.Col xs={24} md={0}>
              <Divider/>
            </Grid.Col>

            <Grid.Col xs={24} md={0} className={classNames.col}>
              <div className={classNames.centerHorizontally}>
                <Text.Br/>
                <Text.Br/>
                <Logo 
                  color='#fff'
                  className={classNames.footer}
                />
                <Link href="https://www.contentful.com/">
                  <Image 
                    src="/powered-by-contentful.svg" 
                    altText="Powered by Contentful" 
                    className={classNames.sublogo}
                  />
                </Link>
              </div>
            </Grid.Col>

          </Grid.Row>
          <Text className={classNames.copyright}>Copyright © 2020 Targum Publishing Company. All rights reserved.</Text>
        
        </footer>
      </Section>
      {StyleSheet}
    </>
  );
}

export default Footer;