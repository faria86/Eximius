import axios from 'axios';

const baseUserService = axios.create({
  baseURL: '/api/user'
});

const editUserProfile = (body) => {
  console.log('BODY OF EDIT USER PROFILE ->', body);
  return baseUserService
    .post(`/profile/edit`, body)
    .then((response) => Promise.resolve(response.data.user))
    .catch((error) => Promise.reject(error));
};

const sendInvitation = (body) => {
  return baseUserService
    .post('/profile/invitation', body)
    .then((response) => Promise.resolve(response.data.emailResult))
    .catch((error) => Promise.reject(error));
};

export { editUserProfile, sendInvitation };
