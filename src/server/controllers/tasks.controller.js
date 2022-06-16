const { successResponse, failResponse } = require("../helpers/methods")
const { Task } = require("../db");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.createTask = async (req, res) => {
    const { id: userId } = req.user;
    const task = new Task({
        userId: userId,
        title: req.body.title,
        description: req.body.description,
        list: req.body.list,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        status: req.body.status
    });
    res.json(successResponse(await task.save()));
}


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.updateTask = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, userId: userId });
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.list = req.body.list || task.list;
            task.startDate = req.body.startDate || task.startDate;
            task.priority = typeof req.body.priority !== 'undefined' ? req.body.priority : task.priority;
            task.status = req.body.status || task.status;
            res.status(201).json(successResponse(await task.save()));
        } else {
            res.status(404).json(failResponse('NOT_FOUND'));
        }
    } catch {
        res.status(500).json(failResponse('INTERNAL_ERROR'));

    }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { id: userId } = req.user;
        const task = await Task.findOne({ _id: taskId, userId: userId });
        if (task) {
            task.remove();
            res.status(204).json();
        } else {
            res.status(404).json(failResponse('NOT_FOUND'));
        }
    } catch {
        res.status(500).json(failResponse('INTERNAL_ERROR'));

    }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.getTask = (req, res) => {
    const { taskId } = req.params;
    const { id: userId } = req.user;
    Task.findOne({ userId: userId, _id: taskId }).then(task => {
        if (task)
            res.status(200).json(successResponse(task));
        else
            res.status(404).json(failResponse('NOT_FOUND'));
    }).catch((e) => {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    })
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns 
 */
exports.getAllTasks = (req, res) => {
    const { id: userId } = req.user;
    Task.find({ userId: userId }).then(tasks => {
        res.status(200).json(successResponse(tasks));
    }).catch((e) => {
        res.status(500).json(failResponse('INTERNAL_ERROR'));
        console.error(e);
    })
}