const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();

app.use(cors()); 

mongoose.connect("mongodb://127.0.0.1:27017/todoData").then(function(err){
  console.log("Connected to database!");
});

// Defining the schema with the appropriate field name : taskItem
const taskSchema = new mongoose.Schema({
    taskItem: String
});

const Task = mongoose.model('Task', taskSchema);

// Parse JSON requests
app.use(express.json());

app.post('/todoData', async (req, res) => {
    try {
        const  taskItem  = req.body.item;

        const task = new Task({ taskItem });

        await task.save();

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/todoData', async (req, res) => {
    try {
        // Retrieving data from the database
        const tasks = await Task.find(); 

        // Sending the data to the frontend
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/todoData/:id', async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const taskId = req.params.id; 
        console.log("I am called",taskId);

        // Finding the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 3000');
});