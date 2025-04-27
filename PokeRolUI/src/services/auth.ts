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