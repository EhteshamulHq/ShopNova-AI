/**
 * ==========================================================
 * ShopNova AI
 * File: VerifyOtpPage.jsx
 *
 * Purpose:
 * Verify user email using OTP
 *
 * Backend API
 * POST /api/auth/verify-otp
 * POST /api/auth/resend-otp
 *
 * Request Body
 * {
 *    email,
 *    otp
 * }
 *
 * Expected Response
 * {
 *    success:true,
 *    message:"Email verified successfully."
 * }
 *
 * Redux
 * authSlice
 * ==========================================================
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";

import {
  verifyOtp,
  resendOtp,
} from "../../features/auth/authThunks";

import {
  clearAuthError,
  clearAuthSuccess,
} from "../../features/auth/authSlice";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

const { loading } = useSelector(
  (state) => state.auth
);

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);


  const [resending, setResending] = useState(false);

  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/register", {
        replace: true,
      });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];

    updated[index] = value;

    setOtp(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const value = event.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6);

    if (!/^\d+$/.test(value)) return;

    const values = value.split("");

    while (values.length < 6) {
      values.push("");
    }

    setOtp(values);

    inputRefs.current[5]?.focus();
  };

 const handleVerify = async () => {
  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {
    return toast.error(
      "Please enter a valid OTP."
    );
  }

  try {
    await dispatch(
      verifyOtp({
        email,
        otp: finalOtp,
      })
    ).unwrap();

    toast.success(
      "Email verified successfully."
    );

    navigate("/login", {
      replace: true,
    });
  } catch (error) {
    toast.error(error);
  }
};

 const handleResend = async () => {
  try {
    setResending(true);

    await dispatch(
      resendOtp({
        email,
      })
    ).unwrap();

    toast.success("OTP sent.");

    setTimer(60);
  } catch (error) {
    toast.error(error);
  } finally {
    setResending(false);
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Verify Email
        </h1>

        <p className="mt-3 text-slate-500">
          Enter the 6 digit OTP sent to
        </p>

        <p className="mt-1 font-semibold text-blue-600 break-all">
          {email}
        </p>
      </div>

      <div className="mt-8 flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) =>
              (inputRefs.current[index] =
                element)
            }
            type="text"
            value={digit}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            className="h-14 w-14 rounded-xl border text-center text-2xl font-bold outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        ))}
      </div>

      <div className="mt-8">
        <Button
          fullWidth
          loading={loading}
          onClick={handleVerify}
        >
          Verify OTP
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        {timer > 0 ? (
          <span>
            Resend OTP in{" "}
            <strong>{timer}s</strong>
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="font-semibold text-blue-600 hover:underline"
          >
            {resending
              ? "Sending..."
              : "Resend OTP"}
          </button>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}