import axios from 'axios';
import { LoginUserData, RegisterUserData } from '../types/forms';
import { RegisterNewUserData } from '../types/services';

export const registerNewUser = async (userData: RegisterUserData) => {
    const newUserData: RegisterNewUserData = {
        name: userData.firstName + ' ' + userData.lastName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
    }
    const response = await axios.post('/users/register', newUserData);
    return response;
};

export const loginUser = async (userData: LoginUserData) => {
    const response = await axios.post('/auth/login', userData);
    return response;
};

export const getUser = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const user = {
        id: data._id,
        username: data.username,
        name: data.name,
        email: data.email,
    }
    return user;
};