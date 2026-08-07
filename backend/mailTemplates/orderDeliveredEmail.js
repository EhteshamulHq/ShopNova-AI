/**
 * ===========================================================
 * Order Delivered Email
 * ===========================================================
 */

const orderDeliveredEmail = (userName, order) => {

  return `

    <h2>Your Order Has Been Delivered 📦</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>Your order has been delivered successfully.</p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Total Amount:</b> ₹${order.totalAmount}</p>

    <p><b>Status:</b> Delivered</p>

    <hr>

    <p>Thank you for shopping with ShopNova AI.</p>

    <p>We hope to see you again soon ❤️</p>

  `;

};

module.exports = orderDeliveredEmail;