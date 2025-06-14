import { useContext } from "react";
import React from "react";
import { AppContext } from "../context/Appcontext";
import { motion } from "framer-motion";

const ViewTransactions = () => {
  const { incomeData, expenseData } = useContext(AppContext);

  const allTransactions = [...incomeData.map(t => ({ ...t, type: 'income' })), ...expenseData.map(t => ({ ...t, type: 'expense' }))];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="text-3xl font-bold text-center text-white py-8 bg-white/5 border-b border-white/10 tracking-wide">
          All Transactions
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 uppercase text-sm">
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-12 italic animate-pulse">
                    No transactions available.
                  </td>
                </tr>
              ) : (
                allTransactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-t border-white/10 hover:bg-white/10 transition-colors duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-300">{transaction.type}</td>
                      <td
                        className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}
                      >
                        ₹{transaction.amount}
                      </td>
                    </motion.tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default ViewTransactions;
