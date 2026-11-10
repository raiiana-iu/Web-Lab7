import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { loading, error, data: products } = useFetch(
    fetchProducts,
    []
  );

  function updateFilter(key, value) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  }

  if (loading) return <p>Loading products...</p>;

  if (error) return <p>Error: {error}</p>;

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      !category || product.category === category;

    return matchesTitle && matchesCategory;
  });

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => updateFilter("q", e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="">All categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
