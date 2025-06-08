'use client';

import { useRouter } from 'next/navigation';
import Button from './button';
import { ArrowLeftFromLine } from 'lucide-react';

type BackButtonProps = {
  className?: string;
};

export default function BackButtonToDashboard({ className }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className={`${className}`}
      onClick={() => router.push('/dashboard')}
    >
      <ArrowLeftFromLine className="w-5 h-5" />
    </Button>
  );
}
