import express from 'express'
import { getTasks } from '../controllers/taskController.js'

const router = express.Router()

router.get("/tasks",getTasks)

router.get("/completed", (req, res) => {
    res.send("Completed Tasks");
});

export default router