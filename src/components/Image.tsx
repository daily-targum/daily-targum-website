
export type ImageData = {
  src: string
  type: string
  media: string
  width: number
}

export function Image({
  data,
  src,
  classNameOutside,
  style,
  altText,
  styleOutside
}: {
  aspectRatio?: number
  data?: ImageData[]
  src?: string
  classNameOutside?: string
  style?: React.CSSProperties
  styleOutside?: React.CSSProperties
  altText?: string
}) {
  // try and fall back to src if data isn't provided
  const lastImg = data ? data.slice(-1)[0] ?? { src } : { src };

  // fallback for Safari
  const sizes = data?.filter(d => d.type === 'image/jpg').map(d => `${d.media} ${d.width}px`).join(', ');
  const images = data?.filter(d => d.type === 'image/jpg').map(d => `${d.src} ${d.width}w`).join(', ');

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
      />
    </picture>
  );
}

export default Image;