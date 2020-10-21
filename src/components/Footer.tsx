import * as React from 'react';
import ThemeSelector from './ThemeSelector';
import Section from './Section';
import Logo from './Logo';
import Text from './Text';
import Link from './Link';
import Divider from './Divider';
import Image from './Image';
import { ObjectKeys } from '../shared/src/utils';

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
  Company: [
    {
      title: 'About',
      href: '/page/about'
    },
    {
      title: 'Donate',
      href: 'https://www.paypal.com/us/fundraiser/charity/1499274'
    },
    {
      title: 'Privacy Policy',
      href: '/page/privacy-policy'
    },
    {
      title: 'OSS',
      href: '/page/oss'
    },
  ],
  'Contact': [
    {
      title: 'Contact',
      href: '/page/contact'
    },
    {
      title: 'Get Involved',
      href: '/page/get-involved'
    },
  ],
  Advertise: [
    {
      title: 'Advertise',
      href: '/page/advertise'
    },
    {
      title: 'Classifieds',
      href: '/classifieds'
    },
  ],
  'Follow Us': [
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
    }
  ]
}

export function Footer() {
  return (
    <>
      <Section className={classNames.footer}>
        <footer className='dark-mode'>
      
          <div className={classNames.linksRow}>
            {ObjectKeys(links).map(linkSet => (
              <React.Fragment key={linkSet}>
                <div className={classNames.linkCol}>
                  <Text variant='h4' className={classNames.title}>{linkSet}</Text>
                  <div role="list" className={classNames.fakeUl}>
                    {links[linkSet].sort(alphabetically).map(l => (
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
                </div>

                <Divider className={classNames.divider}/>
              </React.Fragment>
            ))}
          </div>

          <div className={classNames.logoRow}>
            <Logo 
              color='#fff'
              className={classNames.logo}
            />
            <Link href="https://www.contentful.com/">
              <Image 
                src="/powered-by-contentful.svg" 
                altText="Powered by Contentful" 
                className={classNames.sublogo}
                aspectRatio={1/3}
                width={135}
              />
            </Link>
          </div>

          <div className={classNames.copyrightRow}>
            <Text className={classNames.copyright}>Copyright © 2020 Targum Publishing Company. All rights reserved.</Text>
            <div className={classNames.themeSelectWrap}>
              <ThemeSelector/>
            </div>
          </div>
        
        </footer>
      </Section>
      {StyleSheet}
    </>
  );
}

export default Footer;