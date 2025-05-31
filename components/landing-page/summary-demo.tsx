import Separator from "../separator";
import TrendDemo from "./trend-demo";

export default function SummaryDemo(){
    return (
        <section className="my-4 mx-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Summary</h1>
                <select className=" rounded-md text-xs border-gray-300 bg-white">
                    <option>last24hours</option>
                    <option>last7days</option>
                    <option>last30days</option>
                    <option>last3months</option>
                    <option>last6months</option>
                    <option>last12months</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-2 my-4">
                <TrendDemo type="Income" amount="$2,500.00" percentage={0.0} />
                <TrendDemo type="Expense" amount="$321.00" percentage={0.0} />
                <TrendDemo type="Investment" amount="$0.00" percentage={0.0} />
                <TrendDemo type="Saving" amount="$0.00" percentage={0.0} />
            </div>
            <Separator/>
        </section>
    )
}