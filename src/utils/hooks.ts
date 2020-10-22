import React from "react";

export function useVisibility<Element extends HTMLElement>(
  viewportHeightOffsetMultiplier = 0
): [boolean, React.RefObject<Element>] {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<Element | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (ref.current === null) {
        setIsVisible(false);
        return;
      }
      const offset = window.innerHeight * viewportHeightOffsetMultiplier;
      const top = ref.current.getBoundingClientRect().top;
      const updatedVisibility = top + offset >= 0 && top - offset <= window.innerHeight;
      if(updatedVisibility !== isVisible) {
        setIsVisible(updatedVisibility);
      }
    };
    if (process.browser) { 
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isVisible, viewportHeightOffsetMultiplier]);
  return [isVisible, ref];
}

interface UseScrollockProps {
  disableHorizontalScroll?: boolean;
  disableVerticalScroll?: boolean;
  padScrollbarSpace?: boolean;
  ref?: React.MutableRefObject<any>;
}

interface UseScrollockReturntype {
  scrollock: boolean;
  toggleScrollock: (value?: boolean) => void;
}

export const useScrollock = (
  options?: UseScrollockProps
): UseScrollockReturntype => {
  const {
    disableHorizontalScroll = true,
    disableVerticalScroll = true,
    padScrollbarSpace = true,
  } = options || {};
  const [scrollock, setScrollock] = React.useState(false);

  const toggleScrollock = React.useCallback(
    (value?: boolean) => setScrollock(value ?? !scrollock),
    [scrollock]
  );

  const disableScroll = React.useCallback((e: Event) => {
    e.preventDefault();
    return false;
  }, []);

  const disableTouch = React.useCallback((e: TouchEvent) => {
    // checks if the user is using 2 or more fingers, ex. to perform pintch to zoom.
    if (e.touches.length) return true;

    e.preventDefault();
    return false;
  }, []);

  React.useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    body.style.paddingRight = !padScrollbarSpace
      ? "0px"
      : `${!scrollock ? 0 : window.innerWidth - body.offsetWidth}px`;

    body.style.overflowY =
      scrollock && disableVerticalScroll ? "hidden" : "auto";
    body.style.overflowX =
      scrollock && disableHorizontalScroll ? "hidden" : "auto";
    root.style.overflowY =
      scrollock && disableVerticalScroll ? "hidden" : "auto";
    root.style.overflowX =
      scrollock && disableHorizontalScroll ? "hidden" : "auto";

    if (scrollock) {
      body.addEventListener("touchmove", disableTouch, { passive: false });
      body.addEventListener("scroll", disableScroll, { passive: false });
    } else {
      body.removeEventListener("touchmove", disableTouch);
      body.removeEventListener("scroll", disableScroll);
    }

    return () => {
      body.style.paddingRight = "0px";
      body.style.overflowY = "auto";
      root.style.overflowY = "auto";
      body.style.overflowX = "auto";
      root.style.overflowX = "auto";

      body.removeEventListener("touchmove", disableTouch);
      body.removeEventListener("scroll", disableScroll);
    };
  }, [scrollock]);

  return { scrollock, toggleScrollock };
};