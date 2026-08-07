/**
 * ===========================================================
 * Invoice Generator
 * ===========================================================
 */

const PDFDocument = require("pdfkit");

/**
 * Generate Invoice PDF
 */
const generateInvoice = (order) => {

  const doc = new PDFDocument({
    margin: 50,
  });

  const buffers = [];

  doc.on("data", (chunk) => {
    buffers.push(chunk);
  });

  return new Promise((resolve) => {

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    /**
     * Header
     */

    doc
      .fontSize(24)
      .text("ShopNova AI", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Invoice");

    doc.moveDown();

    doc.text(`Order No : ${order.orderNumber}`);

    doc.text(
      `Date : ${new Date(
        order.createdAt
      ).toLocaleDateString()}`
    );

    doc.moveDown();

    /**
     * Customer
     */

    doc.text(
      `Customer : ${order.address.fullName}`
    );

    doc.text(
      `Phone : ${order.address.phone}`
    );

    doc.text(
      `City : ${order.address.city}`
    );

    doc.moveDown();

    /**
     * Items
     */

    order.items.forEach((item) => {

      doc.text(
        `${item.name}
Qty : ${item.quantity}
Price : ₹${item.price}
Subtotal : ₹${item.subtotal}`
      );

      doc.moveDown();

    });

    /**
     * Total
     */

    doc.text(
      `Subtotal : ₹${order.subtotal}`
    );

    doc.text(
      `Discount : ₹${order.discount}`
    );

    doc.text(
      `Shipping : ₹${order.shippingCharge}`
    );

    doc.text(
      `Tax : ₹${order.tax}`
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text(
        `Grand Total : ₹${order.totalAmount}`
      );

    doc.end();

  });

};

module.exports = generateInvoice;