import type { Metadata } from 'next';
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
