/**
 * ===========================================================
 * Order Service
 * ===========================================================
 */
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Address = require("../models/Address");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const {createNotification,} = require("./notificationService");

const { sendEmail } = require("./emailService");

const orderPlacedEmail = require("../mailTemplates/orderPlacedEmail");
const orderCancelledEmail = require("../mailTemplates/orderCancelledEmail");
const orderShippedEmail = require("../mailTemplates/orderShippedEmail");
const orderDeliveredEmail = require("../mailTemplates/orderDeliveredEmail");

const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Generate Order Number
 * Example:
 * ORD202608010001
 * ===========================================================
 */

const generateOrderNumber = async () => {
  const today = new Date();

  const date =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  const totalOrders = await Order.countDocuments();

  return `ORD${date}${String(totalOrders + 1).padStart(4, "0")}`;
};

/**
 * ===========================================================
 * Place Order
 * ===========================================================
 */

const placeOrder = async (userId, data) => {

  // Remaining implementation
  const session = await mongoose.startSession();

session.startTransaction();

try {
  // Load Cart
const cart = await Cart.findOne({
  user: userId,
}).populate("items.product");

if (!cart || cart.items.length === 0) {
  throw new AppError("Cart is empty.", 400);
}

// Load Address
const address = await Address.findOne({
  _id: data.addressId,
  user: userId,
});

if (!address) {
  throw new AppError(
    "Address not found.",
    404
  );
}

const orderItems = [];

let subtotal = 0;

for (const item of cart.items) {

  const product = item.product;

  if (!product) {
    throw new AppError(
      "Product not found.",
      404
    );
  }

  if (product.stock < item.quantity) {
    throw new AppError(
      `${product.name} is out of stock.`,
      400
    );
  }

  const itemSubtotal =
    product.price * item.quantity;

  subtotal += itemSubtotal;

  orderItems.push({

    product: product._id,

    name: product.name,

    slug: product.slug,

    sku: product.sku,

    image:
      product.images?.length > 0
        ? product.images[0].url
        : "",

    price: product.price,

    quantity: item.quantity,

    subtotal: itemSubtotal,
  });
}

let discount = 0;

let couponSnapshot = null;

if (data.couponCode) {

  const coupon = await Coupon.findOne({

    code: data.couponCode.toUpperCase(),

    isActive: true,
  });

  if (!coupon) {
    throw new AppError(
      "Invalid coupon.",
      400
    );
  }

  if (subtotal < coupon.minimumOrderAmount) {
    throw new AppError(
      "Minimum order amount not reached.",
      400
    );
  }

  if (coupon.discountType === "fixed") {

    discount = coupon.discountValue;

  } else {

    discount =
      subtotal *
      coupon.discountValue /
      100;

    if (
      coupon.maximumDiscount > 0 &&
      discount > coupon.maximumDiscount
    ) {
      discount =
        coupon.maximumDiscount;
    }
  }

  couponSnapshot = {

    code: coupon.code,

    discountType:
      coupon.discountType,

    discountValue:
      coupon.discountValue,

    discount,
  };
}

const shippingCharge = 0;

const tax = 0;

const totalAmount =
  subtotal -
  discount +
  shippingCharge +
  tax;

const [order] = await Order.create([{

  user: userId,

  orderNumber:
    await generateOrderNumber(),

  items: orderItems,

  address: address.toObject(),

  coupon: couponSnapshot,

  subtotal,

  discount,

  shippingCharge,

  tax,

  totalAmount,

  paymentMethod:
    data.paymentMethod,
}],
{ session }
);

for (const item of cart.items) {

  await Product.findByIdAndUpdate(

    item.product._id,

    {
      $inc: {
        stock: -item.quantity,
      },
    },
{ session }
  );
}

// Increase coupon usage
if (data.couponCode) {

  await Coupon.findOneAndUpdate(

    {
      code: data.couponCode.toUpperCase(),
    },

    {
      $inc: {
        usedCount: 1,
      },
    },
    { session }
  );
}

// Clear cart
cart.items = [];

await order.save({ session });
await cart.save({ session });
await createNotification({
  user: order.user,
  title: "Order Placed",
  message: `Your order #${order.orderNumber} has been placed successfully.`,
  type: "order",
});

const user = await User.findById(order.user);

await sendEmail({
  to: user.email,
  subject: "Order Placed Successfully",
  html: orderPlacedEmail(user.name, order),
});
await session.commitTransaction();

session.endSession();

return order;


} catch (error) {
await session.abortTransaction();

  session.endSession();

  throw error;
  }

};

/**
 * ===========================================================
 * Get My Orders
 * ===========================================================
 */

const getMyOrders = async (userId) => {

  const orders = await Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return orders;
};

/**
 * ===========================================================
 * Get Order By ID
 * ===========================================================
 */

const getOrderById = async (userId, orderId) => {

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError(
      "Order not found.",
      404
    );
  }

  return order;
};

/**
 * ===========================================================
 * Cancel Order
 * ===========================================================
 */

