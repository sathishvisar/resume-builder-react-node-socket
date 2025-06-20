// ResumeBuilder.tsx
import React, { useEffect } from "react"
import DynamicField from "./DynamicField"
import { schema } from './validation'
import { FormData } from "./types";
import { formConfig, defaultValues } from './FormConfig';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccordionItem } from "@/components/molecules/Accordion";

interface Props {
    resume_data?: any;
    onClick?: any;
}

const ResumeBuilder: React.FC<Props> = ({onClick, resume_data}) => {
      
    const methods = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: resume_data || defaultValues
    });

    const { handleSubmit, setValue, getValues, watch } = methods;
    const watchedValues = watch();
    

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
        onClick(data)
    };

    useEffect(() => {
        let debounceTimer: ReturnType<typeof setTimeout>;

        const sub = watch((values, { type }) => {
            if (type !== 'change') return;

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                onClick(values);
            }, 1000);
        });

        return () => {
            sub.unsubscribe();
            clearTimeout(debounceTimer);
        };
    }, [watch, onClick]);

    return <>
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            { formConfig.map((section) => {
                const sectionData:any = watchedValues[section.sectionName];
                return<>
                <AccordionItem keepMounted title={section.title}>
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
            {/* <div className="flex justify-end">
                <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                Submit Form
                </button>
            </div> */}
        </form>
    </FormProvider>
    </>
}

export default ResumeBuilder