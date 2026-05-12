import React, { useState } from 'react';
import { transactionAPI } from '../services/api';

export const TransactionList = ({ transactions, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await transactionAPI.delete(id);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Recent Transactions</h3>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No transactions yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition flex justify-between items-center"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-white">{transaction.description}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-gray-400">
                    {transaction.category?.name || 'Uncategorized'}
                  </span>
                  <span className="text-gray-500">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`text-xl font-bold ${
                  transaction.category?.type === 'income' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.category?.type === 'income' ? '+' : '-'}₹{formatAmount(transaction.amount)}
                </div>

                <button
                  onClick={() => handleDelete(transaction.id)}
                  disabled={loading}
                  className="text-gray-400 hover:text-red-400 transition disabled:text-gray-600"
                  title="Delete transaction"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
