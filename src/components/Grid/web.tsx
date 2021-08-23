import React, { useContext } from "react";
import * as types from "./types";
import { Context, defaultContextValue } from "./context";
import { computeBreakpoints, getBreakpoint } from "./utils";
import { styleHelpers, ObjectKeys } from "../../utils";
import * as contextExports from "./context";
import cn from "classnames";
// import { normalizeConfig } from "next/dist/next-server/server/config-shared";

export interface ColProps extends Partial<types.BreakPoints<number>> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

export interface RowProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  spacing?: number | string;
  className?: string;
  cols?: string[] | number;
  /**
   * This method of reversing is dangerous
   * cause it only reversed the order visually
   * and not for people using screen readers
   */
  dangerouslyReverse?: boolean;
  disableGridOnPrit?: boolean;
}

export interface DisplayProps extends Partial<types.BreakPoints<boolean>> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

function Col(props: ColProps) {
  // const context = useContext(Context);
  const { xs, sm, md, lg, xl, xxl, style, children, className } = props;
  const computedBreakpoints = computeBreakpoints({ xs, sm, md, lg, xl, xxl });

  const vars = ObjectKeys(computedBreakpoints)
    .map(
      (breakpoint) =>
        `
      --gridWidth-${breakpoint}: ${computedBreakpoints[breakpoint]};
      --gridDisplay-${breakpoint}: ${
          computedBreakpoints[breakpoint] === 0 ? "none" : "flex"
        };
    `
    )
    .join(" ");

  return (
    <>
      <div style={style} className={cn(className, "col")}>
        {children}
      </div>
      <style jsx>
        {`
          .col {
            ${vars}

            position: relative;
            display: flex;
            flex-direction: column;
            direction: ltr;
          }

          @media ${styleHelpers.mediaQuery("xs", "sm")} {
            .col {
              display: var(--gridDisplay-xs);
              grid-column-end: span var(--gridWidth-xs);
            }
          }

          @media ${styleHelpers.mediaQuery("sm", "md")} {
            .col {
              display: var(--gridDisplay-sm);
              grid-column-end: span var(--gridWidth-sm);
            }
          }

          @media ${styleHelpers.mediaQuery("md", "lg")} {
            .col {
              display: var(--gridDisplay-md);
              grid-column-end: span var(--gridWidth-md);
            }
          }

          @media ${styleHelpers.mediaQuery("lg", "xl")} {
            .col {
              display: var(--gridDisplay-lg);
              grid-column-end: span var(--gridWidth-lg);
            }
          }

          @media ${styleHelpers.mediaQuery("xl", "xxl")} {
            .col {
              display: var(--gridDisplay-xl);
              grid-column-end: span var(--gridWidth-xl);
            }
          }

          @media ${styleHelpers.mediaQuery("xxl")} {
            .col {
              display: var(--gridDisplay-xxl);
              grid-column-end: span var(--gridWidth-xxl);
            }
          }

          @media ${styleHelpers.printMediaQuery("xs", "sm")} {
            .col {
              display: var(--gridDisplay-xs);
              grid-column-end: span var(--gridWidth-xs);
            }
          }

          @media ${styleHelpers.printMediaQuery("sm", "md")} {
            .col {
              display: var(--gridDisplay-sm);
              grid-column-end: span var(--gridWidth-sm);
            }
          }

          @media ${styleHelpers.printMediaQuery("md", "lg")} {
            .col {
              display: var(--gridDisplay-md);
              grid-column-end: span var(--gridWidth-md);
            }
          }

          @media ${styleHelpers.printMediaQuery("lg", "xl")} {
            .col {
              display: var(--gridDisplay-lg);
              grid-column-end: span var(--gridWidth-lg);
            }
          }

          @media ${styleHelpers.printMediaQuery("xl", "xxl")} {
            .col {
              display: var(--gridDisplay-xl);
              grid-column-end: span var(--gridWidth-xl);
            }
          }

          @media ${styleHelpers.printMediaQuery("xxl")} {
            .col {
              display: var(--gridDisplay-xxl);
              grid-column-end: span var(--gridWidth-xxl);
            }
          }
        `}
      </style>
    </>
  );
}

function Row({
  cols,
  spacing = 0,
  children,
  style,
  className,
  dangerouslyReverse = false,
  disableGridOnPrit = false,
}: RowProps) {
  const context = {
    ...contextExports.defaultContextValue,
    breakPoint: useContext(Context).breakPoint,
  };
  //console.log(cols);
  //console.log(context);

  if (typeof cols === "number") {
    cols = Array.from({ length: cols }).map(() => "1fr");
  }

  if (typeof spacing === "number") {
    spacing = spacing + "px";
  }

  return (
    <Context.Provider
      value={{
        ...context,
        cols: cols || context.cols,
      }}
    >
      <div
        className={cn(className, "row", {
          ["disableGridOnPrit"]: disableGridOnPrit,
        })}
        style={{
          gridTemplateColumns: (cols || context.cols).join(" "),
          direction: dangerouslyReverse ? "rtl" : undefined,
          ...style,
        }}
      >
        {children}
      </div>
      <style jsx>
        {`
          .row {
            display: grid;
            flex: 1;
            align-items: flex-start;
            grid-gap: ${spacing};
          }

          @media print {
            .disableGridOnPrit {
              display: block;
            }
          }
        `}
      </style>
    </Context.Provider>
  );
}

