import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  worklogs: [],
  status: 'idle',
  error: null,
};

export const addWorklogToBackend = (worklogData, ticketId) => {
  console.log("Worklog Data",worklogData);
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:8080/worklogs/${ticketId}`, worklogData);
      dispatch(fetchWorklogsPending()); // Dispatch a pending action
      const response = await axios.get(`http://localhost:8080/ticket/${ticketId}/worklogs`);
      dispatch(fetchWorklogsFulfilled(response.data)); // Dispatch a fulfilled action
      console.log(response.data);
    } catch (error) {
      console.log("Error adding worklog:", error);
      dispatch(fetchWorklogsRejected(error.message)); // Dispatch a rejected action
    }
  };    
}

export const fetchWorklogsList = (ticketId) => {
  return async (dispatch) => {
    dispatch(fetchWorklogsPending()); // Dispatch a pending action
console.log("iiiiiiiiiiiiiii  ammmmmmmmmmmmmmmm ")
    try {
      console.log("..........................")
      const response = await axios.get(`http://localhost:8080/worklogs/by-ticket/${ticketId}`);
      console.log("inside fetch" ,response.data )
      dispatch(fetchWorklogsFulfilled(response.data)); // Dispatch a fulfilled action
    } catch (error) {
      console.error("Error fetching worklogs:", error);
      dispatch(fetchWorklogsRejected(error.message)); // Dispatch a rejected action
    }
  };
};
export const fetchWorklogs = async (ticketId) => {
  console.log(ticketId)
  try {
    const response = await axios.get(`http://localhost:8080/worklogs/by-ticket/${ticketId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};          

const worklogsSlice = createSlice({
  name: 'worklogs',
  initialState,
  reducers: {
    fetchWorklogsPending: (state) => {
      state.status = 'loading';
    },
    fetchWorklogsFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.worklogs = action.payload;
    },
    fetchWorklogsRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { 
  fetchWorklogsPending,
  fetchWorklogsFulfilled,
  fetchWorklogsRejected,
} = worklogsSlice.actions;

export default worklogsSlice.reducer;
