import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { AIChatbot } from '@/components/chat/AIChatbot';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-72 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
      <AIChatbot />
    </div>
  );
}
