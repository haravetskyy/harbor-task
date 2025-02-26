import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import ReactQueryProvider from '../components/react-query-provider';

export const metadata: Metadata = {
  title: 'Harbor Task',
  description: 'Pet application for task management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
