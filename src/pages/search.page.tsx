import React from 'react';
import { NextPageContext } from 'next';
import { actions, SearchHits } from '../shared/src/client';
import { SEOProps, Section, Text, Divider, Link, AspectRatioImage, Semantic, Search, FlatList, HTML } from '../components';

import { imgix, processNextQueryStringParam } from '../utils';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from '../store';
import { searchActions } from '../store/ducks/search';
import queryString from 'query-string';

import styles from './search.module.scss';


function SearchPage({
  initialQuery,
  initialHits 
}: {
  initialQuery: string;
  initialHits: SearchHits | null;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobileMenuVisible = useSelector(s => s.navigation.mobileMenuVisible);
  const focused = useSelector(s => s.search.focused);
  const query = useSelector(s => s.search.query);
  const hitsQuery = useSelector(s => s.search.hitsQuery)
  const hits = useSelector(s => s.search.hits) ?? (hitsQuery === initialQuery ? initialHits : null);
  const hijacked = useSelector(s => s.search.hijacked)

  React.useEffect(() => {
    if (initialHits) {
      dispatch(searchActions.hydrate({
        query: initialQuery,
        hits: initialHits 
      }));
    }
  }, []);

  React.useEffect(() => {
    if (focused) {
      return;
    }
    
    const newQuery = queryString.stringify({ s: query });
    if (newQuery !== query) {
      router.replace(`${router.pathname}?${newQuery}`, undefined, { shallow: true });
    }
  }, [query, router.pathname, focused]);

  React.useEffect(() => {
    dispatch(searchActions.setHijacked(!mobileMenuVisible));
    return () => {
      dispatch(searchActions.setHijacked(false));
    };
  }, [mobileMenuVisible]);
  
  return (
    <Section.StickyContainer className={styles.page}>

      <Semantic role='main' skipNavContent>
        <div className={styles.searchWrap} style={{position: 'sticky', top: 60}}>
          <Search.Input
            enabled={hijacked}
            size={3}
            width='100%'
          />
        </div>

        <FlatList
          data={hits?.hits ?? []}
          keyExtractor={hit => hit._id}
          renderItem={(hit) => (
            <Link href={`/${hit._source.slug}`} className={styles.item}>
              <Semantic role='article' className={styles.row}>
                <div className={styles.col}>
                  <Text variant='p' className={styles.category}>{hit._source.category}</Text>
                  <Text variant='h4'>{hit._source.title}</Text>
                  <Text.Truncate numberOfLines={4}>
                    <HTML html={hit._source.body.match(/<p>.*<\/p>/)?.[0] ?? ''}/>
                  </Text.Truncate>
                </div>
                <AspectRatioImage
                  className={styles.img}
                  aspectRatio={4/3}
                  data={imgix(hit._source.media[0] ?? '', {
                    xs: imgix.presets.md('1:1'),
                    md: imgix.presets.md('16:9')
                  })}
                />
              </Semantic>
            </Link>
          )}
          ItemSeparatorComponent={<Divider className={styles.divider}/>}
        />
      </Semantic>

    </Section.StickyContainer>
  );
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = processNextQueryStringParam(ctx.query.s, '');

  let hits = null;
  if (query) {
    hits = await (await actions.search({ query }));
  }

  let seo: SEOProps = {
    pathname: ctx.asPath,
    title: 'Search'
  };

  return {
    initialQuery: query,
    initialHits: hits,
    seo
  };
};

export default SearchPage;
