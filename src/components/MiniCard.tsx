import * as React from "react";
import Link from "next/link";
import Text from "./Text";
import { ReactChildren, ReactChild } from "../types";

interface MiniCardProps {
  title?: string;
  tag?: string;
  imageData: ImageData[];
  href?: string;
  as?: string;
  aspectRatioMobile?: number;
  aspectRatioDesktop?: number;
  date?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  author?: string;
  onClick?: () => any;
  Overlay?: ReactChild;
  altText?: string;
}

const MiniCard = ({
  title,
  imageData,
  href,
  as,
  aspectRatioMobile,
  aspectRatioDesktop,
  date,
  author,
  altText,
}: MiniCardProps) => {
  return <div></div>;
};
