import { ReactNode } from 'react';
import '../styles/globals.css';
import Layout from '@/components/Layout';
import { SelectionContextProvider } from '../context/SelectionContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  return (
    <SelectionContextProvider>
      <html lang="nl">
        <head></head>
        <body>
          <Layout>{children}</Layout>
        </body>
      </html>
    </SelectionContextProvider>
  );
}
