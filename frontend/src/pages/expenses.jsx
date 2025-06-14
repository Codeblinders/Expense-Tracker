import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";

const Expenses = () => {
  const { addExpense } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidDate(formData.date)) {
      toast.error("📅 Invalid date. Please select a valid one.");
      return;
    }
    try {
      await addExpense({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description,
      });
      setFormData({
        title: "",
        amount: "",
        type: "",
        category: "",
        description: "",
        date: "",
      });
      toast.success("✅ Expense added successfully!");
    } catch (err) {
      console.error("Expense submission failed:", err);
      toast.error("❌ Failed to add expense. Try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-white"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          🧾 Add New Expense
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2">📝 Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Groceries, Rent..."
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">💰 Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-2">📂 Category</label>
            <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="bg-gray-800 text-white border border-white/20 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
  required
>
  <option value="" disabled className="bg-gray-800 text-white">-- Select Category --</option>
  <option value="Food" className="bg-gray-800 text-white">🍔 Food</option>
  <option value="Bills" className="bg-gray-800 text-white">💡 Bills</option>
  <option value="Shopping" className="bg-gray-800 text-white">🛍️ Shopping</option>
  <option value="Transport" className="bg-gray-800 text-white">🚗 Transport</option>
  <option value="Health" className="bg-gray-800 text-white">🏥 Health</option>
  <option value="Subscription" className="bg-gray-800 text-white">📺 Subscription</option>
  <option value="Gifts" className="bg-gray-800 text-white">🎁 Gifts</option>
  <option value="Personal" className="bg-gray-800 text-white">🧘 Personal</option>
  <option value="Household" className="bg-gray-800 text-white">🏠 Household</option>
  <option value="Other" className="bg-gray-800 text-white">🔖 Other</option>
</select>

          </div>

          {/* Description & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2">🖊️ Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Details about this expense..."
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">📅 Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-colors duration-300 text-white font-semibold py-3 rounded-xl"
          >
            ➕ Add Expense
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Expenses;
