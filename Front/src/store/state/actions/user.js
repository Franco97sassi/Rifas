import axios from 'axios';
import swal from 'sweetalert';
import { getUser, setNumbersToCart } from '../slices/userSlice';

const svHost = import.meta.env.VITE_SV_HOST;
// console.log(svHost);

export const logIn = (email, password) => async (dispatch) => {
 try {
  let res = await axios.post(`${svHost}/user/login`, email, password);
  //dispatch(getUser(res.data))
  sessionStorage.setItem('userData', JSON.stringify(res.data));
  window.location.href = '/home';
 } catch (e) {
  let respuesta = JSON.parse(e.request.response).error;
  if (respuesta) {
   swal(respuesta);
  } else swal('Ocurrio un error');
 }
};

export const register = (email, password, username) => async (dispatch) => {
 try {
  let res = await axios.post(
   `${svHost}/user/signin`,
   email,
   password,
   username,
  );

  if (res.data.message) {
   swal('', res.data.message, 'success').then(() => {
    window.location.href = '/home';
   });
  } else {
   console.log('error');
  }
 } catch (e) {
  let respuesta = JSON.parse(e.request.response).message;
  if (respuesta) {
   swal(respuesta);
  } else swal('Ocurrio un error');
 }
};

export const confirmAccount = (token) => async (dispatch) => {
 try {
  let res = await axios.get(`${svHost}/user/confirm/${token}`);
  console.log(res);
 } catch (err) {
  console.log(err.message);
 }
};

export const getUsers = () => async (dispatch) => {
 try {
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  let token = userData.token;
  let res = await axios.get(`${svHost}/user/users`, {
   headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
   },
  });
  dispatch(getUser(res.data));
 } catch (error) {
  console.log(error);
 }
};

export const changeEmailConfirm = (id) => async (dispatch) => {
 try {
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  let token = userData.token;
  let res = await axios.post(
   `${svHost}/user/confirmaccount`,
   { id },
   {
    headers: {
     Authorization: `Bearer ${token}`,
     Accept: 'application/json',
     'Content-Type': 'application/json',
    },
   },
  );
  await dispatch(getUsers());
  //dispatch(getUser(res.data))
  swal('', 'Usuario modificado correctamente!', 'success');
  console.log(res);
 } catch (e) {
  console.log(e);
 }
};

export const banear = (id) => async (dispatch) => {
 try {
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  let token = userData.token;
  let res = await axios.post(
   `${svHost}/user/banear`,
   { id },
   {
    headers: {
     Authorization: `Bearer ${token}`,
     Accept: 'application/json',
     'Content-Type': 'application/json',
    },
   },
  );
  await dispatch(getUsers());
  //dispatch(getUser(res.data))
  swal('', 'Usuario eliminado correctamente!', 'success');
  console.log(res);
 } catch (e) {
  console.log(e);
 }
};


