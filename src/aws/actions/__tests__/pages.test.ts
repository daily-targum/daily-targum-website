import { getPage } from '..';
import * as regex from '../../../regex';

describe("pages", () => {

  it("getPage schema", async (done) => {
    const res = await getPage({
      slug: 'about'
    });

    expect(res).toMatchObject({
      id: expect.stringMatching(regex.id),
      title: expect.any(String),
      published: expect.any(Boolean),
      slug: expect.any(String),
      content: expect.any(String)
    });

    done();
  });

});