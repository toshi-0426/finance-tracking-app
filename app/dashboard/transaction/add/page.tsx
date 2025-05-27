import BackButton from "@/components/back-button";
import { Metadata } from "next";
import TransactionForm from "../../components/transaction-form";

export const metadata: Metadata = {
  title: "Add Transaction"   
};


export default function Page(){
    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
            <BackButton className="mb-8"/>
            <TransactionForm />
        </>
    )
}