import React, { useContext } from "react";
import { motion } from "framer-motion";
import Chart from "../components/chart";
import { AppContext } from "../context/Appcontext";

const Dashboard = () => {
  const { incomeData, expenseData } = useContext(AppContext);

  const totalIncome = incomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const totalBalance = totalIncome - totalExpense;

  const stats = [
    { id: "income", label: "Total Income", value: totalIncome, color: "text-green-400" },
    { id: "expense", label: "Total Expense", value: totalExpense, color: "text-red-400" },
  ];

  return (
    <section className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center sm:text-left">
          📊 Income vs Expense Overview
        </h2>
        <Chart incomeData={incomeData} expenseData={expenseData} />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl mx-auto">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col items-center text-white hover:shadow-xl"
          >
            <h4 className="text-lg font-medium text-gray-300 mb-2 text-center">
              {stat.label}
            </h4>
            <p className={`text-3xl font-bold ${stat.color}`}>
              ₹{stat.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </motion.div>
        ))}

        {/* Total Balance */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col items-center text-white hover:shadow-xl"
        >
          <h4 className="text-lg font-medium text-gray-300 mb-2 text-center">
            Total Balance
          </h4>
          <p
            className={`text-3xl font-bold ${
              totalBalance < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            ₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
