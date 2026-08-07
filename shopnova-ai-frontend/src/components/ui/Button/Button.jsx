/**
 * ==========================================================
 * ShopNova AI
 * File: Button.jsx
 *
 * Purpose:
 * Reusable Button Component
 *
 * Backend API:
 * None
 *
 * Redux:
 * None
 *
 * Features:
 * - Loading State
 * - Disabled State
 * - Variants
 * - Full Width
 * - Responsive
 * ==========================================================
 */

import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  success:
    "bg-green-600 hover:bg-green-700 text-white",

  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800",

  ghost:
    "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-xl",
        "px-5 py-3",
        "font-semibold",
        "transition-all duration-300",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-500",
        "disabled:cursor-not-allowed",
        "disabled:opacity-60",
        "active:scale-95",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity=".25"
            />
            <path
              fill="currentColor"
              d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
            />
          </svg>

          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}