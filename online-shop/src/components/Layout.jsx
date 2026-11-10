import { Outlet } from "react-router";
import NavBar from "./NavBar";
function Layout({ theme }) {
  return (
    <div className={theme === "dark" ? "app dark" : "app light"}>
      <NavBar />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Online Shop © 2026</p>
      </footer>
    </div>
  );
}

export default Layout;
