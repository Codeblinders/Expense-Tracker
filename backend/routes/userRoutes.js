import express from "express"
import { Register, Login } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addIncome, deleteIncome, getIncome, updateIncome } from "../controllers/incomeController.js";
import { addExpense, deleteExpense, getExpense, updateExpense } from "../controllers/expenseController.js";

const userRouter = express.Router()

userRouter.post("/Register", Register);
userRouter.post("/Login", Login);
userRouter.post("/addIncome", authMiddleware, addIncome)
userRouter.put("/updateIncome/:id", authMiddleware, updateIncome)
userRouter.delete("/deleteIncome/:id", authMiddleware, deleteIncome)
userRouter.get("/getincome", authMiddleware, getIncome)

userRouter.post("/addExpense", authMiddleware, addExpense)
userRouter.put("/updateExpense/:id", authMiddleware, updateExpense)
userRouter.delete("/deleteExpense/:id", authMiddleware, deleteExpense)
userRouter.get("/getexpense", authMiddleware, getExpense)

export default userRouter;