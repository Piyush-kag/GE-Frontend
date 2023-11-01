import React from "react";
import { Link } from "react-router-dom";

const MainComponent = () => {
  return (
    <div>
      <center>
        <span>
.        </span>
        <div className="nav-buttons">
          <Link to="/allProjects" className="btn btn-primary">
            All Projects
          </Link>
          <Link to="/plan" className="btn btn-primary" style={{marginLeft:'20px'}}>
            Plan
          </Link>
        </div>
      </center>
    </div>
  );
};
export default MainComponent;
