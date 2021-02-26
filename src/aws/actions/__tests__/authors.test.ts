import { getAuthorBySlug } from '..';
import * as regex from '../../../regex';

let SLUG = 'madison-mcgay';

describe("authors", () => {

  it("getAuthor by slug schema", async (done) => {
    const res = await getAuthorBySlug({
      slug: SLUG
    });

    expect(res).toMatchObject({
      author: {
        __typename: "Author",
        id: expect.stringMatching(regex.id),
        displayName: expect.any(String),
        // @ts-ignore
        bio: expect.anyOrNull(String),
      },
      articles: expect.arrayContaining([
        expect.objectContaining({
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
      ])
    });
    done();
  });

});