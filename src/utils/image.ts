import queryString from 'query-string';
import { browser } from './browser';

type ImgixOptions = {
  ar?: string
  width?: string
  crop?: 'faces,center'
  fm?: 'webp'
  q?: number
  auto?: 'compress'
  fit?: 'crop'
}

const supportsWebp = browser.is([
  'chrome',
  'edge',
  'firefox'
]);

const imgixDefaultOptions: ImgixOptions = {
  fm: supportsWebp ? 'webp' : undefined,
  auto: 'compress',
  fit: 'crop'
};

const presets = {
  square: {
    small: {
      ...imgixDefaultOptions,
      ar: '1:1',
      width: '250',
      crop: 'faces,center',
    }
  },
  fourByThree: {
    medium: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '500',
      crop: 'faces,center',
    },
    large: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '700',
      crop: 'faces,center',
    }
  },
  sixteenByNine: {
    lg: {
      ...imgixDefaultOptions,
      ar: '16:9',
      width: '700',
      crop: 'faces,center',
    },
    xl: {
      ...imgixDefaultOptions,
      ar: '16:9',
      width: '1200',
      crop: 'faces,center',
    }
  },
  performance: {
    ...imgixDefaultOptions,
  }
} as const;
imgix.presets = presets;

export function imgix(src: string, {
  ar,
  width,
  crop,
  fm,
  q,
  auto,
  fit
}: ImgixOptions) {

  const query = queryString.stringify({
    ar,
    crop,
    fm,
    width,
    q,
    auto,
    fit
  }, {
    encode: false
  });

  return `${src}?${query}`;
}