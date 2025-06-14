import { Line } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Chart = ({ incomeData, expenseData }) => {
  const getMonthYear = (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'short' };
    return newDate.toLocaleDateString('en-US', options);
  };

  const labels = [
    ...new Set([
      ...incomeData.map(item => getMonthYear(item.date)),
      ...expenseData.map(item => getMonthYear(item.date))
    ])
  ];

  const incomeAmounts = labels.map(label => {
    return incomeData.filter(item => getMonthYear(item.date) === label)
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);
  });

  const expenseAmounts = labels.map(label => {
    return expenseData.filter(item => getMonthYear(item.date) === label)
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeAmounts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Expense",
        data: expenseAmounts,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Income vs Expense"
      },
      legend: {
        position: "top"
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: $${Number(value).toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="p-6 flex flex-col  rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">All Transactions</h1>
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
