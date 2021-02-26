import { getArticles, getArticle } from '..';
import * as regex from '../../../regex';

let ID = '';
let SLUG = '';

describe("getArticle", () => {

  beforeAll(async (done) => {
    const res = await getArticles({
      category: 'News',
      limit: 1
    });
    ID = res.items[0].articles[0].id;
    SLUG = res.items[0].articles[0].slug;
    done();
  });

  it("getArticle by id schema", async (done) => {
    const res = await getArticle({
      id: ID
    });

    expect(res).toMatchObject({
      // @ts-ignore
      abstract: expect.anyOrNull(String),
      authors: expect.arrayContaining([expect.objectContaining({
        __typename: "Author",
        id: expect.stringMatching(regex.id),
        displayName: expect.any(String),
        slug: expect.any(String),
      })]),
      body: expect.any(String),
      category: expect.any(String),
      id: expect.stringMatching(regex.id),
      media: expect.arrayContaining([expect.objectContaining({
        __typename: "Media",
        // @ts-ignore
        altText: expect.anyOrNull(String),
        // @ts-ignore
        credits: expect.anyOrNull(String),
        // @ts-ignore
        description: expect.anyOrNull(String),
        url: expect.any(String)
      })]),
      publishDate: expect.any(Number),
      slug: expect.any(String),
      subcategory: expect.any(String),
      // @ts-ignore
      tags: expect.arrayContainingOrNull([expect.any(String)]),
      title: expect.any(String),
      updatedAt: expect.any(Number)
    });
    done();
  });

  it("getArticle by slug schema", async (done) => {
    const res = await getArticle({
      slug: SLUG
    });
    expect(res).toMatchObject({
      // @ts-ignore
      abstract: expect.anyOrNull(String),
      authors: expect.arrayContaining([expect.objectContaining({
        __typename: "Author",
        id: expect.stringMatching(regex.id),
        displayName: expect.any(String),
        slug: expect.any(String),
      })]),
      body: expect.any(String),
      category: expect.any(String),
      id: expect.stringMatching(regex.id),
      media: expect.arrayContaining([expect.objectContaining({
        __typename: "Media",
        // @ts-ignore
        altText: expect.anyOrNull(String),
        // @ts-ignore
        credits: expect.anyOrNull(String),
        // @ts-ignore
        description: expect.anyOrNull(String),
        url: expect.any(String)
      })]),
      publishDate: expect.any(Number),
      slug: expect.any(String),
      subcategory: expect.any(String),
      // @ts-ignore
      tags: expect.arrayContainingOrNull([expect.any(String)]),
      title: expect.any(String),
      updatedAt: expect.any(Number)
    });
    done();
  });

});