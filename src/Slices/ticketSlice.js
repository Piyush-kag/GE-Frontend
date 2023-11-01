import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tickets: [],
  status: 'idle',
  error: null, 
};

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(fetchTicketsPending());
    try {
      const response = await axios.get('http://localhost:8080/ticket');
      console.log(response.data);
      dispatch(fetchTicketsFulfilled(response.data));
    } catch (error) {
      console.error("Error fetching tickets:", error);   
      dispatch(fetchTicketsRejected(error.message));
    }
  };
};

export const getTicketsOfUser = (id) => {
  return async (dispatch) => {
    dispatch(fetchUserTicketPending());
    try {
      const response = await axios.get(`http://localhost:8080/ticket/user/${id}`);
      console.log(response.data);
      dispatch(fetchUserTicketFulfilled(response.data));
    } catch (error) {
      console.log("Error fetching Ticket of User:", error);   
      dispatch(fetchUserTicketRejected(error.message));
    }
  };
};

export const addTicketToBackend = (ticketData,projectId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/ticket/{projectId}', ticketData,projectId);
      dispatch(addTicketFulfilled(response.data));
    } catch (error) {
      console.error("Error adding ticket:", error);
      dispatch(addTicketRejected(error.message));
    }
  };
};


const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        fetchTicketsPending: (state) => {
        state.status = 'loading';
      },
      fetchTicketsFulfilled: (state, action) => {
        // console.log(state);
        state.status = 'succeeded';
        state.tickets = action.payload;
      },
      fetchTicketsRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
      addTicketFulfilled: (state, action) => {
        state.status = 'succeeded';
        state.tickets.push(action.payload);
      },
      addTicketRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
      fetchUserTicketPending: (state) => {
        state.status = 'loading';
      },
      fetchUserTicketFulfilled: (state, action) => {
        // console.log(state);
        state.status = 'succeeded';
        state.tickets = action.payload;
      },
      fetchUserTicketRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
    },
});

export const {
    fetchTicketsPending,
    fetchTicketsFulfilled,
    fetchTicketsRejected,
    addTicketFulfilled,
    addTicketRejected,
    fetchUserTicketPending,
    fetchUserTicketFulfilled,
    fetchUserTicketRejected,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
