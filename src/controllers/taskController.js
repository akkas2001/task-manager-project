const taskModel = require("../models/TaskModel");

///create  task
exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    taskModel.create(reqBody, (error, data) => {
        if(error) {
            res/status(400).json({
                status: "fail",
                data: error,
            });
        }
        else {
            res.status(200).json({
                status: "success",
                data: data,
            });
        }
    });
};

////delete task
exports.deleteTask = (req, res) => {
    let id = req.params.id;
    let query ={_id:id };
    taskModel.remove(query, (error, data) => {
        if(error){
            res.status(400).json({
                status:"fail",
                data:error,
            });
        }
        else {
            res.status(200).json({
                status: "success",
                data:data
            })
        }
    });
};

///update task

exports.updateTaskStatus = (req, res) => {
    let id = req.params.id;
    let status = req.paprams.status;
    let query = {_id:id };
    let reqBody = { status: status};

    taskModel.updateOne(query, reqBody, (error, data) => {
        if(error) {
            res.status(400).json({
                status: "fail",
                data: error,
            });
        }
        else {
            res.status(200).json({
                status: "success",
                data: data,
            });
        }
    });
};

///list task by status

exports.listTaskByStatus = (req, res) => {
    let status = req.params.status;
    let email = req.headers["email"];

    taskModel.aggregate(
        [
            { $match: { status: status, email:eamil}},
            {
                project: {
                    _id:1,
                    title:1,
                    description:1,
                    status:1,
                    createDate: {
                        $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createDate" },
                    },
                },
            },
        ],
        (error, data) => {
            if(error) {
                res.status(400).json({
                    status: "fail",
                    data:error
                });
            }
            else {
                res.status(200).json({
                    status: "success",
                    data: data
                });
            }
        },
        ////Task status count
        exports.taskStatusCount = (req, res) =>{
            let email = req.headers["email"];
            taskModel.aggregate(
                [
                    { $match: { eamil: email}},
                    { $group: { _id:"$status", sum: { $count: {} } } },
                ],
                (error,data) =>{
                    if(error) {
                        res.status(400).json({
                            status:"fail",
                            data:error
                        });
                    }
                    else {
                        res.status(200).json({
                            status:"success",
                            data:data
                        })
                    }                  
                }
            )
        }
    );
};









