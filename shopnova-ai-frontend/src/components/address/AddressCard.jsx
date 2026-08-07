import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import ConfirmModal from "../common/ConfirmModal";

import useConfirm from "../../hooks/useConfirm";

import {
  deleteAddress,
  setDefaultAddress,
  getAddresses,
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

  const confirm = useConfirm();

  const handleDelete = async () => {
   const result = await dispatch(
  deleteAddress(address._id)
);

if (deleteAddress.fulfilled.match(result)) {
  dispatch(getAddresses());
}

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
  dispatch(getAddresses());
}

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
    <div>
      <div className="flex items-center justify-between">
        <h3>
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
          type="button"
          onClick={confirm.show}
          className="rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
        >
          <FaTrash />
          Delete
        </button>

        {!address.isDefault && (
          <button
            type="button"
            disabled={address.isDefault}
            onClick={handleDefault}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <FaCheckCircle />

            {address.isDefault
              ? "Default"
              : "Set Default"}
          </button>
        )}
      </div>

      <ConfirmModal
        open={confirm.open}
        title="Delete Address"
        message="This address will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={confirm.hide}
        onConfirm={async () => {
          confirm.hide();
          await handleDelete();
        }}
      />
    </div>
  );
}