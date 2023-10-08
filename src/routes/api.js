const express = require("express");
const TaskController = require("../controllers/taskController");
const userController = require("../controllrs/userController");
const authVerifyMiddleware = require("../controllers/authVerifyMiddleware");

const router = express.Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post(
    "/profileUpdate",
    authVerifyMiddleware.profileUpdate
);
router.get("/recoverVerifyEmail/:email", userController.recoverVerifyEmail);
router.get("/recoverVerifyOTP/:email", userController.recoverVerifyOTP);
router.post("/recoverResetPassword", userController.recoverResetPassword);

router.post("/createTask", authVerifyMiddleware, TaskController.createTask);
router.delete(
    "/deleteTask/:id",
    authVerifyMiddleware,
    taskController.deleteTask
);
router.get(
    "/updateTaskStatus/:id",
    authVerifyMiddleware,
    taskController.updateTaskStatus
);
router.get(
    "/listTaskByStatus/:status",
    authVerifyMiddleware,
    taskController.listTaskByStatus
);
router.get(
    "/taskStatusCount/:status",
    authVerifyMiddleware,
    taskController.taskStatusCount
);

module.exports = router;




