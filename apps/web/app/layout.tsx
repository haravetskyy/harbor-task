import { FilterProvider, ReactQueryProvider, ThemeProvider } from '@/providers';
import type { Metadata } from 'next';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import './globals.css';

const metadata: Metadata = {
  title: 'Harbor Task',
  description: 'Pet application for task management',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReactQueryProvider>
          <FilterProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </ThemeProvider>
          </FilterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
