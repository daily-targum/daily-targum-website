import * as React from "react";
import { ReactChildren, ReactChild } from "../types";
import { ImageData, Image } from "./Image";
import cn from "classnames";
import { useAmp } from "next/amp";
import Styles from "./AspectRatioView.styles";
const { classNames, StyleSheet } = Styles;

export function AspectRatioView({
  aspectRatio,
  children,
  className,
  classNameInside,
  style,
  styleInside,
  onClick,
}: {
  aspectRatio: number;
  children?: ReactChildren;
  className?: string;
  classNameInside?: string;
  style?: React.CSSProperties;
  styleInside?: React.CSSProperties;
  onClick?: () => any;
}) {
  return (
    <>
      <div
        style={{
          ...(aspectRatio
            ? null
            : {
                flex: 1,
                height: "100%",
              }),
          ...style,
        }}
        className={className}
        onClick={onClick}
      >
        <div
          className={classNameInside}
          style={{
            width: "100%",
            paddingTop: 100 / aspectRatio + "%",
            ...styleInside,
          }}
        >
          {children}
        </div>
      </div>
      {StyleSheet}
    </>
  );
}

export function AspectRatioImage({
  aspectRatio,
  data,
  src,
  className,
  style,
  onClick,
  altText,
  Overlay,
  styleInside,
  classNameInside,
}: {
  aspectRatio: number;
  data?: ImageData[];
  src?: string;
  className?: string;
  classNameInside?: string;
  style?: React.CSSProperties;
  styleInside?: React.CSSProperties;
  onClick?: () => any;
  altText?: string;
  Overlay?: ReactChild;
}) {
  const isAmp = useAmp();

  const lastImg = data ? data.slice(-1)[0] ?? { src } : { src };

  if (isAmp) {
    return (
      <div
        style={{
          display: "flex",
          ...style,
        }}
        className={className}
      >
        <amp-img
          src={lastImg.src}
          alt={altText}
          layout="responsive"
          height={1}
          width={aspectRatio}
          style={{ height: "auto", width: "100%", ...styleInside }}
          className={classNameInside}
        />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          ...style,
        }}
        className={cn(className, {
          [classNames.grow]: aspectRatio === undefined,
        })}
        onClick={onClick}
      >
        <Image
          styleOutside={{
            ...(aspectRatio && !isAmp
              ? {
                  position: "relative",
                  minHeight: "100%",
                  width: "100%",
                  paddingTop: 100 / aspectRatio + "%",
                }
              : null),
            ...styleInside,
          }}
          classNameOutside={classNameInside}
          className={classNames.image}
          style={{
            height: "100%",
          }}
          data={data}
          src={src}
          altText={altText}
          aspectRatio={aspectRatio}
        />
        {Overlay}
      </div>
      {StyleSheet}
    </>
  );
}
