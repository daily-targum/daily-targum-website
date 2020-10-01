// @ts-ignore
import Dector from 'react-ad-block-detect';
import { ReactChildren } from '../types';
import { nextUtils } from '../utils';

function AdBlockDector({
  children
}: {
  children: ReactChildren
}) {
  if (nextUtils.envIs(['development'])) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <Dector>
      {children}
    </Dector>
  );
}

export default AdBlockDector;