/**
 * ===========================================================
 * Payment Failed Email
 * ===========================================================
 */

const paymentFailedEmail = (name, order) => {

  return `

    <h2>Payment Failed</h2>

    <p>Hello <b>${name}</b>,</p>

    <p>Your payment for the following order could not be completed.</p>

    <hr>

    <p><b>Order:</b> ${order.orderNumber}</p>

    <p><b>Amount:</b> ₹${order.totalAmount}</p>

    <hr>

    <p>Please retry your payment.</p>

  `;

};

module.exports = paymentFailedEmail;