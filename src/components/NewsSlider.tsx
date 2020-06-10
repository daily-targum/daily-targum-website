import React from 'react';
import { GetArticle } from '../shared/src/client';
import { Theme, NewsCard } from '../components';

export function NewsSlider({
  articles
}: {
  articles: GetArticle[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setTimeout(() => {
      if(index < articles.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 10 * 1000);
    return () => {
      clearTimeout(id);
    }
  }, [index, articles.length])

  return (
    <div className={classes.sider}>
      {articles.map((a, i) => (
        <NewsCard.Slide
          key={a.id}
          article={a}
          className={[
            i !== index ? classes.hide : null,
            classes.slide,
            'animate-opacity'
          ].join(' ')}
        />
      ))}
      <div className={classes.dots}>
        {articles.map((a, i) => (
          <div
            key={a.id}
            className={[
              i !== index ? classes.dotActive : null,
              classes.dot
            ].join(' ')}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  sider: {
    // maxHeight: 400,
    height: 'calc(15vw + 200px)',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden'
  },
  slide: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  hide: {
    opacity: 0
  },
  dots: {
    display: 'flex',
    position: 'absolute',
    top: theme.spacing(3),
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  dot: {
    height: 10,
    width: 10,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderRadius: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    cursor: 'pointer'
  },
  dotActive: {
    backgroundColor: '#fff'
  }
}));

export default NewsSlider;