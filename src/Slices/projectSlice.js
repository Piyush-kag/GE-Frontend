import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  projects: [],
  status: 'idle',
  error: null, 
};

export const fetchProjects = () => {
  return async (dispatch) => {
    dispatch(fetchProjectsPending());
    try {
      const response = await axios.get('http://localhost:8080/project');
      console.log(response.data);
      dispatch(fetchProjectsFulfilled(response.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
      dispatch(fetchProjectsRejected(error.message));
    }
  };
};


const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        fetchProjectsPending: (state) => {
        state.status = 'loading';
      },
      fetchProjectsFulfilled: (state, action) => {
        console.log(state);
        state.status = 'succeeded';
        state.projects = action.payload;
      },
      fetchProjectsRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
});

export const {
    fetchProjectsPending,
    fetchProjectsFulfilled,
    fetchProjectsRejected
} = projectsSlice.actions;

export default projectsSlice.reducer;
