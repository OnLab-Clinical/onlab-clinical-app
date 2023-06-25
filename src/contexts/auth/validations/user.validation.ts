// types
import { Translation } from '@/contexts/core/language';
// utils
import * as yup from 'yup';
import { sub } from 'date-fns';

// person
export const nameValidation = yup.string().required('auth.name.required' satisfies Translation);
export const surnameValidation = yup
    .string()
    .required('auth.surname.required' satisfies Translation);
export const sexValidation = yup.string().required('auth.sex.required' satisfies Translation);
export const birthValidation = yup
    .date()
    .typeError('auth.birth.required' satisfies Translation)
    .required('auth.birth.required' satisfies Translation)
    .max(sub(new Date(), { years: 18 }), 'auth.birth.adult' satisfies Translation);
export const nidValidation = yup.string().required('auth.nid.required' satisfies Translation);

// contacts
export const addressCountryValidation = yup
    .string()
    .required('auth.country.required' satisfies Translation);
export const departmentValidation = yup
    .string()
    .required('auth.department.required' satisfies Translation);
export const municipalityValidation = yup
    .string()
    .required('auth.municipality.required' satisfies Translation);
export const addressValidation = yup
    .string()
    .required('auth.address.required' satisfies Translation);

export const emailValidation = yup
    .string()
    .required('auth.email.required' satisfies Translation)
    .email('auth.email.format' satisfies Translation);
export const countryValidation = yup
    .string()
    .required('auth.country.calling-required' satisfies Translation);
export const phoneValidation = yup
    .string()
    .required('auth.phone.required' satisfies Translation)
    .matches(/^\d{7,10}$/, 'auth.phone.format' satisfies Translation);

// user
export const userNameValidation = yup
    .string()
    .required('auth.username.required' satisfies Translation)
    .matches(/^[A-Za-z]+.*$/, 'auth.username.start' satisfies Translation)
    .matches(/^\w+$/, 'auth.username.only' satisfies Translation)
    .matches(/^.{3,32}$/, 'auth.username.min' satisfies Translation);
export const userPasswordValidation = yup
    .string()
    .required('auth.password.required' satisfies Translation)
    .matches(/^.*[a-z]+.*$/, 'auth.password.lowercase' satisfies Translation)
    .matches(/^.*[A-Z]+.*$/, 'auth.password.uppercase' satisfies Translation)
    .matches(/^.*\d+.*$/, 'auth.password.decimal' satisfies Translation)
    .matches(/^.*\W+.*$/, 'auth.password.special' satisfies Translation)
    .matches(/^.{8,32}$/, 'auth.password.between' satisfies Translation);
export const confirmPasswordValidation = yup
    .string()
    .required('auth.password.required-confirm' satisfies Translation)
    .oneOf([yup.ref('password')], 'auth.password.equal' satisfies Translation);
