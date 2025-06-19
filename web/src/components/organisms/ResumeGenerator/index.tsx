// DynamicFormGenerator.tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import DynamicField from './DynamicField';
import { FormData, FormSectionConfig } from './types';

const DynamicFormGenerator: React.FC = () => {
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
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue ligula urna. Donec id magna eget ipsum consectetur blandit. Quisque rhoncus ultrices metus id pharetra. Morbi non leo leo. Suspendisse tortor ipsum, gravida id lectus nec, venenatis ullamcorper mauris. Nullam molestie massa diam, at porta sapien consequat non. Vestibulum tempus pharetra odio quis cursus.'
      },
      employments: [],
      educations: [],
      links: [],
      skills: [],
      projects: []
    }
  });

  const { handleSubmit, setValue, getValues } = methods;

  const formConfig: FormSectionConfig[] = [
    {
      title: 'A. Personal Details',
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
      title: 'B. Professional Summary',
      sectionName: 'summary',
      fields: [
        { name: 'summary.text', label: 'Summary', type: 'rich-text' }
      ]
    },
    {
      title: 'C. Employment History',
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
      title: 'D. Education History',
      sectionName: 'educations',
      isArray: true,
      fields: [
        { name: 'educations.title', label: 'Title', type: 'text', required: true },
        { name: 'educations.jobTitle', label: 'Job Title', type: 'text', required: true },
        { name: 'educations.school', label: 'School', type: 'text', required: true },
        { name: 'educations.start', label: 'Start Date', type: 'date', required: true },
        { name: 'educations.end', label: 'End Date', type: 'date' },
        { name: 'educations.city', label: 'City', type: 'text', required: true },
        { name: 'educations.description', label: 'Description', type: 'rich-text' }
      ]
    },
    {
      title: 'E. Websites & Social Links',
      sectionName: 'links',
      isArray: true,
      fields: [
        { name: '', label: 'Link URL', type: 'text', required: true }
      ]
    },
    {
      title: 'F. Skills',
      sectionName: 'skills',
      isArray: true,
      fields: [
        { name: '', label: 'Skill', type: 'text', required: true }
      ]
    },
    {
      title: 'G. Projects',
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
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const addArrayItem = <T extends keyof FormData>(sectionName: T) => {
    if (Array.isArray(getValues(sectionName))) {
      console.log('sectionName', sectionName)
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

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dynamic Resume Form</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {formConfig.map((section) => (
            <div key={section.title} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {section.isArray && (
                  <button
                    type="button"
                    onClick={() => addArrayItem(section.sectionName)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add {section.title.split('. ')[1]}
                  </button>
                )}
              </div>

              {section.isArray ? (
                (getValues(section.sectionName) as any[] || []).map((_, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeArrayItem(section.sectionName, index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field) => (
                        <DynamicField
                          key={`${section.sectionName}.${index}.${field.name}`}
                          field={{
                            ...field,
                            name: `${section.sectionName}.${index}.${field.name.split('.').pop()}` as any
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field) => (
                    <DynamicField
                      key={field.name}
                      field={field}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default DynamicFormGenerator;