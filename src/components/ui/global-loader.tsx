'use client';

import { useLoading } from '@/contexts/loading-context';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GlobalLoader() {
  const { isLoading } = useLoading();

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <Loader className="w-12 h-12 animate-spin text-primary" />
    </div>
  );
}
