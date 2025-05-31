import DemoHeader from "./demo-header";
import SummaryDemo from "./summary-demo";
import TransactionsDemo from "./transactions-demo";

export default function AppDemo() {
    return (
        <div className="container mx-auto px-6 py-4 flex justify-center">
            <div className="max-w-[500px] w-full bg-white border border-gray-200 rounded-lg p-6 shadow">
                <DemoHeader />
                <SummaryDemo />
                <TransactionsDemo />
            </div>
        </div>
     
    )
}