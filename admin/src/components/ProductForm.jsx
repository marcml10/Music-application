import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export default function ProductForm({
  productToEdit,
  onProductAdded,
  onProductUpdated,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    original_price: "",
    rating: "",
    reviews: "",
    image_url: "",
    tag: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        category: productToEdit.category || "",
        price: productToEdit.price || "",
        original_price: productToEdit.original_price || "",
        rating: productToEdit.rating || "",
        reviews: productToEdit.reviews || "",
        image_url: productToEdit.image_url || "",
        tag: productToEdit.tag || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        original_price: "",
        rating: "",
        reviews: "",
        image_url: "",
        tag: "",
      });
    }

    setError("");
  }, [productToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      original_price: formData.original_price
        ? Number(formData.original_price)
        : null,
      rating: formData.rating ? Number(formData.rating) : 0,
      reviews: formData.reviews ? Number(formData.reviews) : 0,
      image_url: formData.image_url,
      tag: formData.tag,
    };

    try {
      const isEditing = Boolean(productToEdit);

      const response = await fetch(
        isEditing
          ? `${API_URL}/${productToEdit.id}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Failed to update product"
              : "Failed to create product")
        );
      }

      console.log(
        isEditing ? "PUT response:" : "POST response:",
        data
      );

      if (isEditing) {
        onProductUpdated(data);
      } else {
        onProductAdded(data);

        setFormData({
          name: "",
          category: "",
          price: "",
          original_price: "",
          rating: "",
          reviews: "",
          image_url: "",
          tag: "",
        });
      }
    } catch (error) {
      console.error("Product save error:", error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-5 sm:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Product name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Studio Headphones"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Category
          </label>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Headphones"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Price
          </label>

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="14999"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Original price
          </label>

          <input
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            type="number"
            placeholder="17999"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Rating
          </label>

          <input
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="4.8"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Reviews
          </label>

          <input
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            type="number"
            min="0"
            placeholder="124"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Image URL
          </label>

          <input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Tag
          </label>

          <input
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            type="text"
            placeholder="New"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : productToEdit
                ? "Save Changes"
                : "Add Product"}
          </button>

          {productToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={saving}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-secondary transition hover:bg-page disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}