/**
 * ===========================================================
 * Payment Success Email
 * ===========================================================
 */

const paymentSuccessEmail = (userName, order) => {

  return `

    <h2>Payment Successful ✅</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>
      Your payment has been received successfully.
    </p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Amount Paid:</b> ₹${order.totalAmount}</p>

    <p><b>Payment Status:</b> Paid</p>

    <hr>

    <p>
      Your order is now being processed.
    </p>

  `;

};

module.exports = paymentSuccessEmail;