import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProductTable from "./components/ProductTable";
import ProductDialog from "./components/ProductDialog";
import ProductToolbar from "./components/ProductToolbar";
import DeleteDialog from "./components/DeleteDialog";

const API_URL = "http://localhost:8787/api/products";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productToEdit, setProductToEdit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  function openAddDialog() {
    setProductToEdit(null);
    setDialogOpen(true);
  }

  function handleEdit(product) {
    setProductToEdit(product);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setProductToEdit(null);
  }

  function handleDelete(product) {
    setProductToDelete(product);
  }

  function closeDeleteDialog() {
    if (deleting) {
      return;
    }

    setProductToDelete(null);
  }

  async function confirmDelete() {
    if (!productToDelete) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(
        `${API_URL}/${productToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      setProducts((previous) =>
        previous.filter(
          (product) => product.id !== productToDelete.id
        )
      );

      setProductToDelete(null);
    } catch (error) {
      console.error("Delete product error:", error);
    } finally {
      setDeleting(false);
    }
  }

  function handleProductAdded(product) {
    setProducts((previous) => [...previous, product]);
    closeDialog();
  }

  function handleProductUpdated(updatedProduct) {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    closeDialog();
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("newest");
  }

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))]
      .filter(Boolean)
      .sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    const result = products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);

        case "price-low":
          return Number(a.price) - Number(b.price);

        case "price-high":
          return Number(b.price) - Number(a.price);

        case "rating":
          return Number(b.rating || 0) - Number(a.rating || 0);

        case "newest":
        default:
          return Number(b.id) - Number(a.id);
      }
    });
  }, [products, search, category, sort]);

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        {page === "dashboard" ? (
          <Dashboard products={products} />
        ) : (
          <main className="flex-1 p-8">
            {/* Page Header */}
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-dark">
                  Products
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Manage your store inventory.
                </p>
              </div>

              <button
                onClick={openAddDialog}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                + Add Product
              </button>
            </div>

            {loading && (
              <p className="text-sm text-secondary">
                Loading products...
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-secondary">
                      Total Products
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-dark">
                      {products.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-secondary">
                      Categories
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-dark">
                      {categories.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-secondary">
                      Average Rating
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-dark">
                      {products.length > 0
                        ? (
                            products.reduce(
                              (total, product) =>
                                total +
                                Number(product.rating || 0),
                              0
                            ) / products.length
                          ).toFixed(1)
                        : "0.0"}

                      <span className="ml-1 text-base text-secondary">
                        ★
                      </span>
                    </p>
                  </div>
                </div>

                {/* Search / Filter */}
                <div className="mt-8">
                  <ProductToolbar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    categories={categories}
                    onClear={clearFilters}
                  />
                </div>

                {/* Results */}
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-secondary">
                    Showing {filteredProducts.length} of{" "}
                    {products.length} products
                  </p>
                </div>

                <ProductTable
                  products={filteredProducts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
          </main>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <ProductDialog
        open={dialogOpen}
        productToEdit={productToEdit}
        onProductAdded={handleProductAdded}
        onProductUpdated={handleProductUpdated}
        onCancel={closeDialog}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={Boolean(productToDelete)}
        product={productToDelete}
        deleting={deleting}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </div>
  );
}