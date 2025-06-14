import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";

const Income = () => {
  const { addIncome } = useContext(AppContext);
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
      toast.error("❌ Invalid date. Please select a valid date.");
      return;
    }
    try {
      await addIncome({
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
      toast.success("✅ Income added successfully!");
    } catch (err) {
      console.error("Income submission failed:", err);
      toast.error("❌ Failed to add income. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-white"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">💰 Add Income</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className=" mb-2">📝 Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Income title"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">💵 Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
  <label className="text-gray-200 mb-1">Category</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="bg-gray-800 text-white border border-white/20 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
    required
  >
    <option value="" disabled className="bg-gray-800 text-white">-- Select Category --</option>
    <option value="salary" className="bg-gray-800 text-white">💼 Salary</option>
    <option value="investment" className="bg-gray-800 text-white">📈 Investment</option>
    <option value="gift" className="bg-gray-800 text-white">🎁 Gift</option>
    <option value="other" className="bg-gray-800 text-white">🔖 Other</option>
  </select>
</div>


          {/* Description & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2">🗒️ Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
               
                placeholder="Enter description"
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
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-600 hover:to-green-600 transition-colors duration-300 text-white font-semibold py-3 rounded-xl"
          >
            ✅ Submit Income
          </motion.button>

          
        </form>
      </motion.div>
    </section>
  );
};

export default Income;
