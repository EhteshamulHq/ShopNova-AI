/**
 * ==========================================================
 * ShopNova AI
 * File: RegisterPage.jsx
 *
 * Purpose:
 * User Registration Page
 *
 * Backend API
 * POST /api/auth/register
 *
 * HTTP Method
 * POST
 *
 * Request Body
 * {
 *   name,
 *   email,
 *   password
 * }
 *
 * Expected Response
 * {
 *   success: true,
 *   message: "Registration successful. Please verify your email."
 * }
 *
 * Redux Slice
 * authSlice
 *
 * Security Notes
 * - Password never stored locally.
 * - Confirmation password is frontend-only.
 * - After success user is redirected to Verify OTP.
 * ==========================================================
 */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

import { registerSchema } from "../../validations/auth/register.schema";

import {
  register as registerUser,
  clearAuthError,
  clearAuthSuccess,
} from "../../features/auth";

import {
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
} from "../../features/auth";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);

  const error = useSelector(selectAuthError);

  const success = useSelector(selectAuthSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

 const onSubmit = async (values) => {
  try {
    await dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    ).unwrap();

    toast.success(
      "Registration successful. Please verify your email."
    );

    navigate("/verify-otp", {
      replace: true,
      state: {
        email: values.email,
      },
    });
  } catch (error) {
    toast.error(error);
  }
};

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Create Account
        </h1>

        <p className="mt-2 text-slate-500">
          Join ShopNova AI today.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Create password"
          register={register}
          error={errors.password}
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          register={register}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </div>
    </motion.div>
  );
}