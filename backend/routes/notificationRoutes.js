/**
 * ===========================================================
 * Notification Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notificationController");

const {
  protect,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * User Notifications
 * ===========================================================
 */

router.get(
  "/",
  protect,
  notificationController.getNotifications
);

router.patch(
  "/:id/read",
  protect,
  notificationController.markAsRead
);

router.get(
  "/unread-count",
  protect,
  notificationController.getUnreadCount
);

router.patch(
  "/read-all",
  protect,
  notificationController.markAllAsRead
);

router.delete(
  "/:id",
  protect,
  notificationController.deleteNotification
);

module.exports = router;