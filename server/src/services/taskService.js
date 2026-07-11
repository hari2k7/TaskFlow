import pool from "../config/db.js";

export async function createTaskService(taskData, userId) {
    const { title, description } = taskData

    if (!title) {
        throw new Error("Title is required")
    }

    const result = await pool.query(
        `INSERT INTO tasks (title, description, user_id)
        VALUES($1, $2, $3)
        RETURNING *`,
        [title, description, userId]
    )

    return result.rows[0]
}

export async function getAllTaskService(userId) {

    const result = await pool.query(
        `SELECT *
        FROM tasks
        WHERE user_id = $1`,
        [userId]
    )

    return result.rows

}

export async function updateTaskService(taskId, taskData, userId) {
    const { title, description } = taskData

    if (!title) {
        throw new Error("Title is required")
    }

    const result = await pool.query(
        `UPDATE tasks
        SET title = $1, description = $2
        WHERE id = $3 AND user_id = $4
        RETURNING *`,
        [title, description, taskId, userId]
    )

    if (result.rows.length === 0) {
        throw new Error("Task not found");
    }

    return result.rows[0]
}

export async function deleteTaskService(id, userId) {

    const result = await pool.query(
        `DELETE FROM tasks
        WHERE id = $1
        AND user_id = $2
        RETURNING *;`,
        [id, userId]
    )

    if (result.rows.length === 0) {
        throw new Error("Task not found");
    }

    return result.rows[0];

}

export async function getATaskService(taskId, userId) {

    const result = await pool.query(
        `SELECT * FROM tasks
        WHERE id = $1 AND user_id = $2`,
        [taskId, userId]
    )

    if (result.rows.length === 0) {
        throw new Error("Task not found or you are not authorized")
    }

    return result.rows[0]

}