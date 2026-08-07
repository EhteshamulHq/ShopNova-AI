/**
 * ===========================================================
 * Order Shipped Email
 * ===========================================================
 */

const orderShippedEmail = (userName, order) => {

  return `

    <h2>Your Order Has Been Shipped 🚚</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>Good news! Your order has been shipped.</p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Tracking Status:</b> Shipped</p>

    <p><b>Total Amount:</b> ₹${order.totalAmount}</p>

    <hr>

    <p>Your package is on the way.</p>

    <p>Thank you for shopping with ShopNova AI ❤️</p>

  `;

};

module.exports = orderShippedEmail;