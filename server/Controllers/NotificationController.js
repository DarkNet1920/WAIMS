const Notification = require("../Models/Notification")

exports.SendNotification = async (req, res) => {
  const { message, recipient } = req.body;
  const notification = new Notification({ message, recipient });
  await notification.save();
  res.json({ message: 'Notification sent!' });
}