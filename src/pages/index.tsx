import React from 'react';
import Link from 'next/link';
import { actions, GetArticles } from '../shared/src/client';

interface Section {
  id: string,
  title: string
}

interface FeedItem extends GetArticles, Section {}

const sections: Section[] = [
  {
    id: 'News',
    title: 'News'
  },
  {
    id: 'Sports',
    title: 'Sports'
  },
  {
    id: 'Opinions',
    title: 'Opinions'
  },
  {
    id: 'inside-beat',
    title: 'Inside Beat'
  }
];


function Home({ 
  feed 
}: { 
  feed: FeedItem[]
}) {
  return (
    feed.map(category => (
      <React.Fragment key={category.id}>
        <h1>{category.title}</h1>
        {category.items.map(item => (
          <Link key={item.id} href={`/article/${item.id}`}>
            <p>{item.title}</p>
          </Link>
        ))}
      </React.Fragment>
    ))
  );
}

Home.getInitialProps = async () => {
  const feed = await Promise.all(sections.map(section => (
    actions.getArticles({
      category: section.id,
      limit: 20
    })
  )));
  return { 
    feed: feed.map((category, i) => ({
      ...category,
      ...sections[i]
    }))
  };
};

export default Home;