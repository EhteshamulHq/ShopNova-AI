/**
 * ===========================================================
 * Order Cancelled Email
 * ===========================================================
 */

const orderCancelledEmail = (userName, order) => {

  return `

    <h2>Order Cancelled</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>Your order has been cancelled.</p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Amount:</b> ₹${order.totalAmount}</p>

    <p><b>Status:</b> Cancelled</p>

    <hr>

    <p>If payment was completed, your refund will be processed soon.</p>

  `;

};

module.exports = orderCancelledEmail;