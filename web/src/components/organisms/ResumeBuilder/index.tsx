// ResumeBuilder.tsx
import React from "react"
import DynamicField from "./DynamicField"
import { schema } from './validation'
import { FormData, FormSectionConfig } from "./types";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccordionItem } from "@/components/molecules/Accordion";

interface Props {
    onClick: any
}

const ResumeBuilder: React.FC<Props> = ({onClick}) => {
      
    const methods = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            personal: {
                jobTitle: 'Sr Software Engineer',
                photo: null,
                firstName: 'Sathishkumar',
                lastName: 'Angamuthu',
                email: 'sathish.visar@gmail.com',
                phone: '9988776655',
                address: 'VDS House, New No.41, Cathedral Rd, Chennai, Tamil Nadu 600086, India',
                cityState: 'Tamilnadu',
                country: 'India'
            },
            summary: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus.'
            },
            employments: [
                {
                    title:       "Senior Front-End Engineer",
                    jobTitle:    "UI Lead",
                    employer:    "Hexaware Technologies",
                    start:       new Date("2022-04-01"),
                    end:         null,                     // still employed
                    city:        "Chennai",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus."
                },
                {
                    title:       "Front-End Developer",
                    jobTitle:    "Software Engineer",
                    employer:    "ABC Solutions",
                    start:       new Date("2019-01-15"),
                    end:         new Date("2022-03-31"),
                    city:        "Bengaluru",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus."
                }
            ],
            educations: [
                {
                    title:       "B.Tech. Computer Science",
                    jobTitle:    "Undergraduate",
                    school:      "Anna University",
                    start:       new Date("2014-08-01"),
                    end:         new Date("2018-05-31"),
                    city:        "Chennai",
                    description: "CGPA 8.2/10. Final-year project on real-time traffic visualisation."
                }
            ],
            links:  ["https://github.com/satish-dev", "https://linkedin.com/in/satish-dev"],
            skills: ["JavaScript", "TypeScript", "React", "Vue", "Jest", "Cypress"],
            projects: [
                {
                    title:       "Resume Builder",
                    project:     "Open-source Next.js resume-builder",
                    employer:    "Personal Project",
                    start:       new Date("2023-06-01"),
                    end:         new Date("2023-11-30"),
                    city:        "Remote",
                    description: "Built drag-and-drop editor; 1 K+ GitHub stars."
                }
            ]
        }
    });

    const { handleSubmit, setValue, getValues, watch } = methods;
    const watchedValues = watch();
    
    const formConfig: FormSectionConfig[] = [
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
                { name: '', label: 'Link URL', type: 'text', required: true }
            ]
        },
        {
            title: 'Skills',
            sectionName: 'skills',
            isArray: true,
            fields: [
                { name: '', label: 'Skill', type: 'text', required: true }
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

    const addArrayItem = <T extends keyof FormData>(sectionName: T) => {
        if (Array.isArray(getValues(sectionName))) {
            const currentItems = getValues(sectionName) as any[];
            setValue(sectionName, [...currentItems, {}] as any);
        }
    };

    const removeArrayItem = <T extends keyof FormData>(sectionName: T, index: number) => {
        if (Array.isArray(getValues(sectionName))) {
            const currentItems = getValues(sectionName) as any[];
            setValue(sectionName, currentItems.filter((_, i) => i !== index) as any);
        }
    };
    const onSubmit = (data: any) => {
        // console.log(data);
        // Handle form submission
        onClick(data)
        // sendToServer(data);
    };

    return <>
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            { formConfig.map((section) => {
                const sectionData:any = watchedValues[section.sectionName];
                return<>
                <AccordionItem title={section.title}>
                    <div key={section.sectionName} className="py-4">
                        
                        {section.isArray && Array.isArray(sectionData) ? (
                            sectionData.map((_, index: number) => (
                                <div className="py-2">
                                    <AccordionItem title={`${sectionData[0]['title']}`}>
                                        <div key={`${section.sectionName}.${index}`} className="mb-6 p-4 border rounded-lg relative">
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                {section.fields.map((field) => (
                                                    <DynamicField
                                                        className={`${field.type === 'rich-text' ? 'col-span-full' : ''}`}
                                                        key={`${section.sectionName}.${index}.${field.name}`}
                                                        field={{
                                                            ...field,
                                                            name: `${section.sectionName}.${index}.${field.name.split('.').pop()}` as any
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <button
                                            type="button"
                                            onClick={() => removeArrayItem(section.sectionName, index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            >
                                            Remove
                                            </button>
                                        </div>
                                    </AccordionItem>
                                </div>
                            ))
                        ) : (
                            <div className={`grid grid-cols-2 gap-4`}>
                                {section.fields.map((field) => (<>
                                    <DynamicField
                                        className={`${field.type === 'rich-text' ? 'col-span-full' : ''}`}
                                        key={field.name}
                                        field={field}
                                    />
                                    </>
                                ))}
                            </div>
                        )}

                        {section.isArray && (<div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => addArrayItem(section.sectionName)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add one more {section.title.split('. ')[1]}
                            </button>
                        </div>)}
                    </div>
                </AccordionItem>
            </>})}
            <div className="flex justify-end">
                <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                Submit Form
                </button>
            </div>
        </form>
    </FormProvider>
    </>
}

export default ResumeBuilder