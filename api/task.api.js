const express = require('express');
const { protect, auth } = require('../middlewares/auth');
const { createTask, getTasks } = require('../controllers/task.controller');
const { authorizeRoles } = require('../middlewares/role');
const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Task 1
 *               description:
 *                 type: string
 *                 example: This is task 1
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-10-15
 *               priority:
 *                 type: string
 *                 example: High
 *     responses:
 *       200:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/tasks', auth, authorizeRoles('Admin', 'Manager'), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get('/tasks', auth, getTasks);


// router.post('/tasks', auth, authorizeRoles('Admin', 'Manager'), createTask);
// router.get('/tasks', auth, getTasks);

module.exports = router;
