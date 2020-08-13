
export type ImageData = {
  src: string,
  type: string,
  media: string
}

export function Image({
  data,
  className,
  style,
}: {
  aspectRatio?: number
  data: ImageData[]
  className?: string
  style?: React.CSSProperties
}) {
  const lastImg = data.slice(-1)[0] ?? {};

  return (
    <picture 
      style={{
        display: 'flex'
      }}
      className={className}
    >
      {data.map(img => (
        <source 
          key={img.src}
          srcSet={img.src}
          type={img.type}
          media={img.media}
        />
      ))}
      
      <img 
        src={lastImg.src}
        style={{ height: 'auto', width: '100%', ...style }}
        loading='lazy'
      />
    </picture>
  );
}