import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainComponent from "./MainComponent";
import { fetchTickets } from "../Slices/ticketSlice";
import { Link } from "react-router-dom";
import WorklogsModal from "./WorklogsModal";
import TicketModal from "./TicketModal";

const AllTickets = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const status = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching tickets...");
      dispatch(fetchTickets())
        .then((response) => {
          // console.log("This is the return statement");
          // console.log("API Response:", response);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  }, [dispatch, status]);

  function formatDateTime(dateTimeString) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [draggedTicket, setDraggedTicket] = useState(null);

  const openWorklogsModal = () => {
    setModalOpen(true);
  };

  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  const handleDragStart = (e, ticket) => {
    // Store the card's data
    setDraggedTicket(ticket);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, ticket) => {
    e.preventDefault();
    if (draggedTicket) {
      const updatedTickets = [...tickets];

      const draggedIndex = updatedTickets.findIndex(
        (t) => t.ticketId === draggedTicket.ticketId
      );
      const droppedIndex = updatedTickets.findIndex(
        (t) => t.ticketId === ticket.ticketId
      );

      if (draggedIndex !== -1 && droppedIndex !== -1) {
        [updatedTickets[draggedIndex], updatedTickets[droppedIndex]] = [
          updatedTickets[droppedIndex],
          updatedTickets[draggedIndex],
        ];

        // Dispatch an action to update the order in your Redux state
        // dispatch(updateTicketOrder(updatedTickets));

        setDraggedTicket(null);
      }
    }
  };

  return (
    <div className="ticket-bg">
      <MainComponent />
      <h1 className="allprojects">All Tickets</h1>
      {status === "loading" && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "succeeded" && (
        <div>
          <div className="row">
        {tickets.map((ticket, index) => (
          <div key={ticket.ticketId} className="col-lg-3 mb-4">
            <div
              style={{ maxWidth: "20rem" }}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, ticket)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, ticket)}
            >
              <div className="card-container">
                <div className="card text-bg mb-4" style={{ maxWidth: "20rem" }}>
                  <div className="card-header">Ticket ID: {ticket.ticketId}</div>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ticket.title}</h5>
                      <p className="card-text">{ticket.desciption}</p>
                      
                      <p className="card-text">Start Time: {formatDateTime(ticket.start_time)}</p>
                      <p className="card-text">End Time: {formatDateTime(ticket.end_time)}</p>
                      <button
                        className="btn btn-primary btn-zoom"
                        style={{ marginLeft: "10px" }}
                        onClick={() => openWorklogsModal(ticket.ticketId)}
                      >
                        Add Worklogs
                      </button>
                      <Link to={`/worklogs/by-ticket/${ticket.ticketId}`} style={{ marginLeft: "10px" }}>
                        <button className="btn btn-warning btn-zoom">View Worklogs</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add a new row after every 4 cards */}
            {index > 0 && index % 4 === 0 && <div className="w-100"></div>}
          </div>
        ))}
      </div>
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}
      {isModalOpen && (
        <WorklogsModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />
      )}
      {isTicketModalOpen && (
        <TicketModal isOpen={isTicketModalOpen} onRequestClose={() => setTicketModalOpen(false)} />
      )}
    </div>
  );
};

export default AllTickets;
