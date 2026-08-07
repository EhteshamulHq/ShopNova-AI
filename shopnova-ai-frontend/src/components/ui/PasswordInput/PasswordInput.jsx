/**
 * ==========================================================
 * ShopNova AI
 * File: PasswordInput.jsx
 *
 * Purpose:
 * Reusable Password Input
 *
 * Backend API:
 * None
 *
 * Redux:
 * None
 *
 * Features:
 * - Show / Hide Password
 * - React Hook Form
 * - Validation Error
 * - Responsive
 * ==========================================================
 */

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import clsx from "clsx";

export default function PasswordInput({
  label,
  name,
  placeholder = "",
  register,
  error,
  required = false,
  disabled = false,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          {...(register ? register(name) : {})}
          className={clsx(
            "w-full rounded-xl border",
            "border-slate-300",
            "bg-white",
            "px-4 py-3 pr-12",
            "text-slate-800",
            "outline-none",
            "transition-all duration-200",
            "focus:border-blue-500",
            "focus:ring-2",
            "focus:ring-blue-200",
            "dark:border-slate-700",
            "dark:bg-slate-900",
            "dark:text-white",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-200"
          )}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
        >
          {showPassword ? (
            <FiEyeOff size={20} />
          ) : (
            <FiEye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}