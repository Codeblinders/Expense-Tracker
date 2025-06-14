import React, { useContext , useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.webp";
import { AppContext } from "../context/Appcontext";
import { GoGraph } from "react-icons/go";
import { FaRegCreditCard } from "react-icons/fa";
import { FaArrowsDownToLine, FaArrowsUpToLine, FaMoneyBillTrendUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { GiExpense } from "react-icons/gi";
import { IoLogOut, IoLogIn } from "react-icons/io5";

const Sidebar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false);
    Cookies.remove("token");
    window.location.href = '/';
  };
  

  const links = [
    { to: "/", icon: <GoGraph />, label: "Dashboard" },
    { to: "/viewTransaction", icon: <FaRegCreditCard />, label: "Transactions" },
    { to: "/incomeTransactions", icon: <FaArrowsDownToLine />, label: "Income" },
    { to: "/expenseTransactions", icon: <FaArrowsUpToLine />, label: "Expenses" },
    { to: "/addIncome", icon: <FaMoneyBillTrendUp />, label: "Add Income" },
    { to: "/addExpense", icon: <GiExpense />, label: "Add Expense" }, // <-- Added here
    { to: "/incomeExpense", icon: <GiExpense />, label: "Overview" }
  ];

  return (
    <aside className="bg-gradient-to-br from-[#0c0a24] via-[#050134] to-[#14001d] w-20 md:w-64 p-4 flex flex-col justify-between backdrop-blur-lg bg-white/5 z-50">
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Expense Tracker Logo" className="w-10 h-10 md:w-12 md:h-12" />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block text-white text-2xl font-bold tracking-wide"
        >
          Expense Tracker
        </motion.span>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
               `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 hover:bg-white/10 ${
                isActive ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md' : 'text-gray-300'}`
            }
          >
            <span className="text-2xl">{icon}</span>
            <span className="hidden md:inline text-lg font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Authentication Link */}
      <div className="px-4 py-4 border-t border-gray-700">
        {!token ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded-2xl transition-all duration-200 hover:bg-white/10 ${
                isActive ? 'bg-blue-600 text-white shadow' : 'text-gray-300'
              }`
            }
          >
            <IoLogIn className="text-2xl" />
            <span className="hidden md:inline text-lg font-semibold">Login</span>
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-2 rounded-2xl text-gray-300 hover:bg-white/10 transition-all duration-200"
          >
            <IoLogOut className="text-2xl" />
            <span className="hidden md:inline text-lg font-semibold">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
