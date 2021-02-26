import { GetArticle, GetArticles } from '../articles';

export const ARTICLE: GetArticle = {
  abstract: 'With the Rutgers women’s basketball team’s exit from its conference tournament this past Thursday, the Scarlet Knights (22-9, 11-7) will now look toward Selection Monday for their seeding in the NCAA Tournament.  ',
  id: "05db0666-e54c-4a8d-a8e5-b9649ca36948",
  slug: "rutgers-ncaa-tournament-hopes-depend-on-team-wide-performance",
  title: "Rutgers' NCAA Tournament hopes depend on team-wide performance",
  authors: [{
    id: '1234',
    displayName: "Jon Doe",
    slug: 'jon-dow',
    headshot: 'https://dailytargum.imgix.net/images/0a4f6fb9-ec71-447b-8a56-6988830ff3fb.jpeg?ar=1:1&auto=compress&crop=faces,entropy&fit=crop&fm=webp&width=80'
  }],
  media: [{
    id: 'image-id',
    title: 'Title',
    url: "https://snworksceo.imgix.net/rdt/bb7e35ca-1fbf-4b4e-8b9b-c4daa6d0ce33.sized-1000x1000.JPG",
    altText: "fake image",
    description: "this image is fake",
    credits: 'Taken by Lord Snipp'
  }],
  publishDate: 1588602920,
  updatedAt: 1588602920,
  body: "",
  category: "News",
  subcategory: 'Subcategory',
  tags: null
};

export function getArticles({
  limit = 20
}: {
  limit: number
}): Promise<GetArticles> {
  let items = [];
  for(let i = 0; i < limit; i++) {
    items.push(ARTICLE as any);
  }
  return (async () => ({
    items,
    nextToken: 'asdfpoawejfoad',
    columnists: [],
    subcategories: ['sub-category']
  }))();
}

export function getArticle(): Promise<GetArticle> {
  return (async () => ARTICLE)();
}