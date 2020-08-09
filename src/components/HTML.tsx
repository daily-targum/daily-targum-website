import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
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
  return (
    <div>
      {parse(sanitizeHtml(html), options)}
    </div>
  );
}

export default HTML;