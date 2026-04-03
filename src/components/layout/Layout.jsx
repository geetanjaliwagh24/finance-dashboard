// src/components/layout/Layout.jsx
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { LayoutDashboard, ReceiptText, ShieldAlert, ShieldCheck, Moon, Sun } from 'lucide-react';

export const Layout = ({ children }) => {
  const { role, setRole, view, setView, theme, toggleTheme } = useFinance();

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-6 transition-colors duration-200">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          FinDash
        </div>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors w-full ${
              view === 'dashboard' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          
          <button 
            onClick={() => setView('transactions')}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors w-full ${
              view === 'transactions' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <ReceiptText size={20} />
            Transactions
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 transition-colors duration-200">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Overview</h1>
          
          <div className="flex items-center gap-4">
            {/* NEW: Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Role Toggle */}
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setRole('VIEWER')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'VIEWER' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <ShieldCheck size={16} />
                Viewer
              </button>
              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'ADMIN' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <ShieldAlert size={16} />
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 overflow-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};