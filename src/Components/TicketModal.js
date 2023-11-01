import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addTicketToBackend } from '../Slices/ticketSlice';

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
    width: '400px',
    padding: '20px',
  },
};
Modal.setAppElement('#root');

const TicketModal = ({ isOpen, onRequestClose, ticketId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    estimated_time: '',
    start_time: '',
    end_time: '',
    userIds: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTicketToBackend(formData))
      .then(() => {
        onRequestClose();
      })
      .catch((error) => {
        console.error('Error adding ticket:', error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Ticket Modal"
    >
      <h2>Add Ticket</h2>
      <form>
        <div>
          <label style={inputLabelStyle}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={inputLabelStyle}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={inputLabelStyle}>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label style={inputLabelStyle}>Estimated Time (minutes):</label>
          <input
            type="number"
            name="estimated_time"
            value={formData.estimated_time}
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
        <div>
          <label style={inputLabelStyle}>User IDs (comma-separated):</label>
          <input
            type="text"
            name="userIds"
            value={formData.userIds.join(', ')}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle} onClick={handleSubmit}>
          Add Ticket
        </button>
      </form>
    </Modal>
  );
};

export default TicketModal;
