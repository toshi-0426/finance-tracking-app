import { CircleUserRound, LogOut } from 'lucide-react';
import { FiMoon } from 'react-icons/fi';

export default function DemoHeader() {
  return (
    <header className="flex justify-between items-center">
      <div className="text-lg hover:underline hover:underline-offset-8 decoration-2">
        Finance Tracker
      </div>
      <div className="flex items-center space-x-2">
        <FiMoon className="w-4 h-4 cursor-pointer" />
        <div className="flex items-center space-x-1 p-1 rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500">
          <CircleUserRound className="w-4 h-4" />
          <p className="text-sm">Username</p>
        </div>
        <LogOut className="w-4 h-4 cursor-pointer" />
      </div>
    </header>
  );
}
