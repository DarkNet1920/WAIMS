const express = require('express');
const notificationRoutes = express.Router();
const { SendNotification, GetNotification } = require('../Controllers/NotificationController');

notificationRoutes.post('/sendNotification', SendNotification);
notificationRoutes.get('/getNotification', GetNotification);

module.exports = notificationRoutes;