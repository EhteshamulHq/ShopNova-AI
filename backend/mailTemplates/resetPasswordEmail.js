/**
 * ===========================================================
 * Reset Password Email
 * ===========================================================
 */

const resetPasswordEmail = (resetLink) => {

  return `

    <h2>Reset Your Password 🔐</h2>

    <p>We received a request to reset your password.</p>

    <p>
      Click the button below to create a new password.
    </p>

    <br>

    <a
      href="${resetLink}"
      style="
        display:inline-block;
        background:#2563eb;
        color:#ffffff;
        padding:12px 24px;
        text-decoration:none;
        border-radius:6px;
      "
    >
      Reset Password
    </a>

    <br><br>

    <p>This link will expire soon.</p>

    <p>If you didn't request a password reset, you can safely ignore this email.</p>

  `;

};

module.exports = resetPasswordEmail;