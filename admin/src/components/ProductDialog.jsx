import ProductForm from "./ProductForm";

export default function ProductDialog({
  open,
  productToEdit,
  onProductAdded,
  onProductUpdated,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Dialog Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-dark">
              {productToEdit ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-0.5 text-sm text-secondary">
              {productToEdit
                ? "Update the product details."
                : "Add a new product to your store."}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-secondary transition hover:bg-page hover:text-dark"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {/* Dialog Content */}
        <div className="overflow-y-auto p-6">
          <ProductForm
            productToEdit={productToEdit}
            onProductAdded={onProductAdded}
            onProductUpdated={onProductUpdated}
            onCancelEdit={onCancel}
          />
        </div>
      </div>
    </div>
  );
}