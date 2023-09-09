import { Avatar, DarkThemeToggle, Dropdown } from "flowbite-react";
import useAuthCalls from "../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const links = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "New Blog",
    path: "/newblog",
  },
  {
    title: "My Blogs",
    path: "/my-blogs",
  },
  {
    title: "Profile",
    path: "/profile",
  },

];

const NavBar = () => {
  const { logout } = useAuthCalls();
  const { currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <nav className="dark:bg-slate-600 bg-slate-500 flex justify-between items-center p-4 text-white fixed top-0 w-full z-10">
        <DarkThemeToggle className="bg-white dark:bg-slate-500" />

        <span
          onClick={() => navigate("/")}
          role="button"
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ASP Blog
        </span>

        <div className="flex md:order-2 z-30">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img={currentUser?.image}
                rounded={true}
              />
            }>
            {currentUser ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser?.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser?.email}
                  </span>
                </Dropdown.Header>
                {links.map(item => (
                  <Dropdown.Item onClick={() => navigate(item.path)}>
                    {item.title}
                  </Dropdown.Item>
                ))}

                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item onClick={() => navigate("/login")}>
                  Login
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/register")}>
                  Register
                </Dropdown.Item>
              </>
            )}
          </Dropdown>
          {/* <Navbar.Toggle /> */}
        </div>
      </nav>
      <div className="h-[55px]"></div>
    </>
  );
};

export default NavBar;
