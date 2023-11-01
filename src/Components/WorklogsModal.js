import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import {
  addWorklogToBackend
} from '../Slices/worklogSlice'; // Make sure to import the necessary actions

const buttonStyle = {
  backgroundColor: '#009688',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};
const inputLabelStyle = {
  display: 'block',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '5px',
};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    width: '400px', // Adjust the width as needed
    padding: '20px',
  },
};
Modal.setAppElement('#root');
const WorklogsModal = ({ isOpen, onRequestClose, ticketId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    end_time: '', 
    start_time: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ticket_id: ticketId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWorklogToBackend(formData, ticketId))
      .then(() => {
        onRequestClose();
      })
      .catch((error) => {
        console.error('Error adding worklog:', error);
      });
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Worklogs Modal"
    >
      <h2>Add Worklog</h2>
      <form>
        <div>
          <label style={inputLabelStyle}>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div>
  <label style={inputLabelStyle}>Start Time:</label>
  <input
    type="datetime-local"
    name="start_time"
    value={formData.start_time}
    onChange={handleInputChange}
    style={inputStyle}
  />
</div>
<div>
  <label style={inputLabelStyle}>End Time:</label>
  <input
    type="datetime-local"
    name="end_time"
    value={formData.end_time}
    onChange={handleInputChange}
    style={inputStyle}
  />
</div>

        <button type="submit" style={buttonStyle} onClick={handleSubmit}>
          Add Worklog
        </button>
      </form>
    </Modal>
  );
};
export default WorklogsModal;
