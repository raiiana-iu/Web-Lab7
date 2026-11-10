import { Link } from "react-router";
function Home() {
  return (
    <div>
      <h1>Welcome to Our Online Shop!</h1>

      <p>
        Discover our collection of products
        and find what you need.
      </p>

      <Link to="/products">
        Browse Products
      </Link>
    </div>
  );
}

export default Home;
