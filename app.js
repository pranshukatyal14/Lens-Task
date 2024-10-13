const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./api/auth.api');
const taskRoutes = require('./api/task.api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swaggerConfig');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
