import queryString from 'query-string';
import { BreakPoints } from '../components/Grid/types';
import { breakPoints } from '../components/Grid/config';
import { ObjectKeys } from '../shared/src/utils';

type ImgixOptions = {
  ar?: string
  width?: string
  crop?: 'faces,center'
  fm?: 'webp'
  q?: number
  auto?: 'compress'
  fit?: 'crop'
}

const imgixDefaultOptions: ImgixOptions = {
  auto: 'compress',
  fit: 'crop'
};

const presets = {
  square: {
    sm: {
      ...imgixDefaultOptions,
      ar: '1:1',
      width: '250',
      crop: 'faces,center',
    },
    md: {
      ...imgixDefaultOptions,
      ar: '1:1',
      width: '500',
      crop: 'faces,center',
    }
  },
  fourByThree: {
    md: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '500',
      crop: 'faces,center',
    },
    lg: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '700',
      crop: 'faces,center',
    }
  },
  sixteenByNine: {
    sm: {
      ...imgixDefaultOptions,
      ar: '16:9',
      width: '250',
      crop: 'faces,center',
    },
    md: {
      ...imgixDefaultOptions,
      ar: '16:9',
      width: '500',
      crop: 'faces,center',
    },
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
  original: {
    sm: {
      ...imgixDefaultOptions,
      width: '250',
      crop: 'faces,center',
    },
    md: {
      ...imgixDefaultOptions,
      width: '500',
      crop: 'faces,center',
    },
    lg: {
      ...imgixDefaultOptions,
      width: '700',
      crop: 'faces,center',
    },
    xl: {
      ...imgixDefaultOptions,
      width: '1200',
      crop: 'faces,center',
    }
  },
  performance: {
    ...imgixDefaultOptions,
  }
} as const;
imgix.presets = presets;

type ImgData = {
  src: string,
  type: string,
  media: string
}

export function imgix(src: string, presets: Partial<BreakPoints<ImgixOptions>>) {

  const formats = ['webp', 'jpg'];

  const data: ImgData[] = [];

  formats.forEach(format => {

    const computedPreset = ObjectKeys(presets).reverse().map(breakPoint => ({
      type: `image/${format}`,
      src: `${src}?` + (
        queryString.stringify({
          ...presets[breakPoint],
          fm: format
        }, {
          encode: false
        })
      ),
      media: `(min-width: ${breakPoints[breakPoint]}px)`
    }));

    data.push(...computedPreset);

  });

  return data;
}