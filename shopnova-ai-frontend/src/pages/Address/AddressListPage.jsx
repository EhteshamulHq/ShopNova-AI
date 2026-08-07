import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { FaPlus } from "react-icons/fa";

import Button from "../../components/ui/Button";

import AddressList from "../../components/address/AddressList";

import {
  getAddresses,
} from "../../features/address";

export default function AddressListPage() {
  const navigate = useNavigate();

  // Temporary Dummy Data
  // Redux API se next step me replace hoga.

 const { addresses } = useSelector(
  (state) => state.address
);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getAddresses());
}, [dispatch]);

  const handleEdit = (address) => {
    navigate(
      `/address/edit/${address._id}`
    );
  };

  const handleDelete = (address) => {
    console.log(address);
  };

  const handleDefault = (address) => {
    console.log(address);
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Addresses
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your delivery
            addresses.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate("/address/add")
          }
        >
          <FaPlus />

          Add Address
        </Button>
      </div>

      <AddressList
        addresses={addresses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDefault={handleDefault}
      />
    </div>
  );
}