import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineLogin,
  MdOutlineFolder,
  MdOutlineMessage,
  MdOutlineSettings,
  MdOutlineAdd,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";




const Sidebar: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const sidebarContext = useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error("SidebarContext must be used within a SidebarProvider");
  }

  const { isSidebarOpen, closeSidebar } = sidebarContext;
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node) &&
      (event.target as HTMLElement).className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src="" alt="" />
          <span className="sidebar-brand-text">Doc-Flow</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/createTeam"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineFolder size={20} />
                </span>
                <span className="menu-link-text">Files</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/addproject"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineAdd size={20} />
                </span>
                <span className="menu-link-text">Create Document</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/addtask"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={18} />
                </span>
                <span className="menu-link-text">Add Member Task</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/notification"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Notification</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineSettings size={18} />
                </span>
                <span className="menu-link-text">Profile Settings</span>
              </NavLink>
            </li>
            <li className="menu-item">
              {isLoggedIn ? (
                <button
                  onClick= { handleLogout }
                  className="menu-link"
                >
                  <span className="menu-link-icon">
                    <MdOutlineLogout size={20} />
                  </span>
                  <span className="menu-link-text">Logout</span>
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                >
                  <span className="menu-link-icon">
                    <MdOutlineLogin size={20} />
                  </span>
                  <span className="menu-link-text">Login</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
function signOut() {
  throw new Error("Function not implemented.");
}

