import { useEffect, useRef } from "react";
import styled from "styled-components";

const AspectRatioDiv = styled.div`
  width: 100%;
  /* aspect ratio calculation see https://css-tricks.com/aspect-ratio-boxes/ */
  padding-top: ${(props: { ar: number }) => 100 / props.ar}%;

  /* the child should fill the height of the ar div */
  & > * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Frame = styled.iframe`
  border: none;
`;

/**
 * This is a modified version of the flytedigital code.
 * Instead of automatically using the window object,
 * this function allows you to pass a custom window object.
 * For example, you can use the window object of an iframe.
 */
function injectFlytedigitalScript(w: Window | null) {
  if (window) {
    (function (doc, p) {
      let j: HTMLScriptElement | undefined = doc?.createElement("script");
      const head = doc?.head;
      if (j) {
        j.id = "flytedigital";
        j.async = true;
        j.src = "https://digital.flytedesk.com/js/head.js#" + p;
        head?.appendChild(j);
      }
    })(w?.document, "8b83117d-b1ed-4002-8206-2a3de6cc5e32");
  }
}

/**
 * Creat the iframe element, get the window object
 * of the iframe and inject the flytedigital code
 * into that window object isntead of the parent window.
 */
export function Flytedigita() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (frame) {
      injectFlytedigitalScript(frame.contentWindow);
    }
  }, []);

  return (
    <AspectRatioDiv ar={4 / 1}>
      <Frame ref={ref} />
    </AspectRatioDiv>
  );
}

//export default Flytedigita;
