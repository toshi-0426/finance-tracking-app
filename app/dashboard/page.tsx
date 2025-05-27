import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    console.log(await supabase.from('transactions').select());
    return (
        <>  
            <section className="mb-8">
                <h1 className="text-4xl font-semibold">Summary</h1>
            </section>


            <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Income" />
                </Suspense>
                <Suspense fallback={<TrendFallback />} >
                    <Trend type="Expense" />
                </Suspense>
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Investment" />
                </Suspense>
                <Suspense fallback={<TrendFallback />}>
                    <Trend type="Saving" />
                </Suspense>
            </section>

            <section className="flex justify-between items-center">
                <h2 className="text-2xl">Transactions</h2>
                <Link href="/dashboard/transaction/add" 
                    className={`flex items-center mb-8 space-x-1 cursor-pointer ${variants['outline']} ${sizes['sm']}`}>
                    <CirclePlus className="w-4 h-4"/>
                    <div>Add</div>
                </Link>
            </section>

            <Suspense fallback={<TransactionListFallback />}>
                <TransactionList />
            </Suspense>
        </>
    )
}