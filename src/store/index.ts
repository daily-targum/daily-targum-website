import { CombinedState } from './ducks/types'
import { useSelector as useSelectorDefault, useDispatch } from 'react-redux';

export * from './Provider';
export * from './store';

export function useSelector<R>(
  selector: (state: Readonly<CombinedState>) => R,
  equalityFn?: (left: R, right: R) => boolean
) {
  return useSelectorDefault<CombinedState, R>(s => selector(s), equalityFn);
}

export { useDispatch };