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
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response;
};

export const getUser = async () => {
    const { data } = await axios.get('/users/me');
    const user = {
        id: data._id,
        username: data.username,
        name: data.name,
        email: data.email,
    }
    return user;
};

export const verifyToken = async () => {
    try {
        const response = await axios.get('/auth/alive');
        if(response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        return false;
    }
};