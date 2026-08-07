import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white p-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <h1 className="text-5xl font-bold">
              ShopNova AI
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Smart Shopping Experience powered by AI.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✔ Premium UI</p>
              <p>✔ Secure Authentication</p>
              <p>✔ Fast Checkout</p>
              <p>✔ Personalized Shopping</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}