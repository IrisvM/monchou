import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { SearchContent } from './api/recipes';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ title?: string; search?: SearchContent }>) {
  return (
    <Layout
      title={pageProps.title ?? Component.displayName}
      searchContent={pageProps.search}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
