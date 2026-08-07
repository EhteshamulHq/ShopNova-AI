/**
 * ===========================================================
 * OTP Email
 * ===========================================================
 */

const otpEmail = (otp) => {

  return `

<h2>Email Verification</h2>

<p>Your OTP is</p>

<h1>${otp}</h1>

<p>Valid for 10 minutes.</p>

`;

};

module.exports = otpEmail;