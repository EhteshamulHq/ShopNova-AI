/**
 * ==========================================================
 * ShopNova AI
 * Edit Profile
 *
 * API
 * PUT /api/auth/profile
 *
 * Redux
 * updateProfile thunk
 * ==========================================================
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";

import { updateProfile } from "../../features/auth/authThunks";
import { updateProfileSchema } from "../../validations/profile/updateProfile.schema";

export default function EditProfilePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      await dispatch(updateProfile(values)).unwrap();

      toast.success("Profile updated successfully.");

      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Edit Profile</h1>

        <Link to="/profile" className="text-sm text-slate-500 hover:underline">
          Cancel
        </Link>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            name="name"
            register={register}
            error={errors.name}
            required
          />

          <Input label="Email" value={user?.email || ""} disabled />

          <div className="flex gap-3">
            <Button type="submit" loading={loading} fullWidth>
              Save Changes
            </Button>

            <Link to="/profile" className="ml-2 w-40">
              <Button variant="secondary" fullWidth>
                Back
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
