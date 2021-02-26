import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import * as React from 'react';
import { AspectRatioImage, Byline, Divider, FlatList, HighlightText, Link, Search, Section, Semantic, SEOProps, Text } from '../components';
import { actions, SearchHits } from '../aws';
import { useDispatch, useSelector } from '../store';
import { searchActions } from '../store/ducks/search';
import { extractTextFromHTML, imgix, processNextQueryStringParam } from '../utils';
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
  const hydrated = useSelector(s => s.search.hydrated);
  const hits = useSelector(s => s.search.hits) ?? (!hydrated ? initialHits : null);
  const hitsQuery = useSelector(s => s.search.hitsQuery);
  const hijacked = useSelector(s => s.search.hijacked);

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
    <Section className={styles.page}>
      {/* for SEO */}
      <h1 style={{display: 'none'}} aria-hidden={true}>Search</h1>

      <Semantic role='main' skipNavContent pritable style={{flex: 1}}>
        <div className={styles.searchWrap} style={{position: 'sticky', top: 60}}>
          <Search.Input
            enabled={hijacked}
            size={3}
            width='100%'
          />
        </div>

        {hits?.hits.length === 0 ? (
          <Text className={styles.noResults}>
            No search results for <b>{hitsQuery}</b>.
          </Text>
        ) : (
          <FlatList
            data={hits?.hits ?? []}
            keyExtractor={hit => hit._id}
            renderItem={(hit) => (
              <Link href={`/${hit._source.slug}`} className={styles.item}>
                <Semantic role='article' className={styles.row}>
                  <div className={styles.col}>
                    <Text variant='p' className={styles.category}>
                      {hit._source.category}
                    </Text>
                    <Text variant='h4' htmlTag='h2'>
                      <HighlightText search={query}>
                        {hit._source.title}
                      </HighlightText>
                    </Text>
                    <Byline.Compact
                      authors={hit._source.authors}
                      publishDate={hit._source.publishDate}
                    />
                    <Text.Truncate variant='p' numberOfLines={5}>
                      <HighlightText search={query}>
                        {extractTextFromHTML(hit._source.abstract ?? hit._source.body.match(/<p>.*<\/p>/)?.[0] ?? '')}
                      </HighlightText>
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
        )}
      </Semantic>

    </Section>
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
