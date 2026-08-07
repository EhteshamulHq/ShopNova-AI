import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { addressSchema } from "../../validations/address/address.schema";

import Input from "../ui/Input";

import Button from "../ui/Button";

export default function AddressForm({
  defaultValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Address",
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),

    defaultValues: {
      fullName: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      addressType: "Home",

      ...defaultValues,
    },
  });

  useEffect(() => {
    reset({
      fullName: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      addressType: "Home",

      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

 <div className="grid gap-5 md:grid-cols-2">

  <Input
    label="Full Name"
    name="fullName"
    register={register}
    error={errors.fullName}
    required
  />

  <Input
    label="Mobile Number"
    name="mobileNumber"
    register={register}
    error={errors.mobileNumber}
    required
  />

</div>

<div className="grid gap-5 md:grid-cols-2">

  <Input
    label="Alternate Mobile"
    name="alternateMobileNumber"
    register={register}
    error={errors.alternateMobileNumber}
  />

  <Input
    label="Landmark"
    name="landmark"
    register={register}
    error={errors.landmark}
  />

</div>

<Input
  label="Address Line 1"
  name="addressLine1"
  register={register}
  error={errors.addressLine1}
  required
/>

<Input
  label="Address Line 2"
  name="addressLine2"
  register={register}
  error={errors.addressLine2}
/>

<div className="grid gap-5 md:grid-cols-3">

  <Input
    label="City"
    name="city"
    register={register}
    error={errors.city}
    required
  />

  <Input
    label="State"
    name="state"
    register={register}
    error={errors.state}
    required
  />

  <Input
    label="Postal Code"
    name="postalCode"
    register={register}
    error={errors.postalCode}
    required
  />

</div>

<div className="grid gap-5 md:grid-cols-2">

  <Input
    label="Country"
    name="country"
    register={register}
    error={errors.country}
  />

  <div className="flex flex-col gap-2">

    <label className="text-sm font-medium">
      Address Type
    </label>

    <select
      {...register("addressType")}
      className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
    >
      <option value="Home">
        Home
      </option>

      <option value="Office">
        Office
      </option>

      <option value="Other">
        Other
      </option>
    </select>

  </div>

</div>

<Button
  type="submit"
  loading={loading}
  className="w-full"
>
  {submitText}
</Button>

</form>
);
}