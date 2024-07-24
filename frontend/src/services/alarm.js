import { baseInstance } from './api';

// Save one alarm
export const saveOneAlarm = async (userId, title, content) => {
  try {
    const response = await baseInstance.post('/alarms', {
      userId,
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving alarm:', error);
    throw error;
  }
};

// Delete an alarm
export const deleteAlarm = async (alarmId) => {
  try {
    const response = await baseInstance.delete(`/alarms/${alarmId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting alarm:', error);
    throw error;
  }
};

// Get alarms for a user
export const getAlarms = async (userId) => {
  try {
    const response = await baseInstance.get(`/alarms/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting alarms:', error);
    throw error;
  }
};
