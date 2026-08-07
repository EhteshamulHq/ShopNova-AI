/**
 * ==========================================================
 * ShopNova AI
 * File: ResetPasswordPage.jsx
 *
 * Purpose:
 * Reset user's password using reset token.
 *
 * Backend API
 * POST /api/auth/reset-password/:token
 *
 * URL Params
 * token
 *
 * Request Body
 * {
 *    password
 * }
 *
 * Expected Response
 * {
 *    success:true,
 *    message:"Password reset successful."
 * }
 *
 * Public Route
 * ==========================================================
 */

import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

import { resetPasswordSchema } from "../../validations/auth/resetPassword.schema";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../features/auth/authThunks";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { token } = useParams();

 const dispatch = useDispatch();

const { loading } = useSelector(
  (state) => state.auth
);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

 const onSubmit = async (values) => {
  try {
    await dispatch(
      resetPassword({
        token,
        password: values.password,
      })
    ).unwrap();

    toast.success(
      "Password reset successful."
    );

    navigate("/login", {
      replace: true,
    });
  } catch (error) {
    toast.error(error);
  }
};

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Reset Password
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new secure password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <PasswordInput
          label="New Password"
          name="password"
          placeholder="Enter new password"
          register={register}
          error={errors.password}
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          register={register}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Reset Password
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}