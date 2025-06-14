import React from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = "https://expense-tracker-ob8q.onrender.com";

  // Initialize token from cookies
  const [token, setToken] = useState(() => Cookies.get("token") || "");
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // Fetch income data
  const fetchIncome = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/getincome`);
      if (data.success) {
        setIncomeData(data.data || []);
      } else {
        setIncomeData([]);
      }
    } catch (error) {
     if (error.response && error.response.status === 401) {
      navigate("/login");
      toast.error("Session expired. Please log in again.");
    } else {
      console.error("fetchIncome error:", error);
      toast.error("Failed to load income data.");
    }
    }
  };

  // Fetch expense data
const fetchExpense = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/getexpense`);
    if (data.success) {
      setExpenseData(data.data || []);
    } else {
      setExpenseData([]);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login");
      toast.error("Session expired. Please log in again.");
    } else {
      console.error("fetchExpense error:", error);
      toast.error("Failed to load expense data.");
    }
  }
};

  // Handle user registration
  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        Cookies.set("token", data.token, { expires: 7 });
        setToken(data.token);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Registration successful");
        navigate("/");
      }
    } catch (error) {
      console.error("handleRegister error:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  // Handle user login
  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        Cookies.set("token", data.token, { expires: 7 });
        setToken(data.token);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("handleLogin error:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };


// Add income record
const addIncome = async ({ title, amount, category, date, description }) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/addIncome`,
      { title, amount, category, date, description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
      fetchIncome();
      navigate("/");
    }
  } catch (error) {
    console.error("addIncome error:", error);
    toast.error(error.response?.data?.message || "Could not add income.");
  }
};

// Add expense record
const addExpense = async ({ title, amount, category, date, description }) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/addExpense`,
      { title, amount, category, date, description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
      fetchExpense();
      navigate("/");
    }
  } catch (error) {
    console.error("addExpense error:", error);
    toast.error(error.response?.data?.message || "Could not add expense.");
  }
};


  const deleteIncome = async (id) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/api/user/deleteIncome/${id}`);
    if (data.success) {
      toast.success("Income deleted");
      fetchIncome();
    }
  } catch (error) {
    console.error("deleteIncome error:", error);
    toast.error("Failed to delete income");
  }
};

const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/api/user/deleteExpense/${id}`);
    if (data.success) {
      toast.success("Expense deleted");
      fetchExpense();
    }
  } catch (error) {
    console.error("deleteExpense error:", error);
    toast.error("Failed to delete expense");
  }
};


  const logout = () => {
  // Cookies.remove("token");
  setToken(false);
  setIncomeData([]);     
  setExpenseData([]);
  navigate("/login");
};


  // Configure axios and fetch on initial mount
 useEffect(() => {
  const tokenInCookie = Cookies.get("token");
  if (tokenInCookie) {
    setToken(tokenInCookie);
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenInCookie}`;
    fetchIncome();
    fetchExpense();
  }
}, []);


  // Update axios authorization header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const value = {
    token,
    setToken,
    incomeData,
    expenseData,
    handleRegister,
    handleLogin,
    fetchIncome,
    fetchExpense,
    addIncome,
    addExpense,
  logout,   
  deleteExpense,
  deleteIncome,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
