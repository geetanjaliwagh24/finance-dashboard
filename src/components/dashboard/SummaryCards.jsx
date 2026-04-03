// src/components/dashboard/SummaryCards.jsx
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  // Helper to format numbers as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between transition-colors duration-200">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Balance</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(totalBalance)}</h3>
        </div>
        <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Wallet size={24} />
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between transition-colors duration-200">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight size={24} />
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between transition-colors duration-200">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
          <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(totalExpenses)}</h3>
        </div>
        <div className="h-12 w-12 bg-rose-50 dark:bg-rose-900/50 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400">
          <ArrowDownRight size={24} />
        </div>
      </div>
    </div>
  );
};