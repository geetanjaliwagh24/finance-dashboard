// src/components/dashboard/DashboardCharts.jsx
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend
} from 'recharts';

// Colors for our Pie Chart
const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

export const DashboardCharts = () => {
  // Pull 'theme' from context so we can dynamically style the Recharts SVGs
  const { transactions, theme } = useFinance();

  // 1. Process data for the Expense Pie Chart (Categorical)
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, current) => {
      const existing = acc.find(item => item.name === current.category);
      if (existing) {
        existing.value += current.amount;
      } else {
        acc.push({ name: current.category, value: current.amount });
      }
      return acc;
    }, []);

  // 2. Process data for the Time-based chart
  const dataByDate = transactions.reduce((acc, current) => {
    const dateStr = current.date;
    if (!acc[dateStr]) acc[dateStr] = { date: dateStr, income: 0, expense: 0 };
    acc[dateStr][current.type] += current.amount;
    return acc;
  }, {});
  
  const timelineData = Object.values(dataByDate).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Dynamic styles for Recharts based on theme
  const chartStyles = {
    gridStroke: theme === 'dark' ? '#374151' : '#e5e7eb',
    textFill: theme === 'dark' ? '#9ca3af' : '#6b7280',
    tooltipBg: theme === 'dark' ? '#1f2937' : '#ffffff',
    tooltipBorder: theme === 'dark' ? '#374151' : '#e5e7eb',
    tooltipText: theme === 'dark' ? '#f3f4f6' : '#111827',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Time-Based Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cash Flow</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartStyles.gridStroke} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: chartStyles.textFill }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12, fill: chartStyles.textFill }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `$${val}`} 
              />
              <LineTooltip 
                formatter={(value) => `$${value}`}
                contentStyle={{
                  backgroundColor: chartStyles.tooltipBg,
                  borderColor: chartStyles.tooltipBorder,
                  color: chartStyles.tooltipText,
                  borderRadius: '0.5rem'
                }}
              />
              <Legend wrapperStyle={{ color: chartStyles.textFill }} />
              <Line type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" dataKey="expense" name="Expense" stroke="#f43f5e" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categorical Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Expenses by Category</h3>
        <div className="h-64">
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip 
                  formatter={(value) => `$${value}`}
                  contentStyle={{
                    backgroundColor: chartStyles.tooltipBg,
                    borderColor: chartStyles.tooltipBorder,
                    color: chartStyles.tooltipText,
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend wrapperStyle={{ color: chartStyles.textFill }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
               No expenses to show
             </div>
          )}
        </div>
      </div>

    </div>
  );
};