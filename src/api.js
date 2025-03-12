import axios from "axios";

const API_URL = process.env.API_URL;

export const getTeachers = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/teachers?page=${page}&limit=${limit}`);
  return response.data;
};

export const getTeacherPositions = async () => {
  const response = await axios.get(`${API_URL}/teacher-positions`);
  return response.data;
};

export const addTeacherPosition = async (data, token) => {
  const response = await axios.post(`${API_URL}/teacher-positions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};