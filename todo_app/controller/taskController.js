const {taskDetails} = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

//Add Task
// @/api/task/
const task = asyncHandler(async(req,res,next)=>{
    console.log("user details:",req.body);
    const {task_name,description,priority, status,start_date,end_date} = req.body;
    if(!task_name || !description || !priority || !status || !start_date || !end_date){
         res.status(400);
         throw new Error("Please fill all Fields");
     }
     const Tasks = await taskDetails.create({
        task_name,
        description,
        priority,
        status,
        start_date,
        end_date});
     res.status(200).json(Tasks); 
});


// Bulk Task
// @/api/task/bulk_add
const bulkTasks = asyncHandler(async (req, res) => {
    console.log("user details:", req.body);
    const tasksData = req.body;
    const existingTask = await taskDetails.findOne({ tasksData });
    if(existingTask){
        res.status(401);
        throw new Error("Tasks is already Exits");
    }
    if (!Array.isArray(tasksData) || tasksData.length === 0) {
      res.status(400);
      throw new Error("Invalid or empty task data");
    }
  
    const tasks = [];
  
    for (const taskData of tasksData) {
      const { task_name, description, priority, status, start_date, end_date } = taskData;
  
      if (!task_name || !description || !priority || !status || !start_date || !end_date) {
        res.status(400);
        throw new Error("Please fill all fields for each task");
      }
  
      const newTask = await taskDetails.create({
        task_name,
        description,
        priority,
        status,
        start_date,
        end_date,
      });
  
      tasks.push(newTask);
    }
  
    res.status(200).json(tasks);
  });
  
//Get all Tasks
  const getTask = asyncHandler(async(req,res)=>{
    const tasksData = res.body;
    const tasks = await taskDetails.find(tasksData);
    res.status(200).json(tasks);
  });

//Get tasks using id
const particularTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await taskDetails.findById(taskId);
      if (!task) {
        res.status(404);
        throw new Error(`Task not found with ID ${taskId}`);
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500);
      throw new Error(`Error fetching task: ${error.message}`);
    }
  });
 
  //update tasks
  const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedTask = await taskDetails.findByIdAndUpdate(taskId, updateData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run validation on update
      });
  
      if (!updatedTask) {
        res.status(404);
        throw new Error(`Task not found with ID ${taskId}`);
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500);
      throw new Error(`Error updating task: ${error.message}`);
    }
  });
 
//Delete Tasks
const deleteTask = asyncHandler(async (req,res)=>{
    const taskId = req.params.id;
    const taskDelete = req.body;
    try{
        const deletetasks = await taskDetails.findByIdAndDelete(taskId, taskDelete);
        if(!deletetasks){
            res.status(404);
            throw new Error(`Task not founf with ID ${taskId}`);
        }
        res.status(200).json({message:"Task Deleted successfully"});
    }catch (error){
        res.status(500);
        throw new Error(`Error in deleting task: ${error.message}`);
    }
});

module.exports = {task,bulkTasks,getTask,particularTask,updateTask,deleteTask};