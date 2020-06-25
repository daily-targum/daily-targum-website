import { Theme } from '../types';

function lockWidth<N extends number | string>(width: N): {
  minWidth: N
  width: N
  maxWith: N
} {
  return {
    minWidth: width,
    width,
    maxWith: width
  }
}

function lockHeight<N extends number | string>(height: N): {
  minHeight: N
  height: N
  maxHeight: N
} {
  return {
    minHeight: height,
    height,
    maxHeight: height
  }
}

function hideLink() {
  return {
    textDecoration: 'none',
    color: 'unset'
  } as const;
}

function centerBackgroundImage() {
  return {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  } as const;
}

function aspectRatioFullWidth(x: number, y: number) {
  return {
    width: '100%',
    paddingTop: `${(y / x) * 100}%`
  } as const;
}

function page(theme: Theme) {
  return {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6)
  };
}

type Flex<D> = {
  display: 'flex'
  flexDirection: D
}

function flex(direction: 'row'): Flex<'row'>
function flex(direction?: 'column'): Flex<'column'>
function flex(direction: string = 'column'): Flex<string>
{
  return {
    display: 'flex',
    flexDirection: direction
  };
}

function textCenter() {
  return {
    textAlign: 'center',
    justifyContent: 'center'
  } as const;
}

export const styles = {
  lockWidth,
  lockHeight,
  hideLink,
  centerBackgroundImage,
  aspectRatioFullWidth,
  page,
  flex,
  textCenter
}