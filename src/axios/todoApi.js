/* eslint-disable no-useless-catch */
import axios from 'axios';

const TodoApi = axios.create({
  baseURL: 'http://94.74.86.174:8080/api', // Ganti dengan URL API Anda
});

// Fungsi untuk menetapkan token bearer
export const setBearerToken = (token) => {
  TodoApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log(TodoApi.defaults.headers.common['Authorization']);
};

// auth
export const Login = async ({ data }) => {
  try {
    const response = await TodoApi.post('/login', data);
    const token = response.data.data.token;
    setBearerToken(token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Register = ({ data }) => TodoApi.post('/register', data);

// checklist
export const GetAllChecklist = () => TodoApi.get('/checklist');
export const CreateChecklist = ({ data }) => TodoApi.post('/checklist', data);
export const DeleteChecklist = ({ id }) => TodoApi.delete(`/checklist/${id}`);

// checklist item
export const GetAllChecklistItem = ({ id_checklist }) => TodoApi.get(`/checklist/${id_checklist}/item`);
export const GetChecklistItem = ({ id_checklist, id_item }) => TodoApi.get(`/checklist/${id_checklist}/item/${id_item}`);
export const CreateChecklistItem = ({ id_checklist, data }) => TodoApi.post(`/checklist/${id_checklist}/item`, data);
export const DeleteChecklistItem = ({ id_checklist, id_item }) => TodoApi.delete(`/checklist/${id_checklist}/item/${id_item}`);
export const UpdateStatusChecklistItem = ({ id_checklist, id_item, data }) => TodoApi.put(`/checklist/${id_checklist}/item/${id_item}`, data);
export const RenameChecklistItem = ({ id_checklist, id_item, data }) => TodoApi.put(`/checklist/${id_checklist}/item/rename/${id_item}`, data);

export default TodoApi;
