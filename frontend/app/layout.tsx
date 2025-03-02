import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import ReactQueryProvider from '../components/react-query-provider';
import { TooltipProvider } from '../components/ui/tooltip';
import './globals.css';

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
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
