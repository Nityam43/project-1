import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center gap-x-10 text-sm mb-10">
      <NavLink className={(e) => e.isActive ? "text-red-300" : undefined} to="/">
        Home
      </NavLink>
      <NavLink className={(e) => e.isActive ? "text-red-300" : undefined} to="/recipes">
        Recipes
      </NavLink>
      <NavLink className={(e) => e.isActive ? "text-red-300" : undefined} to="/about">
        About
      </NavLink>
      <NavLink
        className={(e) => e.isActive ? "text-red-300" : undefined}
        to="/create-recipe"
      >
        Create Recipe
      </NavLink>
      <NavLink
        className={(e) => e.isActive ? "text-red-300" : undefined}
        to="/fav"
      >
        Favourite
      </NavLink>
    </div>
  );
};

export default Navbar;