const cancelOrder = async (userId, orderId) => {

    const session = await mongoose.startSession();

session.startTransaction();

try {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError(
      "Order not found.",
      404
    );
  }

  if (
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled"
  ) {
    throw new AppError(
      "This order cannot be cancelled.",
      400
    );
  }

  // Restore Stock
  for (const item of order.items) {

    await Product.findByIdAndUpdate(
      item.product,
      {
        $inc: {
          stock: item.quantity,
        },
      },
      {
    session,
  }
    );

  }

  // Restore Coupon Usage
  if (order.coupon?.code) {

    await Coupon.findOneAndUpdate(
      {
        code: order.coupon.code,
      },
      {
        $inc: {
          usedCount: -1,
        },
      },
      {
    session,
  }
    );

  }

  order.orderStatus = "Cancelled";

await order.save({ session });
await createNotification({
  user: order.user,
  title: "Order Cancelled",
  message: `Your order #${order.orderNumber} has been cancelled.`,
  type: "order",
});
const user = await User.findById(order.user);

await sendEmail({
  to: user.email,
  subject: "Order Cancelled",
  html: orderCancelledEmail(user.name, order),
});
await session.commitTransaction();

session.endSession();
  return order;
 } catch (error) {
await session.abortTransaction();

  session.endSession();

  throw error;
  }

};

/**
 * ===========================================================
 * Get All Orders (Admin)
 * ===========================================================
 */

const getAllOrders = async (query) => {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (query.status) {
    filter.orderStatus = query.status;
  }

  if (query.orderNumber) {
    filter.orderNumber = {
      $regex: query.orderNumber,
      $options: "i",
    };
  }

  const total = await Order.countDocuments(filter);

  const orders = await Order.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    orders,
  };
};

/**
 * ===========================================================
 * Update Order Status
 * ===========================================================
 */

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order not found.", 404);
  }

  const user = await User.findById(order.user);

  order.orderStatus = status;

  // Send email when order is shipped
  if (status === "Shipped") {
    await sendEmail({
  to: user.email,
  subject: "Your Order Has Been Shipped",
  html: orderShippedEmail(user.name, order),
});
await createNotification({
  user: order.user,
  title: "Order Shipped",
  message: `Your order #${order.orderNumber} has been shipped.`,
  type: "order",
});
  }

  // Auto update payment status for COD orders
  if (
    status === "Delivered" &&
    order.paymentMethod === "COD"
  ) {
    await sendEmail({
  to: user.email,
  subject: "Order Delivered",
  html: orderDeliveredEmail(user.name, order),
});

    order.paymentStatus = "Paid";

    await createNotification({
  user: order.user,
  title: "Order Delivered",
  message: `Your order #${order.orderNumber} has been delivered.`,
  type: "order",
});
  }

  await order.save();
 

  return order;
};

/**
 * ===========================================================
 * Buy Now
 * ===========================================================
 */

const buyNow = async (userId, data) => {

    const session = await mongoose.startSession();

session.startTransaction();

try {

  const product = await Product.findById(data.productId);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  if (product.stock < data.quantity) {
    throw new AppError("Insufficient stock.", 400);
  }

  const address = await Address.findOne({
    _id: data.addressId,
    user: userId,
  });

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  const subtotal = product.price * data.quantity;

  let discount = 0;
  let couponSnapshot = null;

  if (data.couponCode) {

    const coupon = await Coupon.findOne({
      code: data.couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      throw new AppError("Invalid coupon.", 400);
    }

    if (subtotal < coupon.minimumOrderAmount) {
      throw new AppError(
        "Minimum order amount not reached.",
        400
      );
    }

    if (coupon.discountType === "fixed") {

      discount = coupon.discountValue;

    } else {

      discount =
        (subtotal * coupon.discountValue) / 100;

      if (
        coupon.maximumDiscount > 0 &&
        discount > coupon.maximumDiscount
      ) {
        discount = coupon.maximumDiscount;
      }
    }

    couponSnapshot = {
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
    };
  }

  const totalAmount = subtotal - discount;

  const order = await Order.create([{

    user: userId,

    orderNumber:
      await generateOrderNumber(),

    items: [
      {
        product: product._id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        image:
          product.images?.length > 0
            ? product.images[0].url
            : "",
        price: product.price,
        quantity: data.quantity,
        subtotal,
      },
    ],

    address: address.toObject(),

    coupon: couponSnapshot,

    subtotal,

    discount,

    shippingCharge: 0,

    tax: 0,

    totalAmount,

    paymentMethod: data.paymentMethod,
  }],
{
  session,
}
);

  await Product.findByIdAndUpdate(
    product._id,
    {
      $inc: {
        stock: -data.quantity,
      },
    },
    {
    session,
  }
  );

  if (data.couponCode) {
    await Coupon.findOneAndUpdate(
      {
        code: data.couponCode.toUpperCase(),
      },
      {
        $inc: {
          usedCount: 1,
        },
      },
      {
    session,
  }
    );
  }
await session.commitTransaction();

session.endSession();
  return order;
 } catch (error) {
await session.abortTransaction();

  session.endSession();

  throw error;

  }

};

/**
 * ===========================================================
 * Export
 * ===========================================================
 */

module.exports = {

  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  buyNow,
};
