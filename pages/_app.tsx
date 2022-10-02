import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps<{ title?: string }>) {
  return (
    <Layout title={pageProps.title ?? Component.displayName}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
