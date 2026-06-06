import axios from 'axios';
const baseUrl = '/api/blogs';
import useUserStore from '../stores/userStore';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blogObject) => {
  const token = useUserStore.getState().token;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const update = async (blogObject, blogId) => {
  const token = useUserStore.getState().token;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blogId}`, blogObject, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const token = useUserStore.getState().token;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response;
};

export default { getAll, create, update, deleteBlog };
