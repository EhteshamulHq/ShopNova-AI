/**
 * ===========================================================
 * Email Template Utility
 * ===========================================================
 * Purpose:
 * Generates reusable HTML email templates.
 *
 * Supported Templates:
 * - OTP Verification
 * - Welcome Email
 * - Forgot Password
 * - Order Confirmation (Future)
 * ===========================================================
 */

/**
 * OTP Verification Email
 *
 * @param {string} name
 * @param {string} otp
 * @returns {string}
 */
const otpEmailTemplate = (name, otp) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center" style="padding:40px 15px;">

<table width="600" cellpadding="0" cellspacing="0"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 4px 18px rgba(0,0,0,.08);
">

<tr>

<td
style="
background:#2563eb;
padding:25px;
color:white;
text-align:center;
font-size:28px;
font-weight:bold;
">

ShopNova AI

</td>

</tr>

<tr>

<td style="padding:35px;">

<h2 style="margin-top:0;">
Hello ${name},
</h2>

<p style="font-size:16px;color:#444;line-height:1.8;">

Thank you for creating your ShopNova AI account.

Use the following One-Time Password (OTP)
to verify your email address.

</p>

<div
style="
margin:35px 0;
text-align:center;
">

<span
style="
display:inline-block;
padding:18px 40px;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
background:#f3f4f6;
border-radius:10px;
color:#2563eb;
">

${otp}

</span>

</div>

<p
style="
font-size:15px;
color:#666;
">

This OTP is valid for
<strong>5 minutes</strong>.

</p>

<p
style="
color:#d32f2f;
font-size:15px;
">

Never share this OTP with anyone.

</p>

<hr
style="
margin:35px 0;
border:none;
border-top:1px solid #eee;
">

<p
style="
font-size:13px;
color:#777;
">

If you didn't create this account,
you can safely ignore this email.

</p>

</td>

</tr>

<tr>

<td
style="
background:#f9fafb;
padding:18px;
text-align:center;
font-size:13px;
color:#888;
">

© ${new Date().getFullYear()}
ShopNova AI

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

/**
 * Welcome Email
 *
 * @param {string} name
 * @returns {string}
 */
const welcomeEmailTemplate = (name) => {
  return `
<!DOCTYPE html>

<html>

<body
style="
font-family:Arial,sans-serif;
padding:40px;
background:#fafafa;
">

<h2>
Welcome ${name} 🎉
</h2>

<p>
Your email has been verified successfully.
</p>

<p>
Welcome to
<strong>ShopNova AI</strong>.
</p>

<p>
Happy Shopping ❤️
</p>

</body>

</html>
`;
};

module.exports = {
  otpEmailTemplate,
  welcomeEmailTemplate,
};