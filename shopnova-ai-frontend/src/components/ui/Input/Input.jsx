/**
 * ==========================================================
 * ShopNova AI
 * File: Input.jsx
 *
 * Enterprise Reusable Input Component
 *
 * Features
 * - React Hook Form Compatible
 * - Validation Error
 * - Label
 * - Required Mark
 * - Disabled State
 * - Left Icon
 * - Right Icon
 * - Password Toggle Support
 * - Helper Text
 * - Responsive
 * - Accessible
 * ==========================================================
 */

import clsx from "clsx";

export default function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  error,
  required = false,
  disabled = false,

  leftIcon,
  rightIcon,
  onRightIconClick,

  helperText,

  className = "",

  ...rest
}) {
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
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          {...(register ? register(name) : {})}
          {...rest}
          className={clsx(
            "w-full rounded-xl border",
            "border-slate-300",
            "bg-white",
            "py-3",
            "text-slate-800",
            "outline-none",
            "transition-all duration-200",
            "focus:border-blue-500",
            "focus:ring-2",
            "focus:ring-blue-200",

            leftIcon ? "pl-12" : "px-4",
            rightIcon ? "pr-12" : "",

            "disabled:cursor-not-allowed",
            "disabled:bg-slate-100",

            "dark:border-slate-700",
            "dark:bg-slate-900",
            "dark:text-white",
            "dark:focus:ring-blue-900",

            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-200",

            className
          )}
        />

        {rightIcon && (
          <button
            type="button"
            tabIndex={-1}
            onClick={onRightIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700 dark:hover:text-white"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}