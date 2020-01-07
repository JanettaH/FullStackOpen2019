import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log("blogservice" + token);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const addBlog = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateBlog = async updatedObject => {
  const response = await axios.put(
    baseUrl + "/" + updatedObject.id,
    updatedObject
  );
  return response.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.delete(baseUrl + "/" + id, config);
  return response.data;
};

export default { getAll, setToken, addBlog, updateBlog, deleteBlog };
