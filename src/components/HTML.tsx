import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import xss from 'xss';
import Text, { variants } from './Text';
import Link from './Link';
import Divider from './Divider';

const options: HTMLReactParserOptions = {
  replace: ({ type, name, children, attribs }) => {
    if (type === 'tag') {

      if (variants.includes(name)) {
        return (
          <Text variant={name}>{domToReact(children, options)}</Text>
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

    } 
  }
};

export function HTML({
  html
}: {
  html: string
}) {
  const computedHtml = parse(xss(html), options);

  return (
    <div>
      {computedHtml}
    </div>
  );
}

export default HTML;