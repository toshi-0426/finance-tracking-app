import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { ErrorBoundary } from "react-error-boundary";
import { types as trendTypes } from "@/lib/consts";
import Range from "./components/range";
//import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    
    return (
        <div className="space-y-8">  

            <section className="mb-8 flex justify-between items-center">
                <h1 className="text-4xl font-semibold">Summary</h1>
                <aside>
                    <Range/>
                </aside>

            </section>

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {trendTypes.map(type => <ErrorBoundary 
                    key={type}
                    fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}
                    >
                    <Suspense fallback={<TrendFallback />}>
                        <Trend type={type} />
                    </Suspense>
                </ErrorBoundary> )}
                
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
        </div>
    )
}