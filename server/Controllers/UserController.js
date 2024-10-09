const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../Models/User")
const Task = require("../Models/Task")

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({role:"client"}); // Fetch all users from MongoDB
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
// Register route
exports.RegisterUser = async(req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      // console.log("Details : " email,password,role);
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  };

  
  // Get Data route
  exports.ShowClient = async (req, res) => {
    // console.log("Received");
    try {
        const clients = await User.find({role:"client"});
        res.json(clients);
        // console.log(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
  // count and show data
  
  exports.CountUser = async (req, res) => {
    try {
      const count = await User.countDocuments({role:"client"});
      res.json({ count });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // count tasks and show data
  
  exports.CountOngoingTasks = async (req, res) => {
    try {
      const CountOngoingTask = await Task.countDocuments();
      res.json({ CountOngoingTask });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  // add new user

  exports.NewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({ name, email, password: hashedPassword,role:"client" });
    // await newUser.save();
    // res.json(newUser);
    try {
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        // console.log("Details : " email,password,role);
        res.json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
  }
  

  // Login route
  exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
  
    const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY', {
      expiresIn: '1h',
    });
  
    res.json({ token, role: user.role });
  }

// Assign a task to a user
exports.AssignTask = async (req, res) => {
    const { title, description, userName } = req.body;
  console.log(req.body.userName);
    try {
      const user = await User.findOne({name:userName});
      console.log(user.name);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const task = new Task({
        title,
        description,
        assignedTo : userName,
      });
  
      await task.save();
  
      res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign task' });
    }
  }

  // Fetch all task from databse

  exports.GetAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Fetch all members from databse

  exports.GetAllMembers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Get particular user's task
  exports.GetTask = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: Task.assignedTo });

        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};