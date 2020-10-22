import StickyBox from "react-sticky-box";
import { ReactChildren } from '../types';

export function Sticky({
  children
}: {
  children: ReactChildren
}) {
  return (
    <StickyBox offsetTop={82}>
      {children}
    </StickyBox>
  );
}