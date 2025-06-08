import React from 'react';
import SideNavigation from './components/side-nav';
import BackButtonToDashboard from '@/components/back-button-to-dashboard';

export const metadata = {
  title: 'Settings',
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <BackButtonToDashboard className="mb-8" />
      <div className="grid grid-cols-4 gap-8">
        <aside className="col-span-4 lg:col-span-1">
          <SideNavigation />
        </aside>
        <div className="col-span-4 lg:col-span-3">{children}</div>
      </div>
    </>
  );
}
