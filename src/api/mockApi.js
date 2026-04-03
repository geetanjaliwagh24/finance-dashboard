// src/api/mockApi.js
import { initialTransactions } from '../data/mockData';

const DELAY = 800; // 800ms fake network latency
const STORAGE_KEY = 'finDash_transactions';

// Helper to get data from storage or load initial mock data
const getStoredData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions));
    return initialTransactions;
  }
  return JSON.parse(data);
};

export const mockApi = {
  // GET /transactions
  fetchTransactions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredData());
      }, DELAY);
    });
  },

  // POST /transactions
  addTransaction: (newTransaction) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = getStoredData();
        const updatedData = [newTransaction, ...currentData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        resolve(newTransaction);
      }, DELAY);
    });
  },

  // DELETE /transactions/:id
  deleteTransaction: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = getStoredData();
        const updatedData = currentData.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        resolve(id);
      }, DELAY);
    });
  }
};