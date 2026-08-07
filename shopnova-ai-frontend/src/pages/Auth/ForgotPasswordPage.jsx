/**
 * ==========================================================
 * ShopNova AI
 * File: ForgotPasswordPage.jsx
 *
 * Purpose:
 * Send password reset email.
 *
 * Backend API
 * POST /api/auth/forgot-password
 *
 * Request Body
 * {
 *   email
 * }
 *
 * Response
 * {
 *   success: true,
 *   message: "Password reset email sent."
 * }
 *
 * Public Route
 * ==========================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { forgotPasswordSchema } from "../../validations/auth/forgotPassword.schema";

import { useDispatch, useSelector } from "react-redux";

import { forgotPassword } from "../../features/auth/authThunks";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();

const { loading } = useSelector(
  (state) => state.auth
);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
  try {
    await dispatch(
      forgotPassword(values)
    ).unwrap();

    toast.success(
      "Password reset email sent."
    );

    reset();
  } catch (error) {
    toast.error(error);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="mt-3 text-slate-500">
          Enter your registered email address.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          required
        />

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Send Reset Link
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}