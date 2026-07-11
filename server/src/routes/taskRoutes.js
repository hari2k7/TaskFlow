import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    getATask,
    completeTask
} from "../controllers/taskController.js";

const router = Router();

router.post("/", authenticate, createTask);

router.get("/", authenticate, getAllTask);

router.put("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, deleteTask);

router.get("/:id", authenticate, getATask);

router.patch("/:id/complete", authenticate, completeTask);

export default router;