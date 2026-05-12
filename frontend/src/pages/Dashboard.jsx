import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { summaryAPI, categoryAPI, transactionAPI } from '../services/api';
import { Navbar } from '../components/Navbar';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';

export const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [summaryRes, transactionsRes, categoriesRes] = await Promise.all([
        summaryAPI.get().catch(() => null),
        transactionAPI.getAll(),
        categoryAPI.getAll(),
      ]);

      if (summaryRes) {
        setSummary(summaryRes.data);
      }
      setTransactions(transactionsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAdded = () => {
    setShowTransactionForm(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome, {user?.username || 'User'}!</h2>
          <p className="text-gray-400 mt-2">Manage your finances with ease</p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border border-green-700 p-6 rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Income</h3>
              <p className="text-4xl font-bold text-green-400">
                ₹{summary.income?.toLocaleString() || '0'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-700 p-6 rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Expenses</h3>
              <p className="text-4xl font-bold text-red-400">
                ₹{summary.expenses?.toLocaleString() || '0'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-700 p-6 rounded-2xl">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Balance</h3>
              <p className="text-4xl font-bold text-blue-400">
                ₹{summary.balance?.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm 
              categories={categories}
              onTransactionAdded={handleTransactionAdded}
            />
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} onRefresh={fetchData} />
          </div>
        </div>
      </div>
    </div>
  );
};
