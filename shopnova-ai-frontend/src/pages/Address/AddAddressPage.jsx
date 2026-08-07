import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import AddressForm from "../../components/address/AddressForm";

import {
  addAddress,
  clearAddressError,
  clearAddressSuccess,
} from "../../features/address";

export default function AddAddressPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.address);

  const handleSubmit = async (data) => {
    const result = await dispatch(addAddress(data));

    if (addAddress.fulfilled.match(result)) {
      dispatch(getAddresses());

      navigate("/address");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearAddressError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);

      dispatch(clearAddressSuccess());
    }
  }, [success, dispatch]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Address</h1>

        <p className="mt-2 text-slate-500">Add a new delivery address.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <AddressForm
          loading={loading}
          submitText="Save Address"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
