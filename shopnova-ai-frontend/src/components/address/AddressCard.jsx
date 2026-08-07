import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import {
  deleteAddress,
  setDefaultAddress,
} from "../../features/address";

import {
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onDefault,
}) {
  const dispatch = useDispatch();

const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this address?"
  );

  if (!confirmed) return;

  const result = await dispatch(
    deleteAddress(address._id)
  );

  if (deleteAddress.fulfilled.match(result)) {
    toast.success(
      "Address deleted successfully."
    );
  } else {
    toast.error(
      result.payload ||
        "Unable to delete address."
    );
  }
};

const handleDefault = async () => {
  const result = await dispatch(
    setDefaultAddress(address._id)
  );

  if (setDefaultAddress.fulfilled.match(result)) {
    toast.success(
      "Default address updated."
    );
  } else {
    toast.error(
      result.payload ||
        "Unable to update default address."
    );
  }
};
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {address.fullName}
        </h3>

        {address.isDefault && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Default
          </span>
        )}
      </div>

      <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
        <p>{address.mobileNumber}</p>

        <p>
          {address.addressLine1}
        </p>

        {address.addressLine2 && (
          <p>{address.addressLine2}</p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.postalCode}</p>

        <p>{address.country}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600"
        >
          <FaTrash />
         <button
  type="button"
  onClick={handleDelete}
  className="rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
>
  Delete
</button>
        </button>

        {!address.isDefault && (
          <button
            onClick={onDefault}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            <FaCheckCircle />
            <button
  type="button"
  disabled={address.isDefault}
  onClick={handleDefault}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
>
  {address.isDefault
    ? "Default"
    : "Set Default"}
</button>
          </button>
        )}
      </div>
    </div>
  );
}