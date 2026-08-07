/**
 * ===========================================================
 * Notification Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const notificationService = require("../services/notificationService");

/**
 * ===========================================================
 * Get Notifications
 * ===========================================================
 */

const getNotifications = asyncHandler(async (req, res) => {

  const notifications =
    await notificationService.getNotifications(req.user.id);

  res.status(200).json({
    success: true,
    data: notifications,
  });

});

/**
 * ===========================================================
 * Mark Notification as Read
 * ===========================================================
 */

const markAsRead = asyncHandler(async (req, res) => {

  const notification =
    await notificationService.markAsRead(
      req.params.id,
      req.user.id
    );

  res.status(200).json({
    success: true,
    data: notification,
  });

});

/**
 * ===========================================================
 * Get Unread Notification Count
 * ===========================================================
 */

const getUnreadCount = asyncHandler(async (req, res) => {

  const data =
    await notificationService.getUnreadCount(
      req.user.id
    );

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Mark All Notifications as Read
 * ===========================================================
 */

const markAllAsRead = asyncHandler(async (req, res) => {

  await notificationService.markAllAsRead(req.user.id);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read.",
  });

});

/**
 * ===========================================================
 * Delete Notification
 * ===========================================================
 */

const deleteNotification = asyncHandler(async (req, res) => {

  await notificationService.deleteNotification(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully.",
  });

});

module.exports = {
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
  deleteNotification,
};