function RowRelated({
  cols,
  spacing = 0,
  children,
  style,
  className,
  dangerouslyReverse = false,
  disableGridOnPrit = false,
}: RowProps) {
  const context = {
    ...contextExports.defaultContextValue2,
    breakPoint: useContext(Context).breakPoint,
  };
  //console.log(cols);
  //console.log(context);

  if (typeof cols === "number") {
    cols = Array.from({ length: cols }).map(() => "minmax(0, 1fr)");
  }

  if (typeof spacing === "number") {
    spacing = spacing + "px";
  }

  return (
    <Context.Provider
      value={{
        ...context,
        cols: cols || context.cols,
      }}
    >
      <div
        className={cn(className, "row", {
          ["disableGridOnPrit"]: disableGridOnPrit,
        })}
        style={{
          gridTemplateColumns: (cols || context.cols).join(" "),
          columnGap: "10px",
          direction: dangerouslyReverse ? "rtl" : undefined,
          ...style,
        }}
      >
        {children}
      </div>
      <style jsx>
        {`
          .row {
            display: grid;
            flex: 1;
            align-items: center;
            justify-items: space-between;
            justify-content: space-between;
          }

          @media print {
            .disableGridOnPrit {
              display: block;
            }
          }

          @media ${styleHelpers.mediaQuery("xs", "sm")} {
            .row {
              display: flex;
              flex-direction: column;
            }
          }

          @media ${styleHelpers.mediaQuery("sm", "md")} {
            .row {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
    </Context.Provider>
  );
}

function Display({ children, className, style, ...rest }: DisplayProps) {
  const computedBreakpoints = computeBreakpoints(rest);

  const vars = ObjectKeys(computedBreakpoints)
    .map(
      (breakpoint) =>
        `--gridDisplay-${breakpoint}: ${
          computedBreakpoints[breakpoint] ? "flex" : "none"
        };`
    )
    .join(" ");

  return (
    <>
      <div className={cn(className, "display")} style={style}>
        {children}
      </div>
      <style jsx>
        {`
          .display {
            ${vars}
          }

          @media ${styleHelpers.mediaQuery("xs", "sm")} {
            .display {
              display: var(--gridDisplay-xs);
            }
          }

          @media ${styleHelpers.mediaQuery("sm", "md")} {
            .display {
              display: var(--gridDisplay-sm);
            }
          }

          @media ${styleHelpers.mediaQuery("md", "lg")} {
            .display {
              display: var(--gridDisplay-md);
            }
          }

          @media ${styleHelpers.mediaQuery("lg", "xl")} {
            .display {
              display: var(--gridDisplay-lg);
            }
          }

          @media ${styleHelpers.mediaQuery("xl", "xxl")} {
            .display {
              display: var(--gridDisplay-xl);
            }
          }

          @media ${styleHelpers.mediaQuery("xxl")} {
            .display {
              display: var(--gridDisplay-xxl);
            }
          }

          @media ${styleHelpers.printMediaQuery("xs", "sm")} {
            .display {
              display: var(--gridDisplay-xs);
            }
          }

          @media ${styleHelpers.printMediaQuery("sm", "md")} {
            .display {
              display: var(--gridDisplay-sm);
            }
          }

          @media ${styleHelpers.printMediaQuery("md", "lg")} {
            .display {
              display: var(--gridDisplay-md);
            }
          }

          @media ${styleHelpers.printMediaQuery("lg", "xl")} {
            .display {
              display: var(--gridDisplay-lg);
            }
          }

          @media ${styleHelpers.printMediaQuery("xl", "xxl")} {
            .display {
              display: var(--gridDisplay-xl);
            }
          }

          @media ${styleHelpers.printMediaQuery("xxl")} {
            .display {
              display: var(--gridDisplay-xxl);
            }
          }
        `}
      </style>
    </>
  );
}

function Provider({ children }: { children: React.ReactNode }) {
  const [breakPoint, setBreakPoint] = React.useState(
    getBreakpoint(process.browser ? window.innerWidth : 0)
  );

  React.useEffect(() => {
    if (process.browser) {
      const onLayout = () => setBreakPoint(getBreakpoint(window.innerWidth));
      onLayout();
      window.addEventListener("resize", onLayout);
      return () => {
        window.removeEventListener("resize", onLayout);
      };
    }
  }, []);

  return (
    <Context.Provider value={{ ...defaultContextValue, breakPoint }}>
      {children}
    </Context.Provider>
  );
}

export const Grid = {
  ...contextExports,
  Col,
  Row,
  RowRelated,
  Provider,
  Display,
};

export default Grid;
