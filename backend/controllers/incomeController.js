import incomeModel from "../models/incomeSchema.js";


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

const addIncome = async (req, res) => {
  const userId = req.user?.id;
  const { title, amount, type, category, date,description } = req.body;
  if (!title || !amount || !category || !description || !date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required except type",
    });
  }

  // 1) parse & validate
  const parsedDate = parseAndValidateDate(date, res);
  if (!parsedDate) return;               // parseAndValidateDate already sent 400

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
    const newIncome = new incomeModel({
      userId,
      title,
      amount: parseAmount,
      type: type || "income",
      category,
      date: parsedDate,
      description,
      
    });
    await newIncome.save();

    res.status(200).json({
      success: true,
      message: "Income Added",
      data: newIncome,
    });
  } catch (error) {
    // 4) catch any remaining CastErrors
    if (error.name === "CastError" && error.path === "date") {
      return res.status(400).json({
        success: false,
        message: `Invalid date format for field 'date'. Please provide YYYY-MM-DD.`,
      });
    }
    console.error("Error saving income:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await incomeModel.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({
                success: false,
                message: "income not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "income deleted",
            income,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, type, category, description, date } = req.body;

    try {
        const incomeUpdate = await incomeModel.findById(id);
        if (!incomeUpdate) {
            return res.status(404).json({
                success: false,
                message: "income not found to update",
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

        incomeUpdate.title = title || incomeUpdate.title;
        incomeUpdate.amount = amount ? Number(amount) : incomeUpdate.amount;
        incomeUpdate.type = type || incomeUpdate.type;
        incomeUpdate.category = category || incomeUpdate.category;
        incomeUpdate.description = description || incomeUpdate.description;
        incomeUpdate.date = date || incomeUpdate.date;

        await incomeUpdate.save();

        res.status(200).json({
            success: true,
            message: "Income updated",
            data: incomeUpdate,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

const getIncome = async (req, res) => {
  try {
    const userId = req.user?.id;
    const income = await incomeModel.find({ userId: userId });
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export { addIncome, deleteIncome, updateIncome, getIncome };