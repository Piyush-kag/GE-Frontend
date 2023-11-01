    import React, { useEffect } from 'react';
import { fetchWorklogs } from '../Slices/worklogSlice';
    import { useState } from 'react';

    const WorklogsList = ({ ticketId }) => {
        const [worklogs, setWorklogs] = useState([]);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          fetchWorklogs(ticketId)
          console.log(ticketId)
            .then((data) => {
              setWorklogs(data);
            })
            .catch((error) => {
              setError(error.message);
            });
        }, [ticketId]);
      console.log(worklogs)
        if (error) {
          return <div>Error: {error}</div>;
        }
      
    return (
        <div>
        <h1>Worklogs for Ticket {ticketId}</h1>
        <table className="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration (minutes)</th>
            </tr>
            </thead>
            <tbody>
            {worklogs.map((worklog) => (
                <tr key={worklog.log_id}>
                <td>{worklog.log_id}</td>
                <td>{worklog.date}</td>
                <td>{worklog.start_time}</td>
                <td>{worklog.end_time}</td>
                <td>{worklog.duration}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default WorklogsList;
