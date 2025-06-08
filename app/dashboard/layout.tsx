import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Finance Tracker',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <div className="mt-auto mb-5 text-center pb-4 flex justify-center pt-16">
        <Footer />
      </div>
    </>
  );
}
