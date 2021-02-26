import queryString from 'query-string';
import { BreakPoints } from '../components/Grid/types';
import { breakPoints } from '../components/Grid/config';
import { ObjectKeys } from '../utils';

type ImgixOptions = {
  ar?: string
  width?: string
  height?: string
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
  crop: 'faces',
  // allows us to prefer different formats
  // based on device size (mobile/desktop)
  formats: ['webp', 'jpg']
};

const presets = {
  xs: (ar?: string, formats?: string[]) => ({
    ...imgixDefaultOptions,
    formats: formats ?? imgixDefaultOptions.formats,
    ar,
    width: '150'
  }) as const,
  sm: (ar?: string, formats?: string[]) => ({
    ...imgixDefaultOptions,
    formats: formats ?? imgixDefaultOptions.formats,
    ar,
    width: '250'
  }) as const,
  md: (ar?: string, formats?: string[]) => ({
    ...imgixDefaultOptions,
    formats: formats ?? imgixDefaultOptions.formats,
    ar,
    width: '500'
  }) as const,
  lg: (ar?: string, formats?: string[]) => ({
    ...imgixDefaultOptions,
    formats: formats ?? imgixDefaultOptions.formats,
    ar,
    width: '700'
  }) as const,
  xl: (ar?: string, formats?: string[]) => ({
    ...imgixDefaultOptions,
    formats: formats ?? imgixDefaultOptions.formats,
    ar,
    width: '1200'
  }) as const,
  facebook: () => ({
    ...imgixDefaultOptions,
    height: '640',
    width: '1200'
  }),
  twitter: () => ({
    ...imgixDefaultOptions,
    height: '400',
    width: '600'
  })
};
imgix.presets = presets;

type ImgData = {
  src: string
  type: string
  media: string
  width: number
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
      width: +(rest.width ?? 0),
      media: `(min-width: ${breakPoints[breakPoint]}px)`
    }));

    data.push(...computedPreset);

  });

  return data;
}

imgix.nonResponsive = imgixNonResponsive;
function imgixNonResponsive(
  src: string,
  preset: Partial<ImgixOptions>
) {
  const format = 'jpg';

  const { formats: _, ...rest } = preset;

  return {
    type: `image/${format}`,
    src: `${src}?` + (
      queryString.stringify({
        ...rest,
        fm: format
      }, {
        encode: false
      })
    )
  };
}