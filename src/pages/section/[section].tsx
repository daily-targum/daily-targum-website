import React from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section } from '../../components';

interface Section {
  id: string;
  title: string;
}

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

interface SectionWithExtras extends GetArticles, Section {}

function Category({ 
  section 
}: { 
  section: SectionWithExtras
}) {
  if(!section) return <NotFound/>;
  return (
    <Section>
      <>
        <h1>{section.title}</h1>
        {section.items.map(item => (
          <Link key={item.id} href={`/${item.slug}`}>
            <a>
              <p>{item.title}</p>
            </a>
          </Link>
        ))}
      </>
    </Section>
  );
}

Category.getInitialProps = async (ctx: NextPageContext) => {
  const selectedSection = sections.filter(
    s => s.id.toLowerCase() === (ctx.query.section as string).toLowerCase()
  )?.[0];
  if(!selectedSection) return {};

  const section = await actions.getArticles({
    category: selectedSection.id,
    limit: 20
  });
  return { 
    section: {
      ...selectedSection,
      ...section
    }
  };
};

export default Category;