import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import EditDocs from '../../Edits/EditDocs'

const AreaTableAction: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false); 
  const dropdownRef = useRef<HTMLDivElement | null>(null); 
  const [isEdit, setIsEdit] = useState(false)

  const handleEdits = () => {
    setIsEdit(!isEdit) 
  }
  if(isEdit) return < EditDocs handleEdit= {handleEdits}/>

  const handleDropdown = (): void => {
    setShowDropdown((prev) => !prev); 
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) 
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsVertical size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item" onClick={handleEdits}>
                  View
              </li>
              <li className="dropdown-menu-item">
                <Link to="/edit" className="dropdown-menu-link">
                  Edit
                </Link>
              </li>
              <li className="dropdown-menu-item">
                <Link to="/delete" className="dropdown-menu-link">
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default AreaTableAction;
