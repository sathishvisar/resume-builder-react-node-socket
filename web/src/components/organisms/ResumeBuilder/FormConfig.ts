import {  FormSectionConfig } from "./types";


export const formConfig: FormSectionConfig[] = [
        {
            title: 'Personal Details',
            sectionName: 'personal',
            fields: [
            { name: 'personal.jobTitle', label: 'Job Title', type: 'text', required: true },
            { name: 'personal.photo', label: 'Upload Photo', type: 'file' },
            { name: 'personal.firstName', label: 'First Name', type: 'text', required: true },
            { name: 'personal.lastName', label: 'Last Name', type: 'text', required: true },
            { name: 'personal.email', label: 'Email', type: 'email', required: true },
            { name: 'personal.phone', label: 'Phone', type: 'text', required: true },
            { name: 'personal.address', label: 'Address', type: 'text', required: true },
            { 
                name: 'personal.cityState', 
                label: 'City/State', 
                type: 'select', 
                required: true,
                options: ['California', 'New York', 'Texas', 'Florida', 'Washington']
            },
            { 
                name: 'personal.country', 
                label: 'Country', 
                type: 'select', 
                required: true,
                options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'India']
            }
            ]
        },
        {
            title: 'Professional Summary',
            sectionName: 'summary',
            fields: [
            { name: 'summary.text', label: 'Summary', type: 'rich-text' }
            ]
        },
        {
            title: 'Employment History',
            sectionName: 'employments',
            isArray: true,
            fields: [
            { name: 'employments.title', label: 'Title', type: 'text', required: true },
            { name: 'employments.jobTitle', label: 'Job Title', type: 'text', required: true },
            { name: 'employments.employer', label: 'Employer', type: 'text', required: true },
            { name: 'employments.start', label: 'Start Date', type: 'date', required: true },
            { name: 'employments.end', label: 'End Date', type: 'date' },
            { name: 'employments.city', label: 'City', type: 'text', required: true },
            { name: 'employments.description', label: 'Description', type: 'rich-text' }
            ]
        },
        {
            title: 'Education History',
            sectionName: 'educations',
            isArray: true,
            fields: [
            { name: 'educations.title', label: 'Title', type: 'text', required: true },
            { name: 'educations.jobTitle', label: 'Job Title', type: 'text', required: true },
            { name: 'educations.school', label: 'School', type: 'text', required: true },
            { name: 'educations.start', label: 'Start Date', type: 'date', required: true },
            { name: 'educations.end', label: 'End Date', type: 'date' },
            { name: 'educations.city', label: 'City', type: 'text', required: true },
            // { name: 'educations.description', label: 'Description', type: 'rich-text' }
            ]
        },
        {
            title: 'Websites & Social Links',
            sectionName: 'links',
            isArray: true,
            fields: [
                { name: 'links.link', label: 'Link URL', type: 'text', required: true }
            ]
        },
        {
            title: 'Skills',
            sectionName: 'skills',
            isArray: true,
            fields: [
                { name: 'skills.skill', label: 'Skill', type: 'text', required: true }
            ]
        },
        {
            title: 'Projects',
            sectionName: 'projects',
            isArray: true,
            fields: [
                { name: 'projects.title', label: 'Title', type: 'text', required: true },
                { name: 'projects.project', label: 'Project Title', type: 'text', required: true },
                { name: 'projects.employer', label: 'Employer', type: 'text', required: true },
                { name: 'projects.start', label: 'Start Date', type: 'date', required: true },
                { name: 'projects.end', label: 'End Date', type: 'date' },
                { name: 'projects.city', label: 'City', type: 'text', required: true },
                { name: 'projects.description', label: 'Description', type: 'rich-text' }
            ]
        }
];


export const defaultValues = {
    personal: {
        jobTitle: '',
        photo: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        cityState: '',
        country: ''
    },
    summary: {
        text: ''
    },
    employments: [],
    educations: [],
    links:  [],
    skills: [],
    projects: []
}

 