import type {Metadata} from 'next';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { LoadingProvider } from '@/contexts/loading-context';
import { GlobalLoader } from '@/components/ui/global-loader';

export const metadata: Metadata = {
  title: 'Ritmo Saudável',
  description: 'Alcance seus objetivos de saúde, um hábito de cada vez.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Suspense fallback={null}>
          <LoadingProvider>
            {children}
            <Toaster />
            <GlobalLoader />
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  );
}
