import { Suspense } from 'react';
import TransactionListFallback from './components/transaction-list-fallback';
import Trend from './components/trend';
import TrendFallback from './components/trend-fallback';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { sizes, variants } from '@/lib/variants';
import { ErrorBoundary } from 'react-error-boundary';
import { RangeType, rangeTypes, types as trendTypes } from '@/lib/consts';
import Range from './components/range';
import TransactionListWrapper from './components/transaction-list-wrapper';
import { createClient } from '@/lib/supabase/server';
import { getUserProfileRange, insertUserProfile } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  const searchparams = await searchParams;
  const rawRange = searchparams?.range;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    throw new Error(
      "User is not authenticated or user's email is not identified"
    );
  }

  const user_id = user.id;
  const user_email = user.email;
  await insertUserProfile(user_id, user_email);
  const defaultRange = await getUserProfileRange(user_id);
  const range: RangeType = rangeTypes.includes(rawRange as RangeType)
    ? (rawRange as RangeType)
    : (defaultRange as RangeType);

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Suspense fallback={<div>Loading...</div>}>
            <Range defaultRange={defaultRange} />
          </Suspense>
        </aside>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {trendTypes.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className="text-red-500">Cannot fetch {type} trend data</div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      <section className="flex justify-between items-center">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center mb-8 space-x-1 cursor-pointer ${variants['outline']} ${sizes['sm']}`}
        >
          <CirclePlus className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  );
}
