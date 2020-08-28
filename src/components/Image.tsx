
export type ImageData = {
  src: string,
  type: string,
  media: string
}

export function Image({
  data,
  src,
  className,
  style,
  altText
}: {
  aspectRatio?: number
  data?: ImageData[]
  src?: string
  className?: string
  style?: React.CSSProperties
  altText?: string
}) {
  // try and fall back to src if data isn't provided
  const lastImg = data ? data.slice(-1)[0] ?? { src } : { src };

  return (
    <picture 
      style={{
        display: 'flex'
      }}
      className={className}
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
        style={{ height: 'auto', width: '100%', ...style }}
        loading='lazy'
      />
    </picture>
  );
}

export default Image;