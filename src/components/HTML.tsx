import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import xss from 'xss';
import Text, { variants } from './Text';

const options: HTMLReactParserOptions = {
  replace: ({ type, name, children }) => {
    if (type === 'tag' && variants.includes(name)) {
      return (
        <Text variant={name}>{domToReact(children, options)}</Text>
      );
    }

    if (type === 'tag' && name === 'a') {
      return (
        <a rel="noreferrer">{domToReact(children, options)}</a>
      );
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