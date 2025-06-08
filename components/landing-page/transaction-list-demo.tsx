import {
  HandCoins,
  Landmark,
  PiggyBank,
  SquarePen,
  Trash2,
  Wallet,
} from 'lucide-react';
import SeparatorDemo from './separator-demo';

export default function TransactionListDemo() {
  const data = [
    {
      date: '2025-03-15',
      type: 'Expense',
      description: 'cafe',
      category: 'Food',
      amount: '$5.00',
    },
    {
      date: '2025-03-13',
      type: 'Expense',
      description: 'Restaurant',
      category: 'Food',
      amount: '$30.00',
    },
    {
      date: '2025-03-5',
      type: 'Expense',
      description: 'Clothes',
      category: 'Clothes',
      amount: '$5.00',
    },
    {
      date: '2025-03-5',
      type: 'Expense',
      description: 'Phone bill',
      category: 'Phone',
      amount: '$20.00',
    },
    {
      date: '2025-02-27',
      type: 'Income',
      description: 'Monthly salary',
      category: '',
      amount: '$2,500.00',
    },
  ];

  const typesMap = {
    Income: {
      icon: HandCoins,
      colors: 'text-green-500 dark:text-green-400',
    },
    Expense: {
      icon: Wallet,
      colors: 'text-red-500 dark:text-red-400',
    },
    Investment: {
      icon: Landmark,
      colors: 'text-yellow-500 dark:text-yellow-400',
    },
    Saving: {
      icon: PiggyBank,
      colors: 'text-indigo-500 dark:text-indigo-400',
    },
  };
  const IconIncome = typesMap['Income'].icon;
  const IconExpense = typesMap['Expense'].icon;

  return (
    <div>
      <section className="flex text-gray-500 dark:text-gray-400 font-semibold">
        <div className="grow text-sm">{`${data[0].date}`}</div>
        <div className="min-w-[70px] text-right font-semibold text-sm">
          -$5.00
        </div>
        <div className="min-w-[50px]"></div>
      </section>
      <SeparatorDemo />
      <section className="mb-4">
        <div className="w-full flex items-center">
          <div className="flex items-center mr-4 grow">
            <IconExpense className="text-green-500 mr-2 w-4 h-4 hidden sm:block" />
            <span>{data[0].description}</span>
          </div>
          <div className="min-w-[50px] text-right">{data[0].amount}</div>
          <div className="min-w-[50px] flex justify-end items-center space-x-2">
            <SquarePen className="w-3 h-3 cursor-pointer" />
            <Trash2 className="w-3 h-3 cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="flex text-gray-500 dark:text-gray-400 font-semibold">
        <div className="grow text-sm">{`${data[1].date}`}</div>
        <div className="min-w-[70px] text-right font-semibold text-sm">
          -$30.00
        </div>
        <div className="min-w-[50px]"></div>
      </section>
      <SeparatorDemo />
      <section className="mb-4">
        <div className="w-full flex items-center">
          <div className="flex items-center mr-4 grow">
            <IconExpense className="text-green-500 mr-2 w-4 h-4 hidden sm:block" />
            <span>{data[1].description}</span>
          </div>
          <div className="min-w-[50px] text-right">{data[1].amount}</div>
          <div className="min-w-[50px] flex justify-end items-center space-x-2">
            <SquarePen className="w-3 h-3 cursor-pointer" />
            <Trash2 className="w-3 h-3 cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="flex text-gray-500 dark:text-gray-400 font-semibold">
        <div className="grow text-sm">{`${data[2].date}`}</div>
        <div className="min-w-[70px] text-right font-semibold text-sm">
          -$25.00
        </div>
        <div className="min-w-[50px]"></div>
      </section>
      <SeparatorDemo />
      <section className="mb-4">
        <div className="w-full flex items-center">
          <div className="flex items-center mr-4 grow">
            <IconExpense className="text-green-500 mr-2 w-4 h-4 hidden sm:block" />
            <span>{data[2].description}</span>
          </div>
          <div className="min-w-[50px] text-right">{data[2].amount}</div>
          <div className="min-w-[50px] flex justify-end items-center space-x-2">
            <SquarePen className="w-3 h-3 cursor-pointer" />
            <Trash2 className="w-3 h-3 cursor-pointer" />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="flex items-center mr-4 grow">
            <IconExpense className="text-green-500 mr-2 w-4 h-4 hidden sm:block" />
            <span>{data[3].description}</span>
          </div>
          <div className="min-w-[50px] text-right">{data[3].amount}</div>
          <div className="min-w-[50px] flex justify-end items-center space-x-2">
            <SquarePen className="w-3 h-3 cursor-pointer" />
            <Trash2 className="w-3 h-3 cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="flex text-gray-500 dark:text-gray-400 font-semibold">
        <div className="grow text-sm">{`${data[4].date}`}</div>
        <div className="min-w-[70px] text-right font-semibold text-sm">
          $2500.00
        </div>
        <div className="min-w-[50px]"></div>
      </section>
      <SeparatorDemo />
      <section className="mb-4">
        <div className="w-full flex items-center">
          <div className="flex items-center mr-4 grow">
            <IconIncome className="text-green-500 mr-2 w-4 h-4 hidden sm:block" />
            <span>{data[4].description}</span>
          </div>
          <div className="min-w-[50px] text-right">{data[4].amount}</div>
          <div className="min-w-[50px] flex justify-end items-center space-x-2">
            <SquarePen className="w-3 h-3 cursor-pointer" />
            <Trash2 className="w-3 h-3 cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
}
