import * as React from "react";

export function NewLogo({
  className,
  color,
  style,
  isSmall = false,
}: {
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  isSmall?: boolean;
}) {
  return (
    <svg
      style={style}
      className={className}
      width="1432px"
      height={`${295 * +isSmall + 237 * +!isSmall} px`}
      //viewBox="0 0 1432 237"
      viewBox={`0 0 1432 ${295 * +isSmall + 237 * +!isSmall}`}
      version="1.1"
    >
      <g
        id="assets"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="main-logo-v3-(1)"
          fill={color ?? style?.color ?? "var(--colors-text)"}
        >
          <path d=""> </path>
        </g>
      </g>
    </svg>
  );
}
export default NewLogo;
