import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
              <h2 className="text-xl font-bold">
                {title}
              </h2>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                {message}
              </p>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {loading
                    ? "Deleting..."
                    : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}