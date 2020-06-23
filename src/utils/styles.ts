function lockWidth<N extends number>(width: N): {
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

function lockHeight<N extends number>(height: N): {
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

export const styles = {
  lockWidth,
  lockHeight,
  hideLink,
  centerBackgroundImage,
  aspectRatioFullWidth
}