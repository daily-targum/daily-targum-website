import queryString from 'query-string';
import { BreakPoints } from '../components/Grid/types';
import { breakPoints } from '../components/Grid/config';
import { ObjectKeys } from '../shared/src/utils';

type ImgixOptions = {
  ar?: string
  width?: string
  crop?: string
  fm?: 'webp'
  q?: number
  auto?: 'compress'
  fit?: 'crop'
}

const imgixDefaultOptions: ImgixOptions = {
  auto: 'compress',
  fit: 'crop',
  crop: 'faces,entropy',
};

const presets = {
  sm: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '250'
  }) as const,
  md: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '500'
  }) as const,
  lg: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '700'
  }) as const,
  xl: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '1200'
  }) as const,
} as const;
imgix.presets = presets;

type ImgData = {
  src: string,
  type: string,
  media: string
}

export function imgix(
  src: string,
  presets: Partial<BreakPoints<ImgixOptions>>,
  format = 'pjpg'
) {

  const formats = [format, 'jpg'];

  const data: ImgData[] = [];

  formats.forEach(fm => {

    const computedPreset = ObjectKeys(presets).reverse().map(breakPoint => ({
      type: `image/${fm}`,
      src: `${src}?` + (
        queryString.stringify({
          ...presets[breakPoint],
          fm
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