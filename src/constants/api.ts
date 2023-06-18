import axios, { AxiosInstance } from 'axios';
import { Env } from './env';

export const OnLabClinicalApiProvider: AxiosInstance = axios.create({
    baseURL: Env.ONLAB_CLINICAL_API,
});
