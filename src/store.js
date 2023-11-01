// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './Slices/projectSlice';
import ticketSlice from './Slices/ticketSlice';
import worklogs from './Slices/worklogSlice';
import userSlice from './Slices/userSlice';


const store = configureStore({
  reducer: {
    projects: projectSlice,
    tickets:ticketSlice,
    worklogs:worklogs,
    users:userSlice,
  },
});

export default store;
