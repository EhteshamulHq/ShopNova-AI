/**
 * ==========================================================
 * ShopNova AI
 * Profile Page
 *
 * API
 * GET /api/auth/profile
 *
 * Redux
 * auth
 * ==========================================================
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Button from "../../components/ui/Button";

import { getProfile } from "../../features/auth/authThunks";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

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
      className="mx-auto max-w-5xl p-6"
    >
      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700 dark:bg-slate-800 dark:text-white">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                : "U"}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user?.name || "-"}</h1>

              <p className="text-sm text-slate-500">{user?.email || "-"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/profile/edit")}>
              Edit Profile
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate("/profile/change-password")}
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 text-lg font-semibold capitalize">
              {user?.role || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Email Verification</p>
            <p className="mt-1 text-lg font-semibold">
              {user?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
