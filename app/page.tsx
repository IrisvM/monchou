import Header from '@/components/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Monchou recepten pagina',
  description: 'De recepten pagina van Vincent en Iris',
};

export default function Home(): ReactNode {
  return (
    <>
      <Header>Monchou</Header>
      <section>
        <h1>
          Welkom bij de recepten pagina van Iris en Vincent! Hier vind je
          recepten die wij zelf hebben verzameld en hebben aangepast naar onze
          smaak. Gewoon omdat wij dat handig vinden voor onszelf. Maar doe er
          vooral je voordeel mee! Als je nog leuke suggesties hebt, horen wij
          het graag.
        </h1>
      </section>
    </>
  );
}
