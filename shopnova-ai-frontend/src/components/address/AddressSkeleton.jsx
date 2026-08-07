import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export default function AddressSkeleton() {
  return (
    <div className="rounded-3xl border p-6">
      <Skeleton height={30} width={220} />

      <Skeleton
        height={20}
        count={5}
        className="mt-4"
      />

      <Skeleton
        height={45}
        className="mt-6"
      />
    </div>
  );
}