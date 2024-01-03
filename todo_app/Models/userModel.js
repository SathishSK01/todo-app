const mongoose = require ("mongoose");

const userDetailsSchema = mongoose.Schema({
    username:{type: String,required:[true, "Please add username"]},
    password:{type: String,required:[true, "Please add password"]}

},
{
    timestamps: true,
});
const userDetails = mongoose.model('userDetails', userDetailsSchema);

const taskDetailsSchema = new mongoose.Schema({
    //task_id: { type: String, default: uuidv4, index: true },
    task_name: { type: String, required: [true, "Please add task name"] },
    description: { type: String },
    priority: { type: String, enum: ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW'], required: [true, "Please add task priority"] },
    status: { type: String, enum: ['OPEN'], required: [true, "Please add task status"] },
    start_date: { type: Date, required: [true, "Please add start date"] },
    end_date: { type: Date, required: [true, "Please add end date"] },
  });
const taskDetails = mongoose.model('Task', taskDetailsSchema);
  
module.exports = {userDetails, taskDetails};