/**
 * ===========================================================
 * Order Placed Email
 * ===========================================================
 */

const orderPlacedEmail = (userName, order) => {

  return `

    <h2>Order Placed Successfully 🎉</h2>

    <p>Hello <b>${userName}</b>,</p>

    <p>
      Thank you for shopping with <b>ShopNova AI</b>.
    </p>

    <hr>

    <p><b>Order Number:</b> ${order.orderNumber}</p>

    <p><b>Total Amount:</b> ₹${order.totalAmount}</p>

    <p><b>Payment Method:</b> ${order.paymentMethod}</p>

    <p><b>Order Status:</b> ${order.orderStatus}</p>

    <hr>

    <p>
      We have received your order and will start processing it soon.
    </p>

    <p>
      Thank you for choosing ShopNova AI ❤️
    </p>

  `;

};

module.exports = orderPlacedEmail;