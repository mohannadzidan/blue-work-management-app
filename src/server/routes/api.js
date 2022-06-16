const express = require("express");
const { User } = require("../db");
const { failResponse, successResponse } = require("../helpers/methods");
const router = express.Router()
const authenticate = require('../middlewares/authenticate.middleware');
const { validate } = require("../middlewares/validators/wrapper.validator")
const { body, param } = require("express-validator")

const auth = require('../controllers/auth.controller');
const users = require('../controllers/users.controller');
const { getTask, patchTask: updateTask, getAllTasks, deleteTask, createTask } = require("../controllers/tasks.controller");


router.post('/api/auth/signUpEmailAndPassword', validate([
    body('email').isString().isLength({ min: 6, max: 32 }),
    body('password').isString().isLength({ min: 8, max: 24 }),
    body('firstName').isString().isLength({ min: 1, max: 24 }),
    body('lastName').isString().isLength({ min: 1, max: 24 }),
]), auth.signUpEmailAndPassword);

router.post('/api/auth/signInEmailAndPassword', validate([
    body('email').isString().isLength({ min: 6, max: 32 }),
    body('password').isString().isLength({ min: 8, max: 24 }),
]), auth.signInEmailAndPassword);

router.post('/api/auth/signOut', authenticate, auth.signOut);


router.get('/api/users/me', authenticate, users.me);


router.get('/api/tasks', authenticate, getAllTasks);
router.get('/api/tasks/:taskId', validate([
    param('taskId').exists()
]), authenticate, getTask);
router.patch('/api/tasks/:taskId', validate([
    param('taskId').exists()
]), authenticate, updateTask);
router.delete('/api/tasks/:taskId', validate([
    param('taskId').exists()
]), authenticate, deleteTask);
router.post('/api/tasks',validate([
    body('status').isString(),
    body('title').isString(),
    body('description').default('').isString(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('priority').isNumeric(),
]), authenticate, createTask);

router.use('/api/*', function (req, res) {
    res.status(404).json(failResponse('NOT_FOUND'));
})
module.exports = router
