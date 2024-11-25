import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import './App.scss'
import BaseLayout from "./layout/BaseLayout";
import { SidebarContext } from "./context/SidebarContext";
import { Dashboard } from "./screens"
import RegisterForm  from "./components/Authentication/RegisterForm";
import Login from "./components/Authentication/Login";
import Sidebar from "./components/Sidebar/Sidebar"
// import EditDocs  from "./components/Edits/EditDocs";



function App() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not provided");
  }
  const { theme, toggleTheme } = themeContext;

  const { openSidebar } = useContext(SidebarContext) || {};


  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  if (!openSidebar) {
    return null;
  }


  return (
    
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/document' element={<EditDocs />}/> */}
            
          </Route>
        </Routes>
        <Sidebar></Sidebar>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>

      </Router>
   
  )
}

export default App
