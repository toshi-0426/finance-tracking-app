import type { Metadata } from 'next';
import { Providers as ThemeProviders } from './providers';
import './globals.css';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'Finance Tracker',
    template: '%s | Finance Tracker',
  },
  description:
    'Track your personal expenses and analyze spending trends—all in one modern dashboard',
  icons: {
    icon: '/icons/finance-app-icon.svg',
    apple: '/icons/finance-app-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased min-h-screen flex flex-col px-8`}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
