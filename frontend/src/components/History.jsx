import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import '../App.css'
import { AppContext } from "../context/Appcontext";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const History = () => {
  const { incomeData, expenseData } = useContext(AppContext);

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    const cleaned = price.toString().replace(/[^0-9.-]+/g, "");
    return parseFloat(cleaned) || 0;
  };

  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(0);
  const [minExpense, setMinExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);

  useEffect(() => {
    const incomePrices = incomeData.map((item) => parsePrice(item.amount));
    const expensePrices = expenseData.map((item) => parsePrice(item.amount));

    setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0);
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0);
    setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0);
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0);
  }, [incomeData, expenseData]);

  const totalIncome = incomeData.reduce((sum, item) => sum + parsePrice(item.amount), 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + parsePrice(item.amount), 0);

  const chartData = {
    labels: [
      "Total Income",
      "Total Expense",
      "Max Income",
      "Min Income",
      "Max Expense",
      "Min Expense",
    ],
    datasets: [
      {
        data: [totalIncome, totalExpense, maxIncome, minIncome, maxExpense, minExpense],
        backgroundColor: [
          "#4ade80",
          "#f87171",
          "#facc15",
          "#93c5fd",
          "#a78bfa",
          "#fb923c",
        ],
        hoverBackgroundColor: [
          "#22c55e",
          "#ef4444",
          "#eab308",
          "#60a5fa",
          "#8b5cf6",
          "#f97316",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Income and Expense Breakdown",
        font: { size: 16, weight: "bold" },
        color: "var(--color-text)",
        padding: { top: 8, bottom: 16 },
      },
      legend: {
        position: "bottom",
        labels: { color: "var(--color-text)", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 font-sans bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
    
      <style>
        {`
          :root {
            --color-income: #4ade80;
            --color-expense: #f87171;
            --color-max-income: #facc15;
            --color-min-income: #93c5fd;
            --color-max-expense: #a78bfa;
            --color-min-expense: #fb923c;
            --color-income-hover: #22c55e;
            --color-expense-hover: #ef4444;
            --color-max-income-hover: #eab308;
            --color-min-income-hover: #60a5fa;
            --color-max-expense-hover: #8b5cf6;
            --color-min-expense-hover: #f97316;
            --color-text: #1f2937;
            --color-bg-glass: rgba(255, 255, 255, 0.15);
            --color-border-glass: rgba(255, 255, 255, 0.2);
            --backdrop-blur: blur(12px);
          }
          .dark {
            --color-text: #e5e7eb;
            --color-bg-glass: rgba(31, 41, 55, 0.15);
            --color-border-glass: rgba(229, 231, 235, 0.2);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: var(--color-bg-glass);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.5);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.7);
          }
          .custom-scrollbar {
            -ms-overflow-style: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.5) var(--color-bg-glass);
          }
        `}
      </style>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-white">
        Recent History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="space-y-3 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto custom-scrollbar backdrop-blur-sm bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Income</h2>
          {incomeData.length === 0 ? (
            <p className="text-white opacity-70 text-center text-sm sm:text-base">No income data available</p>
          ) : (
            incomeData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 sm:p-3 md:p-4 bg-[var(--color-bg-glass)] backdrop-blur-sm border border-[var(--color-border-glass)] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[var(--color-income)]">Rs.{item.amount}</p>
                </div>
                
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto custom-scrollbar backdrop-blur-sm bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Expenses</h2>
          {expenseData.length === 0 ? (
            <p className="text-white opacity-70 text-center text-sm sm:text-base flex flex-col justify-center">No expense data available</p>
          ) : (
            expenseData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 sm:p-3 md:p-4 bg-[var(--color-bg-glass)] backdrop-blur-sm border border-[var(--color-border-glass)] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[var(--color-expense)]">Rs. {item.amount}</p>
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 rounded-xl p-3 sm:p-4 md:p-6 bg-[var(--color-bg-glass)] backdrop-blur-sm border border-[var(--color-border-glass)] shadow-lg transition-all duration-300">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">
          Spend Overview
        </h2>
        <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] ">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default History;