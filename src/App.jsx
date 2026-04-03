// src/App.jsx
import React from 'react';
import { Layout } from './components/layout/Layout';
import { useFinance } from './context/FinanceContext';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { DashboardCharts } from './components/dashboard/DashboardCharts';
import { TransactionList } from './components/transactions/TransactionList';
import { Loader2 } from 'lucide-react'; // Import a spinner icon

function App() {
  const { view, isLoading } = useFinance();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
        
        {/* IF LOADING: Show a nice spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-indigo-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-gray-500 font-medium">Fetching financial data...</p>
          </div>
        ) : (
          /* IF LOADED: Show the actual app */
          <>
            {view === 'dashboard' && (
              <>
                <SummaryCards />
                <DashboardCharts />
              </>
            )}
            <TransactionList />
          </>
        )}
        
      </div>
    </Layout>
  );
}

export default App;