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
  const [displayName, setDisplayName] = useState<string>("Guest")
  const [file, setFile] = useState('')
  
  const formattedStartDate = format(state[0].startDate, "MMMM dd, yyyy");

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

  useEffect(() => {
    
  })
   

  
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
        <p className="welcome-message">
          Welcome, { displayName}
        </p>
      </div>
      <div className="profile-picture">
        <RiAccountCircleLine />
      </div>
    </section>
  );
};

export default AreaTop;
