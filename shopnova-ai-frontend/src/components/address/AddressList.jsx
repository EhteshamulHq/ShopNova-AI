import { motion } from "framer-motion";

import AddressCard from "./AddressCard";
import EmptyAddress from "./EmptyAddress";

export default function AddressList({
  addresses = [],
  onEdit,
  onDelete,
  onDefault,
}) {
  if (!addresses.length) {
    return <EmptyAddress />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {addresses.map((address, index) => (
        <motion.div
          key={address._id || index}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.08,
          }}
        >
          <AddressCard
            address={address}
            onEdit={() => onEdit(address)}
            onDelete={() => onDelete(address)}
            onDefault={() =>
              onDefault(address)
            }
          />
        </motion.div>
      ))}
    </div>
  );
}