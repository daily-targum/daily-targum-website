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