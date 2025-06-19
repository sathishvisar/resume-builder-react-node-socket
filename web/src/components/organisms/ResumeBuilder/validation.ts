// validation.ts
import * as yup from 'yup';
import { FormData } from './types';

export const schema = yup.object().shape<any>({
  personal: yup.object().shape({
    jobTitle: yup.string().required('Job title is required'),
    photo: yup.mixed<any>().nullable().default(null),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    address: yup.string().required('Address is required'),
    cityState: yup.string().required('City/State is required'),
    country: yup.string().required('Country is required'),
  }),
  summary: yup.object().shape({
    text: yup.string().nullable().default(''),
  }),
  employments: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Title is required'),
      jobTitle: yup.string().required('Job title is required'),
      employer: yup.string().required('Employer is required'),
      start: yup.date().required('Start date is required'),
      end: yup.date().nullable().default(null),
      city: yup.string().required('City is required'),
      description: yup.string().nullable().default(''),
    })
  ),
  educations: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Title is required'),
      jobTitle: yup.string().required('Job title is required'),
      school: yup.string().required('School is required'),
      start: yup.date().required('Start date is required'),
      end: yup.date().nullable().default(null),
      city: yup.string().required('City is required'),
      description: yup.string().nullable().default(''),
    })
  ),
  links: yup.array().of(yup.string().url('Invalid URL').required('Link is required')).default([]),
  skills: yup.array().of(yup.string().required('Skill is required')).default([]),
  projects: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Title is required'),
      project: yup.string().required('Project is required'),
      employer: yup.string().required('Employer is required'),
      start: yup.date().required('Start date is required'),
      end: yup.date().nullable().default(null),
      city: yup.string().required('City is required'),
      description: yup.string().nullable().default(''),
    })
  ).default([]),
}) as yup.ObjectSchema<FormData>;
