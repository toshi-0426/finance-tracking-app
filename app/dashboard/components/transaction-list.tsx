import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { Transaction} from "@/lib/consts";
import { groupAndSumTransactionsByDate } from "@/lib/utils";



function parseYearMonthDate(date: string): Date {
    const [year, month, dAte] = date.split('-').map(Number);
    return new Date(year, month, dAte);
};


export default async function TransactionList () {
    const response = await fetch(`${process.env.API_URL}/transactions`, {
        next: {
            tags: ['transaction-list']
        }
    });
    const transactions: Transaction[] = await response.json();
    const groupedTransactions = groupAndSumTransactionsByDate(transactions ?? []);
    //console.log(groupedTransactions);

    return (
        <section className="space-y-4">
            {Object.entries(groupedTransactions)
                .map(([date, {transactions, amount}]) => (
                    <div key={date} className="mb-12">
                        <TransactionSummaryItem 
                            date={parseYearMonthDate(date)}
                            amount={amount}
                        />
                        <Separator />
                        <section className="space-y-2">
                            
                            {transactions.map(transaction => <div key={`${transaction.id}-${date}`}>
                                <TransactionItem {...transaction} />
                            </div>)}
                        </section>
                    </div>
            ))}
            {transactions.length === 0 
            && <div className="text-center text-gray-400 dark:text-gray-500">
                No transactions found 
            </div>}
        </section>
    )
}