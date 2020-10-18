import { useAmp } from 'next/amp';

export type ImageData = {
  src: string
  type: string
  media: string
  width: number
}

export function Image({
  aspectRatio,
  data,
  src,
  classNameOutside,
  style,
  className,
  altText,
  styleOutside,
  width
}: {
  aspectRatio: number
  data?: ImageData[]
  src?: string
  classNameOutside?: string
  className?: string
  style?: React.CSSProperties
  styleOutside?: React.CSSProperties
  altText?: string
  width?: number
}) {
  const isAmp = useAmp();

  // try and fall back to src if data isn't provided
  const lastImg = data ? data.slice(-1)[0] ?? { src } : { src };

  // fallback for Safari
  const sizes = data?.filter(d => d.type === 'image/jpg').map(d => `${d.media} ${d.width}px`).join(', ');
  const images = data?.filter(d => d.type === 'image/jpg').map(d => `${d.src} ${d.width}w`).join(', ');

  if (isAmp) {
    return (
      <div
        style={{
          display: 'flex',
          ...styleOutside
        }}
        className={classNameOutside}
      >
        <amp-img
          src={lastImg.src}
          alt={altText}
          height={(width ?? 1) * aspectRatio}
          width={width ?? 1}
          layout={width ? "intrinsic" : "responsive"}
          style={{ 
            height: 'auto', 
            width: width ?? '100%', 
            ...style
          }}
          className={className}
        />
      </div>
    );
  }

  return (
    <picture 
      style={{
        display: 'flex',
        ...styleOutside
      }}
      className={classNameOutside}
    >
      {data ? data.map(img => (
        <source 
          key={img.src}
          srcSet={img.src}
          type={img.type}
          media={img.media}
        />
      )) : null}
      
      <img 
        alt={altText}
        src={lastImg.src}
        srcSet={images}
        sizes={sizes}
        style={{ height: 'auto', width: '100%', ...style }}
        loading='lazy'
        className={className}
      />
    </picture>
  );
}

export default Image;