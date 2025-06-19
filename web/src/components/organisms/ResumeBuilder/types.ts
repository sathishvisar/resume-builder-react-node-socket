// types.ts
import { Path, PathValue, FieldErrors } from 'react-hook-form';

export type FormData = {
  personal: {
    jobTitle: string;
    photo: any;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    cityState: string;
    country: string;
  };
  summary: {
    text: string;
  };
  employments: Array<{
    title: string;
    jobTitle: string;
    employer: string;
    start: Date;
    end: Date | null;
    city: string;
    description: string;
  }>;
  educations: Array<{
    title: string;
    jobTitle: string;
    school: string;
    start: Date;
    end: Date | null;
    city: string;
    description: string;
  }>;
  links: string[];
  skills: string[];
  projects: Array<{
    title: string;
    project: string;
    employer: string;
    start: Date;
    end: Date | null;
    city: string;
    description: string;
  }>;
};

export type FormFieldPath = Path<FormData>;

export type FormFieldValue<T extends FormFieldPath> = PathValue<FormData, T>;

export type FieldType =  'text' | 'email' | 'number' | 'date' | 'select' | 'file' | 'rich-text';

export interface FormFieldConfig<T extends FormFieldPath = FormFieldPath> {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

export interface FormSectionConfig {
  title: string;
  fields: FormFieldConfig[];
  isArray?: boolean;
  sectionName: keyof FormData;
}

export type FormErrors = FieldErrors<FormData>;