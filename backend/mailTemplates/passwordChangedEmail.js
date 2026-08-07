/**
 * ===========================================================
 * Password Changed Email
 * ===========================================================
 */

const passwordChangedEmail = (name) => {

  return `

    <h2>Password Updated</h2>

    <p>Hello <b>${name}</b>,</p>

    <p>Your password has been changed successfully.</p>

    <p>If this wasn't you, contact support immediately.</p>

  `;

};

module.exports = passwordChangedEmail;