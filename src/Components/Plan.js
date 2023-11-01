import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import MainComponent from './MainComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Slices/userSlice';
import { getTicketsOfUser } from '../Slices/ticketSlice';

const localizer = momentLocalizer(moment);

const Plan = () => {
  const [events, setEvents] = useState([]);
  const { users } = useSelector((state) => state.users);
  const status = useSelector((state) => state.users.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching users...");
      dispatch(fetchUsers())
        .then((response) => {
          console.log("This is the useEffect of User statement");
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  });

  const handleSelect = (slotInfo) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title,
      };
      setEvents([...events, newEvent]);
    }
  };

  const getTickets = (id) => {
    if (typeof id === 'number') {
      dispatch(getTicketsOfUser(id));
    }
  };

  return (
    <>
      <MainComponent />
      <div className="CalendarPage">
        <div className="Sidebar">
          <h2>Users</h2>
          <div className="UserList">
          {users.map((user) => (
  <div key={user.id} className="UserCard">
    <button
      className="btn btn"
      onClick={() => {
        console.log("Clicked on user with ID:", user.id);
        getTickets(user.id);
      }}
    >
      {user.name}
    </button>
    
  </div>
))}
</div>
        </div>
        <div className="Calendar">
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              defaultDate={new Date()}
              defaultView="month"
              onSelectSlot={handleSelect}
              style={{ height: 700 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
