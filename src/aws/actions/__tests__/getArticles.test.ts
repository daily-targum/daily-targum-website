import { getRandomInt } from '../../../utils';
import { getArticles } from '..';
import * as regex from '../../../regex';

const CAGETORIES = ['News', 'Sports', 'Opinions', 'inside-beat'];

describe("getArticles", () => {

  it("categories", async (done) => {
    let responses = await Promise.all(CAGETORIES.map(async category => {
      return await getArticles({ category, limit: 1 });
    }))
    responses.forEach(res => {
      expect(res.items[0].articles.length).toBeGreaterThan(0);
    });
    done();
  });

  it("limit", async (done) => {
    const limit = getRandomInt(1, 20);
    const res = await getArticles({
      category: 'News',
      limit
    });
    expect(res.items[0].articles.length).toBe(limit);
    done();
  });

  // it("nextToken", async (done) => {
  //   let res = await getArticles({
  //     category: 'News',
  //     limit: 5
  //   });
  //   const nextToken = res.nextToken;
  //   res = await getArticles({
  //     category: 'News',
  //     limit: 5
  //   });
  //   expect(res.items.length).toBeGreaterThan(0);
  //   expect(res.nextToken).not.toBe(nextToken);
  //   expect(res.nextToken).toMatch(/.+/);
  //   done();
  // });

  it("schema", async (done) => {
    const res = await getArticles({
      category: 'News'
    });
    
    res.items.forEach(item => {
      expect(item).toMatchObject({
        name: expect.any(String),
        articles: expect.arrayContaining([
          expect.objectContaining({
            authors: expect.arrayContaining([expect.objectContaining({
              __typename: "Author",
              displayName: expect.any(String),
            })]),
            category: expect.any(String),
            id: expect.stringMatching(regex.id),
            media: expect.arrayContaining([expect.objectContaining({
              __typename: "Media",
              url: expect.any(String)
            })]),
            publishDate: expect.any(Number),
            slug: expect.any(String),
            subcategory: expect.any(String),
            // @ts-ignore
            tags: expect.arrayContainingOrNull([expect.any(String)]),
            title: expect.any(String)
          })
        ]),
        __typename: 'SubArticleConnection'
      });
    });
    done();
  });

});