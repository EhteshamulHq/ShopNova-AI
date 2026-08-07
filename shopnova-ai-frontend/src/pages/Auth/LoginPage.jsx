/**
 * ==========================================================
 * ShopNova AI
 * File: LoginPage.jsx
 *
 * Purpose:
 * User Login Page
 *
 * Backend API
 * POST /api/auth/login
 *
 * Request Body
 * {
 *   email,
 *   password
 * }
 *
 * Redux
 * login()
 * ==========================================================
 */

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";

import { loginSchema } from "../../validations/auth/login.schema";

import {
  login,
  clearAuthError,
  clearAuthSuccess,
} from "../../features/auth";

import {
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
  selectIsAuthenticated,
} from "../../features/auth";

export default function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);

  const error = useSelector(selectAuthError);

  const success = useSelector(selectAuthSuccess);

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);

      dispatch(clearAuthSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
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
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-500">
          Login to continue shopping.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Input
          label="Email"
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
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded"
            />

            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Login
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-300">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </div>
    </motion.div>
  );
}