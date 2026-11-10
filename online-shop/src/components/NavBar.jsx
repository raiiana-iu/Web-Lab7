import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";
function NavBar({ theme, setTheme }) {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch({ type: "LOGGED_OUT" });
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/products">
        Products
      </NavLink>

      {user && (
        <NavLink to="/cart">
          Cart ({itemCount})
        </NavLink>
      )}

      {user ? (
        <>
          <span>{user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">
          Login
        </NavLink>
      )}

      <button
        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      >
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
    </nav>
  );
}

export default NavBar;
