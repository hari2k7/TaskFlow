import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import logger from './middleware/logger.js'
import reqTime from './middleware/requestTime.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())

// middlewares
app.use(reqTime)
app.use(logger)

// routes
app.use("/", taskRoutes);
app.use("/api/tasks", taskRoutes)
app.use("completed", taskRoutes)
app.use('/api/users', userRoutes)

export default app;