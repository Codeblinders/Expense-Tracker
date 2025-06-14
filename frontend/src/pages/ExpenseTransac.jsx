import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const ExpenseTransactions = () => {
  const { expenseData, deleteExpense } = useContext(AppContext);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="text-3xl font-bold text-center text-white py-6 bg-white/5 border-b border-white/10 tracking-wide">
          💸 Expense Transactions
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 uppercase text-xs">
                <th className="px-6 py-4 text-left">📝 Title</th>
                <th className="px-6 py-4 text-left">📂 Category</th>
                <th className="px-6 py-4 text-left">📅 Date</th>
                <th className="px-6 py-4 text-right">💰 Amount</th>
                <th className="px-6 py-4 text-center">🗑️ Action</th>
              </tr>
            </thead>

            <tbody>
              {expenseData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-10 italic animate-pulse">
                    No expense records found.
                  </td>
                </tr>
              ) : (
                expenseData.map((transaction, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-white/10 hover:bg-white/10 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-red-400 font-semibold whitespace-nowrap">
                      ₹{Number(transaction.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-300 hover:text-red-500 transition-colors duration-150"
                        onClick={() => deleteExpense(transaction._id)}
                      >
                        <FiTrash2 size={18} />
                      </motion.button>
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

export default ExpenseTransactions;
