import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainComponent from "./MainComponent";
import { fetchProjects } from "../Slices/projectSlice";
import { Link } from "react-router-dom";

const AllProjects = () => {
  const dispatch = useDispatch();
  const {projects} = useSelector((state) => state.projects);
  const status = useSelector((state) => state.projects.status);
  const error = useSelector((state) => state.projects.error);
  
  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching projects...");
      dispatch(fetchProjects())
      .then((response) => {
          console.log("All Projects");
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  });

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }
  
  
  return (
    <div className="ticket-bg">
      <MainComponent />
      <h1 className="allprojects">All Projects</h1>
      {status === "loading" && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "succeeded" && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Start Date and Time</th>
              <th>End Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {projects.map((project) => (
    <tr key={project.projectId}>
      <td>{project.projectId}</td>
      <td>{project.name}</td>
      <td>{project.description}</td>
      <td>{formatDateTime(project.start_date)}</td>
      <td>{formatDateTime(project.end_date)}</td>
      <td><Link to="/allTickets" className="btn btn-primary">Show Tickets</Link></td>
    </tr>
  ))}
</tbody>

        </table>
      )}
      {status === "failed" && <div>Error: {error}</div>}
    </div>
  );
};

export default AllProjects;
