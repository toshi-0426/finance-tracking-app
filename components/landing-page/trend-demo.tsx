import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

type TrendType = 'Income' | 'Expense' | 'Investment' | 'Saving';

interface TrendDemoProps {
  type: TrendType;
  amount: string;
  percentage: number;
}

export default function TrendDemo({
  type,
  amount,
  percentage,
}: TrendDemoProps) {
  const colorClasses = {
    Income: 'text-green-700',
    Expense: 'text-red-700',
    Investment: 'text-indigo-700',
    Saving: 'text-yellow-700',
  };

  return (
    <div>
      <div className={`text-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-xs font-semibold text-black mb-2">{amount}</div>
      <div className="flex space-x-1 items-center text-xs">
        {percentage <= 0 && <ArrowDownLeft className="text-red-700" />}
        {percentage > 0 && <ArrowUpRight className="text-green-700" />}
        {percentage}% vs last period
      </div>
    </div>
  );
}
