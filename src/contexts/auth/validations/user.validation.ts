// types
import { Translation } from '@/contexts/core/language';
// utils
import * as yup from 'yup';

export const userNameValidation = yup
    .string()
    .required('auth.name.required' as Translation)
    .matches(/^[A-Za-z]+.*$/, 'auth.name.start' as Translation)
    .matches(/^\w+$/, 'auth.name.only' as Translation)
    .matches(/^.{3,32}$/, 'auth.name.min' as Translation);

export const userPasswordValidation = yup
    .string()
    .required('auth.password.required' as Translation)
    .matches(/^.*[a-z]+.*$/, 'auth.password.lowercase' as Translation)
    .matches(/^.*[A-Z]+.*$/, 'auth.password.uppercase' as Translation)
    .matches(/^.*\d+.*$/, 'auth.password.decimal' as Translation)
    .matches(/^.*\W+.*$/, 'auth.password.special' as Translation)
    .matches(/^.{8,32}$/, 'auth.password.between' as Translation);
