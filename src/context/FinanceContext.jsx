// src/context/FinanceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../api/mockApi';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('VIEWER'); 
  const [view, setView] = useState('dashboard');
  
  //Loading states for our API
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false); // For add/delete buttons

  // NEW: Theme State (Checks local storage, defaults to light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('finDash_theme') || 'light';
  });

  // NEW: Theme Effect (Applies class to HTML and saves to storage)
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('finDash_theme', theme);
  }, [theme]);

  // NEW: Toggle function
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 1. Fetch data on initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Async Actions
  const addTransaction = async (newTransaction) => {
    if (role !== 'ADMIN') return;
    setIsActionLoading(true);
    try {
      await mockApi.addTransaction(newTransaction);
      // Update local state only AFTER successful API call
      setTransactions([newTransaction, ...transactions]);
    } catch (error) {
      console.error("Failed to add transaction", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    if (role !== 'ADMIN') return;
    setIsActionLoading(true);
    try {
      await mockApi.deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  // 3. Derived State (Calculations)
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider
      value={{
        transactions, role, view, isLoading, isActionLoading,
        theme,
        setRole, setView,
        toggleTheme,
        totalBalance, totalIncome, totalExpenses,
        addTransaction, deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};