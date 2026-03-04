import { assets } from "./../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-black text-white px-6 shadow-xl">

      {/* Logo */}
      <Link to={"/"} className="flex flex-col leading-tight">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">👑</span>
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 bg-clip-text text-transparent">
            ShopEZ
          </h1>
        </div>
        <span className="text-[10px] tracking-widest text-gray-400 uppercase">
          Premium Shopping
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-200">
        <NavLink to="/" className="hover:text-yellow-400 transition">
          HOME
        </NavLink>

        <NavLink to="/collection" className="hover:text-yellow-400 transition">
          COLLECTION
        </NavLink>

        <NavLink to="/about" className="hover:text-yellow-400 transition">
          ABOUT
        </NavLink>

        <NavLink to="/contact" className="hover:text-yellow-400 transition">
          CONTACT
        </NavLink>

        <NavLink to="/admin">
          <span className="border border-yellow-400 text-yellow-400 px-4 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition">
            ShopEZ Admin
          </span>
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">

        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer invert"
          alt="search"
        />

        {/* Profile */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer invert"
            alt="profile"
          />

          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-800 text-gray-200 rounded shadow-lg">
                <p className="cursor-pointer hover:text-yellow-400">
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-yellow-400"
                >
                  Orders
                </p>

                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-red-400"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 invert" alt="cart" />

          <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-yellow-500 text-black rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer invert sm:hidden"
        />

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-black text-white transition-all ${
          visible ? "w-full" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col p-6 gap-6 text-lg">

          <div
            onClick={() => setVisible(false)}
            className="cursor-pointer text-yellow-400"
          >
            ✕ Close
          </div>

          <NavLink onClick={() => setVisible(false)} to="/" className="hover:text-yellow-400">
            Home
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/collection" className="hover:text-yellow-400">
            Collection
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/about" className="hover:text-yellow-400">
            About
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/contact" className="hover:text-yellow-400">
            Contact
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/admin" className="hover:text-yellow-400">
            Admin Panel
          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
