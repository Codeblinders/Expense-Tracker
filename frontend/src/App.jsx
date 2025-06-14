import { useContext, useEffect } from "react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppContext } from './context/Appcontext';
import Sidebar from "./components/sidebar";
import History from "./components/History";
import Income from "./pages/income";
import './index.css'; // Ensure this file contains Tailwind directives
import Login from "./pages/login";
import Register from "./pages/register";
import Expenses from "./pages/expenses";
import IncomeTransactions from "./pages/IncomeTransac";
import ExpenseTransactions from "./pages/ExpenseTransac";
import ViewTransactions from "./pages/viewTransaction";
import Dashboard from "./pages/Dashboard";

// const { token } = useContext(AppContext);


const App = () => {
  const location = useLocation();
  const { token, fetchIncome, fetchExpense } = useContext(AppContext);

  // Routes where main layout (sidebar + panels) is hidden
  const hideMainLayout = [
    "/viewTransaction",
    "/addIncome",
    "/addExpense",
    "/incomeTransactions",
    "/expenseTransactions",
    "/login",
    "/register"
  ].includes(location.pathname);

  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, [token, location.pathname]);

  return (
    <div className="flex h-screen bg-rgb(10, 1, 18)">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content container */}
      <div className="flex-1 flex flex-col overflow-auto">
        {!hideMainLayout ? (
          <div className="p-4">
            <Routes>
              {/* Home: Dashboard + History side by side on large screens */}
              <Route
                path="/"
                element={
                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <div className="flex-1 bg-rgb(1, 5, 34) rounded-lg shadow p-4">
                      <Dashboard />
                    </div>
                    <div className="hidden lg:block lg:w-1/3 bg-rgb(1, 5, 34) rounded-lg shadow p-4">
                      <History />
                    </div>
                  </div>
                }
              />
              {/* Overview link shows History in main panel */}
              <Route
                path="/incomeExpense"
                element={
                  <div className="bg-rgb(1, 5, 34) rounded-lg shadow p-4">
                    <History />
                  </div>
                }
              />
            </Routes>
          </div>
        ) : (
          // Detail pages without sidebar layout
          <div className="p-4">
            <Routes>
              <Route path="/viewTransaction" element={<ViewTransactions />} />
              <Route path="/addIncome" element={<Income />} />
              <Route path="/addExpense" element={<Expenses />} />
              <Route path="/incomeTransactions" element={<IncomeTransactions />} />
              <Route path="/expenseTransactions" element={<ExpenseTransactions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
