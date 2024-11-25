import Taskboard from "../../components/DashBoard/taskboard/Taskboard";
import AreaTop from "../../components/DashBoard/areaTop/AreaTop";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <Taskboard />
    </div>
  );
};

export default Dashboard;
