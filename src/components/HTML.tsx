/* eslint-disable */
import React from 'react';
import Text, { variants } from './Text';
// @ts-ignore
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
const htmlToReactParser = new Parser();

const preprocessingInstructions: any[] = [];
const processingInstructions = [
  {
    shouldProcessNode: function (node: any) {
      return node.type === 'tag' && variants.includes(node.name);
    },
    processNode: (node: any, children: any, index: any) => {
      return (
        <Text variant={node.name} key={index}>{children}</Text>
      );
    },
  },
  {
    shouldProcessNode: function (node: any) {
      return node.type === 'tag' && node.name === 'a';
    },
    processNode: (_0: any, children: any, index: any) => {
      return (
        <a key={index} rel="noreferrer">{children}</a>
      );
    },
  },
  {
    shouldProcessNode: function () {
      return true;
    },
    processNode: ProcessNodeDefinitions().processDefaultNode,
  },
];

const isValidNode = () => true;

export function HTML({
  html
}: {
  html: string
}) {
  return (
    <>
      {htmlToReactParser.parseWithInstructions(html, isValidNode, processingInstructions, preprocessingInstructions)}
    </>
  )
}

export default HTML;