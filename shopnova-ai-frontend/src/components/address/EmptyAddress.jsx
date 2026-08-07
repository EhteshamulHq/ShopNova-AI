import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function EmptyAddress() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600 dark:bg-blue-900/30">
        <FaMapMarkerAlt />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        No Address Found
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        You haven't added any delivery address yet.
        Add your first address to continue shopping.
      </p>

      <Link
        to="/address/add"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Add New Address
      </Link>
    </div>
  );
}