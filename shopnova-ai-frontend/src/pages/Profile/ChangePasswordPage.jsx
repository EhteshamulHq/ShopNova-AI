import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { changePasswordSchema } from "../../validations/profile/changePassword.schema";
import { changePassword } from "../../features/auth/authThunks";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(
    (state) => state.auth
  );

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      changePasswordSchema
    ),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(
        changePassword({
          currentPassword:
            values.currentPassword,

          newPassword:
            values.newPassword,
        })
      ).unwrap();

      toast.success(
        "Password changed successfully."
      );

      reset();

      navigate("/profile");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <h1 className="mb-8 text-3xl font-bold">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Input
            label="Current Password"
            type={
              showCurrent
                ? "text"
                : "password"
            }
            register={register}
            name="currentPassword"
            error={
              errors.currentPassword
            }
            rightIcon={
              showCurrent ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            }
            onRightIconClick={() =>
              setShowCurrent(
                !showCurrent
              )
            }
          />

          <Input
            label="New Password"
            type={
              showNew
                ? "text"
                : "password"
            }
            register={register}
            name="newPassword"
            error={errors.newPassword}
            rightIcon={
              showNew ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            }
            onRightIconClick={() =>
              setShowNew(!showNew)
            }
          />

          <Input
            label="Confirm Password"
            type={
              showConfirm
                ? "text"
                : "password"
            }
            register={register}
            name="confirmPassword"
            error={
              errors.confirmPassword
            }
            rightIcon={
              showConfirm ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            }
            onRightIconClick={() =>
              setShowConfirm(
                !showConfirm
              )
            }
          />

          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}