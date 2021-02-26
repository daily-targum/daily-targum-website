import * as React from 'react';
import { createMachine, assign } from '@xstate/fsm';
import { GetAuthorPage } from '../aws';
import { useMachine } from '@xstate/react/lib/fsm';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'idle'; context: MachineContext }
  | { value: 'loading'; context: MachineContext }
  | { value: 'outOfContent'; context: MachineContext };

type MachineContext = { 
  page?: GetAuthorPage;
};

type MachineEvent = 
  | { type: 'LOAD_MORE_CONTENT' }
  | { type: 'HYDRATE', page: GetAuthorPage }
  | { type: 'CONTENT_LOADED', page: GetAuthorPage }
  | { type: 'OUT_OF_CONTENT' };

export const authorPageMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'article',
  initial: 'dehydrated',
  context: {},
  states: {
    dehydrated: {
      on: {
        HYDRATE: {
          target: 'idle',
          actions: ['hydrate']
        }
      }
    },
    idle: {
      on: {
        LOAD_MORE_CONTENT: {
          target: 'loading'
        }
      }
    },
    loading: {
      on: {
        CONTENT_LOADED: {
          target: 'idle',
          actions: ['hydrate']
        },
        OUT_OF_CONTENT: {
          target: 'outOfContent'
        }
      }
    },
    outOfContent: {}
  }
}, {
  actions: {
    hydrate: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE' && evt.type !== 'CONTENT_LOADED') {
        return {};
      }

      const { page } = evt;

      const updatedContext = {
        page: {
          ...page,
          ...ctx.page,
          articles: [
            ...(ctx.page?.articles ?? []),
            ...page.articles
          ]
        }
      };
      
      return {
        ...ctx,
        ...updatedContext
      };
    })
  }
});

type UseAuthor = {
  initialPage: GetAuthorPage | null
  slug: string
}

export function useAuthorPage({
  initialPage,
  slug
}: UseAuthor): {
  page: GetAuthorPage | null;
  loadMore: () => any;
  loading: boolean;
  outOfContent: boolean
} {
  const [state, send] = useMachine(authorPageMachine);

  const { page } = state.context
  const lastArticle = page?.articles.slice(-1)[0];

  React.useEffect(() => {
    if (state.value === 'dehydrated' && initialPage) {
      send({
        type: 'HYDRATE',
        page: initialPage
      });
    }
  }, [initialPage, send, state.value]);

  // request more content for pagination
  React.useEffect(() => {
    if (state.value === 'loading' && lastArticle) {

      async function load() {
        const { actions } = await import('../aws');

        actions.getAuthorBySlug({
          slug,
          lastEvaluatedKey: lastArticle?.id,
          lastPublishDate: lastArticle?.publishDate
        })
        .then(newPage => {
          if (newPage && newPage.articles.length > 0) {
            send({
              type: 'CONTENT_LOADED',
              page: newPage
            });
          }
  
          else {
            send({
              type: 'OUT_OF_CONTENT'
            });
          }
        });

      }

      load();
    }
  }, [state.value, lastArticle, send, slug]);

  const loadMore = React.useCallback(
    () => send({
      type: 'LOAD_MORE_CONTENT'
    }),
    [send]
  );

  return {
    loadMore,
    page: page ?? initialPage,
    loading: state.value === 'loading',
    outOfContent: state.value === 'outOfContent'
  };
}