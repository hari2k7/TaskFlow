import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import logger from './middleware/logger.js'
import reqTime from './middleware/requestTime.js'

const app = express()

app.use(express.json())

// middlewares
app.use(reqTime)
app.use(logger)

// routes
app.use("/", taskRoutes);
app.use("/tasks", taskRoutes)
app.use("completed", taskRoutes)

export default app;