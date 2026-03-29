import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
        <div>Logo</div>
      <nav className="flex gap-5 items-center">
        <NavLink to={"/"}>All Posts</NavLink>
        <NavLink to={"/new"}>Add New</NavLink>
      </nav>
    </div>
  )
}

export default Navbar
