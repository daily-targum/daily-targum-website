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
  fit?: 'crop',
  formats: readonly string[]
}

const imgixDefaultOptions: ImgixOptions = {
  auto: 'compress',
  fit: 'crop',
  crop: 'faces,entropy',
  formats: ['webp', 'jpg']
};

const presets = {
  sm: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '250',
    formats: ['webp', 'jpg']
  }) as const,
  md: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '500',
    formats: ['webp', 'jpg']
  }) as const,
  lg: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '700',
    formats: ['pjpg', 'jpg']
  }) as const,
  xl: (ar?: string) => ({
    ...imgixDefaultOptions,
    ar,
    width: '1200',
    formats: ['pjpg', 'jpg']
  }) as const,
};
imgix.presets = presets;

type ImgData = {
  src: string,
  type: string,
  media: string
}

export function imgix(
  src: string,
  presets: Partial<BreakPoints<ImgixOptions>>
) {

  const data: ImgData[] = [];

  ObjectKeys(presets).reverse().forEach(breakPoint => {

    const preset = presets[breakPoint]

    if (preset === undefined) {
      return;
    }

    const { formats, ...rest } = preset;

    const computedPreset = formats.map(fm => ({
      type: `image/${fm}`,
      src: `${src}?` + (
        queryString.stringify({
          ...rest,
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