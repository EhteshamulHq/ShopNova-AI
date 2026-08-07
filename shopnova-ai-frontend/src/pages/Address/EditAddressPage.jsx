import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import AddressForm from "../../components/address/AddressForm";

import {
  getAddressById,
  updateAddress,
  clearAddressError,
  clearAddressSuccess,
} from "../../features/address";

export default function EditAddressPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    addresses,
    loading,
    error,
    success,
  } = useSelector(
    (state) => state.address
  );

const { selectedAddress } =
  useSelector(
    (state) => state.address
  );

 useEffect(() => {
  dispatch(getAddressById(id));
}, [dispatch, id]);

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

      navigate("/address");
    }
  }, [success, dispatch, navigate]);

  const handleSubmit = async (data) => {
  const result = await dispatch(
  updateAddress({
    id,
    payload: data,
  })
);

if (updateAddress.fulfilled.match(result)) {
  dispatch(getAddresses());
}
  };

 if (loading) {
  return (
    <div className="p-6">
      Loading...
    </div>
  );
}

if (!selectedAddress) {
  return null;
}

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Address
        </h1>

        <p className="mt-2 text-slate-500">
          Update your delivery address.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <AddressForm
          defaultValues={selectedAddress}
          loading={loading}
          submitText="Update Address"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}