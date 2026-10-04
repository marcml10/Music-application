export default function DeleteDialog({
  open,
  product,
  deleting,
  onConfirm,
  onCancel,
}) {
  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg text-red-600">
            !
          </div>

          <div>
            <h2 className="text-lg font-semibold text-dark">
              Delete product?
            </h2>

            <p className="mt-1 text-sm leading-6 text-secondary">
              Are you sure you want to delete{" "}
              <span className="font-medium text-dark">
                {product.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-secondary transition hover:bg-page disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}