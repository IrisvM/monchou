import '../styles/globals.css';
import Layout from '@/components/Layout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head></head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
