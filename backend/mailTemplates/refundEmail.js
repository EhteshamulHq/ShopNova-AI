/**
 * ===========================================================
 * Refund Email
 * ===========================================================
 */

const refundEmail = (userName, order) => {

  return `

    <h2>Refund Processed 💰</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>Your refund has been processed successfully.</p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Refund Amount:</b> ₹${order.totalAmount}</p>

    <p><b>Status:</b> Refunded</p>

    <hr>

    <p>The refunded amount will be credited to your original payment method within 5-7 business days.</p>

    <p>Thank you for choosing ShopNova AI.</p>

  `;

};

module.exports = refundEmail;