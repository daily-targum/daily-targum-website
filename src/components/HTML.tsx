import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import xss from 'xss';
import Text, { variants } from './Text';
import Link from './Link';
import Divider from './Divider';
import dynamic from 'next/dynamic';

const ADTAG = 'ad';

export const Ad = dynamic(() => import("./Ad"), {
  ssr: false,
});

const options: HTMLReactParserOptions = {
  replace: ({ type, name, children, attribs }) => {
    if (type === 'tag') {

      // 10 or more - becomes a divider
      if ( !/^h/.test(name) && children.length === 1 && /^(_|-|–){15,}$/.test(children[0].data) ) {
        return (
          <Divider/>
        )
      }

      if (variants.includes(name)) {
        return (
          <Text variant={name} htmlTag={name}>{domToReact(children, options)}</Text>
        );
      }
  
      if (name === 'a') {
        return (
          <Link href={attribs.href}>
            {domToReact(children, options)}
          </Link>
        );
      }

      if (name === 'hr') {
        return (
          <Divider/>
        );
      }

      if (name === ADTAG) {
        return (
          <Ad 
            type='banner'
            style={{
              marginTop: '1rem'
            }}
          />
        )
      }

    } 
  }
};

function injectAdToHtml(html: string) {
  const count = (html.match(/<\/p>/g) || []).length;

  let nth = 0;
  html = html.replace(/<\/p>/g, (match) => {
    nth++;
    return (nth === Math.floor(count / 2)) ? `${match} <${ADTAG}></${ADTAG}>` : match;
  });

  return html;
}

export function HTML({
  html,
  ads = false
}: {
  html: string;
  ads?: boolean
}) {
  const clean = xss(html);
  const computedHtml = parse(
    (ads ? injectAdToHtml(clean) : clean)
  , options);

  return (
    <div>
      {computedHtml}
    </div>
  );
}

export default HTML;