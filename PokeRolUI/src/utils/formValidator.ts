import { t } from "i18next";
import {
  LoginUserData,
  LoginValidationErrors,
  RegisterUserData,
  RegisterValidationErrors,
  ForgotPasswordData,
  ForgotPasswordValidationErrors,
  ResetPasswordData,
  ResetPasswordValidationErrors
} from "../types/forms";

export const registerValidator = (data: RegisterUserData) => {
    const errors: RegisterValidationErrors = {};

    if (!data.firstName) {
        errors.firstName = t('errors.firstName');
    }

    if (!data.lastName) {
        errors.lastName = t('errors.lastName');
    }   

    if (!data.username) {
        errors.username = t('errors.username');
    }   

    if (!data.email) {
        errors.email = t('errors.email-required');
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = t('errors.email-invalid');
    }

    if (!data.password) {
        errors.password = t('errors.password-required');
    } else if (data.password.length < 8) {
        errors.password = t('errors.password-minlength');
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = t('errors.confirmPassword-required');
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = t('errors.confirmPassword-match');
    }

    return errors;
};

export const loginValidator = (data: LoginUserData) => {
    const errors: LoginValidationErrors = {};

    if (!data.email) {
        errors.email = t('errors.email-required');
    }

    if (!data.password) {
        errors.password = t('errors.password-required');
    }

    return errors;
};

export const forgotPasswordValidator = (data: ForgotPasswordData) => {
    const errors: ForgotPasswordValidationErrors = {};

    if (!data.email) {
        errors.email = t('errors.email-required');
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = t('errors.email-invalid');
    }

    return errors;
};

export const resetPasswordValidator = (data: ResetPasswordData) => {
    const errors: ResetPasswordValidationErrors = {};

    if (!data.password) {
        errors.password = t('errors.password-required');
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = t('errors.confirmPassword-required');
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = t('errors.confirmPassword-match');
    }

    return errors;
};