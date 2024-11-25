import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import "./AreaTop.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { ThemeContext } from "../../../context/ThemeContext";
import logoLight from "../../../assets/images/white-logo.png";
import logoDark from "../../../assets/images/black-logo.png";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import { DateRange, RangeKeyDict } from "react-date-range";

interface SidebarContextType {
  openSidebar: () => void;
}

const AreaTop: React.FC = () => {
  const { openSidebar } = useContext(SidebarContext) as SidebarContextType;
  const { theme } = useContext(ThemeContext) || { theme: null };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const dateRangeRef = useRef<HTMLDivElement | null>(null);
  const [displayName, setDisplayName] = useState<string>("Guest");
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);

  const formattedStartDate = format(state[0].startDate, "MMMM dd, yyyy");

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("auth") || "")
    console.log("Logged-in email from storage:", user.name);
    setLoggedInEmail(user.name);
  }, []);


  useEffect(() => {
    if (loggedInEmail) {
      fetchUsersData();
    }
  }, [loggedInEmail]);

  const fetchUsersData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Auth token is missing");
        setDisplayName("Guest");
        return;
      }

      const response = await fetch("http://localhost:4000/users/login/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const users = Array.isArray(data) ? data : [data];
      const loggedInUser = users.find(
        (user: { email: string }) => user.email === loggedInEmail
        
      );

      if (loggedInUser) {
        setDisplayName(loggedInUser.name);
      } else {
        console.warn("Logged-in user not found in fetched data");
        setDisplayName("Guest");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setDisplayName("Guest");
    }
  };

  // Close date picker when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dateRangeRef.current &&
      !dateRangeRef.current.contains(event.target as Node)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <img
          className="logo"
          src={theme === "dark" ? logoDark : logoLight}
          alt=""
          style={{ width: "70px", height: "auto" }}
        />
        <h3 className="area-top-title">Documents</h3>
      </div>
      <div className="date-display">
        <p>Date: {formattedStartDate}</p>
      </div>

      {showDatePicker && (
        <div ref={dateRangeRef}>
          <DateRange
            editableDateInputs={true}
            onChange={(item: RangeKeyDict) => {
              const selection = item.selection;
              if (selection.startDate && selection.endDate) {
                setState([
                  {
                    startDate: selection.startDate,
                    endDate: selection.endDate,
                    key: selection.key || "selection",
                  },
                ]);
              }
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      )}

      <div className="area-top-right">
        <p className="welcome-message">Welcome, {loggedInEmail}</p>
      </div>
      <div className="profile-picture">
        <RiAccountCircleLine size={24} />
      </div>
    </section>
  );
};

export default AreaTop;
