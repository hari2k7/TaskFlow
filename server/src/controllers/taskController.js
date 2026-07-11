import { createTaskService, getAllTaskService, updateTaskService, deleteTaskService, getATaskService, completeTaskService } from "../services/taskService.js"

export async function createTask(req, res) {
    try {
        const task = await createTaskService(
            req.body,
            req.user.id
        )

        return res.status(201).json({
            success: true,
            task
        })

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}

export async function getAllTask(req, res) {
    try {
        const task = await getAllTaskService(req.user.id)

        return res.status(200).json({
            success: true,
            task
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export async function updateTask(req, res) {
    try {
        const updatedTask = await updateTaskService(
            req.params.id,
            req.body,
            req.user.id
        )

        return res.status(200).json({
            success: true,
            task: updatedTask
        })

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}

export async function deleteTask(req, res) {
    try {

        await deleteTaskService(
            req.params.id,
            req.user.id
        )

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export async function getATask(req, res) {
    try {
        const getATask = await getATaskService(
            req.params.id,
            req.user.id
        )

        return res.status(200).json({
            success: true,
            task: getATask
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export async function completeTask(req, res) {
    try {

        const task = await completeTaskService(
            req.params.id,
            req.body.completed,
            req.user.id
        )

        return res.status(200).json({
            success: true,
            task
        })

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}