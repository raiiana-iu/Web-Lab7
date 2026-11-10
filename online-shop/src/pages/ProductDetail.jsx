import { useParams, useNavigate, Link } from "react-router";
import { fetchProduct } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const {
    loading,
    error,
    data: product,
  } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  if (loading) return <p>Loading product...</p>;

  if (error) {
    return (
      <div>
        <h2>Product not found</h2>
        <p>{error}</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/products")}>
        Back
      </button>

      <h1>{product.title}</h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        width="250"
      />

      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>

      <button onClick={() => addItem(product)}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductDetail;
