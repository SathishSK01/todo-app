const express = require("express");
const router = express.Router();
const{task,bulkTasks,getTask,particularTask,updateTask,deleteTask} = require("../controller/taskController");

router.route('/').post(task).get(getTask);
router.route('/bulk_add').post(bulkTasks);
router.route('/:id').get(particularTask).put(updateTask).delete(deleteTask);



module.exports = router;