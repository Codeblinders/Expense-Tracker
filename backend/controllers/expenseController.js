import expenseModel from "../models/expenseSchema.js";


const parseAndValidateDate = (dateStr, res) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    res.status(400).json({
      success: false,
      message: `Invalid date format for field 'date'. Please provide YYYY-MM-DD.`,
    });
    return null;
  }
  return d;
};

const addExpense = async (req, res) => {
  const userId = req.user?.id;
  const { title, amount, type, category, date,description} = req.body;
  if (!title || !amount || !category || !date|| !description ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required except type",
    });
  }

  // 1) parse & validate
  const parsedDate = parseAndValidateDate(date, res);
  if (!parsedDate) return;

  // 2) validate amount
  const parseAmount = Number(amount);
  if (isNaN(parseAmount) || parseAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be a positive number",
    });
  }

  try {
    // 3) pass real Date object
    const newExpense = new expenseModel({
      userId,
      title,
      amount: parseAmount,
      type: type || "expense",
      category, 
      date: parsedDate,
      description,
    });
    await newExpense.save();

    res.status(200).json({
      success: true,
      message: "Expense Added",
      data: newExpense,
    });
  } catch (error) {
    // 4) catch date CastErrors explicitly
    if (error.name === "CastError" && error.path === "date") {
      return res.status(400).json({
        success: false,
        message: `Invalid date format for field 'date'. Please provide YYYY-MM-DD.`,
      });
    }
    console.error("Error saving expense:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await expenseModel.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "expense deleted",
            expense,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, type, category, description, date } = req.body;

    try {
        const expenseUpdate = await expenseModel.findById(id);
        if (!expenseUpdate) {
            return res.status(404).json({
                success: false,
                message: "expense not found to update",
            });
        }

        if (!title && !amount && !type && !category && !description && !date) {
            return res.status(400).json({
                success: false,
                message: "at least one field is required to update",
            });
        }

        if (amount && (isNaN(Number(amount)) || Number(amount) <= 0)) {
            return res.status(400).json({
                success: false,
                message: "amount must be a positive number",
            });
        }

        expenseUpdate.title = title || expenseUpdate.title;
        expenseUpdate.amount = amount ? Number(amount) : expenseUpdate.amount;
        expenseUpdate.type = type || expenseUpdate.type;
        expenseUpdate.category = category || expenseUpdate.category;
                expenseUpdate.date = date || expenseUpdate.date;
        expenseUpdate.description = description || expenseUpdate.description;

        await expenseUpdate.save();

        res.status(200).json({
            success: true,
            message: "expense updated",
            data: expenseUpdate,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    const expense = await expenseModel.find({ userId: userId });
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export { addExpense, deleteExpense, updateExpense, getExpense };