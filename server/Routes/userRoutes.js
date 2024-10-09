const express = require('express');
const userRoutes = express.Router();
const { RegisterUser, ShowClient, CountUser, NewUser, LoginUser, AssignTask, getAllUsers, GetAllTasks, GetAllMembers, CountOngoingTasks, GetTask } = require('../Controllers/UserController');
const authenticateUser = require('../Middleware/auth');

userRoutes.post('/api/register', RegisterUser);
userRoutes.get('/client', ShowClient);
userRoutes.get('/count', CountUser);
userRoutes.post('/api/new', NewUser);
userRoutes.post('/api/login', LoginUser);
userRoutes.post('/api/users', AssignTask);
userRoutes.get('/', getAllUsers);
userRoutes.get('/api/tasks', GetAllTasks);
userRoutes.get('/api/members', GetAllMembers);
userRoutes.get('/api/countOngoingTask', CountOngoingTasks);
userRoutes.get('/api/tasks',authenticateUser, GetTask);

module.exports = userRoutes;