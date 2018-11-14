import axios from 'axios';
//import { TEST_DISPATCH } from './types';
import { CURRENT_USER, GET_ERRORS } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/user/register', userData);
    console.log(res.data);
    // dispatch({
    //   type: REGISTER,
    //   payload: res.data
    // })

    history.push('login');
  } catch (err) {
    //console.log(err.response.data.res_msg);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data.res_msg
    })
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/user/login', userData);
    //console.log(res.data);
    const { token }= res.data.res_data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    //console.log(decoded);
    dispatch(setCurrentUser(decoded));

    // dispatch({
    //   type: CURRENT_USER,
    //   payload: decoded
    // })

    // const current = await axios.get('/api/user/my/current');
    // console.log(current.data);
    
    // dispatch({
    //   type: CURRENT_USER,
    //   payload: current.data.res_data
    // })
  } catch (err) {
    //console.log(err.response.data.res_msg);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data.res_msg
    })
  }
};

export const setCurrentUser = (decode) => {
  return {
    type: CURRENT_USER,
    payload: decode
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};