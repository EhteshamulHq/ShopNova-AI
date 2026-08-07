/**
 * ===========================================================
 * Notification Service
 * ===========================================================
 */

const Notification = require("../models/Notification");

/**
 * Create Notification
 */

const createNotification = async (data) => {
  return await Notification.create(data);
};

/**
 * Get User Notifications
 */

const getNotifications = async (userId) => {
  return await Notification.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

/**
 * ===========================================================
 * Mark Notification as Read
 * ===========================================================
 */

const markAsRead = async (notificationId, userId) => {

  return await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );

};

/**
 * ===========================================================
 * Get Unread Notification Count
 * ===========================================================
 */

const getUnreadCount = async (userId) => {

  const count = await Notification.countDocuments({
    user: userId,
    isRead: false,
  });

  return {
    unreadCount: count,
  };

};

/**
 * ===========================================================
 * Mark All Notifications as Read
 * ===========================================================
 */

const markAllAsRead = async (userId) => {

  await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  return true;

};

/**
 * ===========================================================
 * Delete Notification
 * ===========================================================
 */

const deleteNotification = async (
  notificationId,
  userId
) => {

  return await Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });

};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
  deleteNotification,
};