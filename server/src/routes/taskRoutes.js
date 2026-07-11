import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    getATask
} from "../controllers/taskController.js";

const router = Router();

router.post("/", authenticate, createTask);

router.get("/", authenticate, getAllTask);

router.put("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, deleteTask);

router.get("/:id", authenticate, getATask);

export default router;