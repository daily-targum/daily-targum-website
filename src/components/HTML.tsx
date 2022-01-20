import * as React from "react";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import xss, * as xssDefault from "xss";
import Text, { variants } from "./Text";
import Link from "./Link";
import Divider from "./Divider";
import { Media } from "../aws";
import dynamic from "next/dynamic";
import { Element } from "domhandler/lib/node";
import { ImageFigure } from ".";

const ADTAG = "ad";

export const Ad = dynamic(() => import("./Ad"), {
  ssr: false,
});

const reactStringReplace = require("react-string-replace");

const options: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    // Defining domNode as any then chaning it to Elemnt is a hack
    // See https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-771600574
    const { type, name, children, attribs } = domNode as Element;

    if (type === "tag" && name) {
      // 10 or more - becomes a divider
      if (
        !/^h/.test(name) &&
        children?.length === 1 &&
        /^(_|-|–){15,}$/.test((children[0] as any).data)
      ) {
        return <Divider />;
      }

      if (variants.includes(name as any)) {
        return (
          <Text variant={name} htmlTag={name}>
            {children ? domToReact(children, options) : null}
          </Text>
        );
      }

      if (name === "a") {
        return (
          <Link href={attribs?.href ?? ""}>
            {children ? domToReact(children, options) : null}
          </Link>
        );
      }

      if (name === "hr") {
        return <Divider />;
      }

      if (name === "img") {
        return (
          <img
            {...attribs}
            style={{
              maxWidth: "100%",
            }}
          />
        );
      }

      if (name === "iframe") {
        return (
          <iframe
            {...attribs}
            style={{
              border: "none",
            }}
          />
        );
      }

      if (name === ADTAG) {
        return (
          <Ad
            type="banner"
            style={{
              marginTop: "1rem",
            }}
          />
        );
      }
    }
  },
};

function injectAdToHtml(html: string) {
  const count = (html.match(/<\/p>/g) || []).length;

  let nth = 0;
  html = html.replace(/<\/p>/g, (match) => {
    nth++;
    return nth === Math.floor(count / 2)
      ? `${match} <${ADTAG}></${ADTAG}>`
      : match;
  });

  return html;
}

export function HTML({
  html,
  ads = false,
  embedded = false,
  media = [],
  classNames,
}: {
  html: string;
  ads?: boolean;
  embedded?: boolean;
  media?: Media[];
  classNames?: any;
}) {
  //console.log(html);
  //console.log("embedded = ", embedded);

  const clean = xss(html, {
    whiteList: {
      ...xssDefault.whiteList,
      // @ts-ignore
      iframe: ["src"],
    },
    stripIgnoreTagBody: ["script", "form"],
  });

  const computedHtml = parse(ads ? injectAdToHtml(clean) : clean, options);
  //console.log("computedHtml = ", computedHtml);
  let index = 0;

  return (
    <div>
      {embedded
        ? reactStringReplace(computedHtml, /<INSERT IMAGE>/g, () => {
            index++;
            return (
              <ImageFigure
                classNames={classNames}
                photoCredit={media[index].credits}
                photoDescription={media[index].description}
                photoURL={media[index].url}
                key={media[index].url}
              />
            );
          })
        : computedHtml}
    </div>
  );
}

export default HTML;
