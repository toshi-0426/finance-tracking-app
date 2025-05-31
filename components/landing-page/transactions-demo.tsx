import { CirclePlus } from "lucide-react";
import Button from "../button";
import { sizes, variants } from "@/lib/variants";
import TransactionListDemo from "./transaction-list-demo";

export default function TransactionsDemo() {

    
    return (
        <section className="mx-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Transactions</h3>
                <Button className={`flex items-center space-x-1 cursor-pointer ${variants['outline']} ${sizes['xs']}`}>
                    <CirclePlus className="w-3 h-3"/>
                    <div className="text-[10px]">Add</div>
                </Button>
            </div>
           <TransactionListDemo />
        </section>
    )
}